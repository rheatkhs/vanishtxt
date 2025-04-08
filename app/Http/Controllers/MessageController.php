<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('CreateMessage');
    }
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'sender' => 'nullable|string',
            'receiver' => 'nullable|string',
            'cf-turnstile-response' => 'required|string',
        ]);

        // Verify CAPTCHA with Cloudflare
        $captchaResponse = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('TURNSTILE_SECRET'), // Set this in .env
            'response' => $request->cf_turnstile_response,
            'remoteip' => $request->ip(),
        ]);

        if (!$captchaResponse->json('success')) {
            Log::warning('CAPTCHA failed', [
                'ip' => $request->ip(),
                'response' => $captchaResponse->json(),
            ]);

            return back()->withErrors(['cf-turnstile-response' => 'CAPTCHA validation failed. Please try again.'])->withInput();
        }

        // Encrypt the message
        $encryptedMessage = Crypt::encryptString($request->message);

        // Generate a UUID-like access token (36-character format)
        $accessToken = Str::uuid()->toString();

        // Store the message
        $message = Message::create([
            'encrypted_message' => $encryptedMessage,
            'access_token' => $accessToken,
            'sender' => $request->sender ?? 'Anonymous',
            'receiver' => $request->receiver ?? 'Anonymous',
        ]);

        // Return the page with the generated link using Inertia
        return redirect()->route('message.generated', $accessToken);
    }
    public function generated(string $token): Response
    {
        $message = Message::where('access_token', $token)->firstOrFail();

        return Inertia::render('GeneratedMessage', [
            'generatedLink' => route('message.show', $message->access_token),
            'sender' => $message->sender ?? 'Anonymous',
            'receiver' => $message->receiver ?? 'Anonymous',
        ]);
    }

    public function show(string $token): Response
    {
        // ✅ Ensure token is a valid UUID format
        if (!Str::isUuid($token)) {
            abort(404, 'Invalid token format.');
        }

        // ✅ Retrieve the message by token
        $message = Message::where('access_token', $token)->first();

        if (!$message) {
            abort(404, 'Message not found or already viewed.');
        }

        try {
            // ✅ Decrypt the message
            $decryptedMessage = Crypt::decryptString($message->encrypted_message);
        } catch (\Exception $e) {
            Log::error('Decryption failed: ' . $e->getMessage());
            abort(500, 'Failed to decrypt the message.');
        }

        // ✅ Get sender & receiver (default to "Anonymous" if null)
        $sender = $message->sender ?? 'Anonymous';
        $receiver = $message->receiver ?? 'Anonymous';

        // ✅ Delete message after viewing (one-time access)
        $message->delete();

        // ✅ Return the decrypted message using Inertia
        return Inertia::render('ShowMessage', [
            'message' => $decryptedMessage,
            'sender' => $sender,
            'receiver' => $receiver,
        ]);
    }
}

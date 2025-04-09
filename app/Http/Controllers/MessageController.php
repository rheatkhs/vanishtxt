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
            'expires_at' => 'nullable|numeric',
        ]);

        $expiresAt = $request->expires_at ? now()->addMinutes(intval($request->expires_at)) : null;

        // Verify CAPTCHA with Cloudflare
        $captchaResponse = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('TURNSTILE_SECRET'),
            'response' => $request->input('cf-turnstile-response'), // ✅ use input() for safety
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
            'expires_at' => $expiresAt,
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
        if (!Str::isUuid($token)) {
            abort(404, 'Invalid token format.');
        }

        $message = Message::where('access_token', $token)->first();

        if (!$message) {
            abort(404, 'Message not found or already viewed.');
        }

        if ($message->expires_at && now()->greaterThan($message->expires_at)) {
            $message->delete(); // optional: auto-delete expired message
            abort(410, 'This message has expired.');
        }

        $userAgent = request()->header('User-Agent');

        // List of common preview bot keywords
        $knownBots = [
            'Discordbot',
            'Slackbot',
            'Twitterbot',
            'facebookexternalhit',
            'WhatsApp',
            'TelegramBot',
            'LinkedInBot',
            'Embedly',
            'SkypeUriPreview',
            'Googlebot',
            'bingbot',
            'AhrefsBot'
        ];

        // Check if the request is likely from a preview bot
        foreach ($knownBots as $bot) {
            if (stripos($userAgent, $bot) !== false) {
                // Show preview but do NOT decrypt or delete
                return Inertia::render('BotPreview', [
                    'messagePreview' => 'This message is encrypted and will be shown when opened by the recipient.',
                    'sender' => $message->sender ?? 'Anonymous',
                    'receiver' => $message->receiver ?? 'Anonymous',
                ]);
            }
        }

        // ✅ If it's a real user, proceed with decryption and deletion
        try {
            $decryptedMessage = Crypt::decryptString($message->encrypted_message);
        } catch (\Exception $e) {
            Log::error('Decryption failed: ' . $e->getMessage());
            abort(500, 'Failed to decrypt the message.');
        }

        $sender = $message->sender ?? 'Anonymous';
        $receiver = $message->receiver ?? 'Anonymous';

        $message->delete(); // Delete after successful view by a human

        return Inertia::render('ShowMessage', [
            'message' => $decryptedMessage,
            'sender' => $sender,
            'receiver' => $receiver,
        ]);
    }
}

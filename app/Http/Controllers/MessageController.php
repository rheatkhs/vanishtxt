<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
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
        ]);

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
        return Inertia::render('CreateMessage', [
            'generatedLink' => route('message.show', $accessToken),
        ]);
    }
    public function show(string $token): Response
    {
        // Ensure the token is a valid UUID format
        if (!Str::isUuid($token)) {
            abort(404, 'Invalid token format.');
        }

        // Retrieve the message by token
        $message = Message::where('access_token', $token)->firstOrFail();

        // Decrypt the message
        $decryptedMessage = Crypt::decryptString($message->encrypted_message);

        // Delete message after viewing (one-time access)
        $message->delete();

        // Return the decrypted message using Inertia
        return Inertia::render('ShowMessage', [
            'message' => $decryptedMessage
        ]);
    }
}

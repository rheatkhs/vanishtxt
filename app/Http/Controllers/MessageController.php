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
        ]);

        // Encrypt the message
        $encryptedMessage = Crypt::encryptString($request->message);

        // Generate unique access token
        $accessToken = Str::random(32);

        // Store the message
        $message = Message::create([
            'encrypted_message' => $encryptedMessage,
            'access_token' => $accessToken,
        ]);

        // Return the page with the generated link using Inertia
        return Inertia::render('CreateMessage', [
            'generatedLink' => route('message.show', $accessToken),
        ]);
    }
    public function show($token): Response
    {
        $message = Message::where('access_token', $token)->firstOrFail();

        // Decrypt message
        $decryptedMessage = Crypt::decryptString($message->encrypted_message);

        // Delete after viewing
        $message->delete();

        return Inertia::render('ShowMessage', [
            'message' => $decryptedMessage
        ]);
    }
}

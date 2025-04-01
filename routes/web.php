<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MessageController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('About');
Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorks');
})->name('HowItWorks');
Route::get('/support', function () {
    return Inertia::render('Support');
})->name('Support');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/create', [MessageController::class, 'create'])->name('message.create');
Route::post('/store', [MessageController::class, 'store'])->name('message.store');
Route::get('/message/{token}', [MessageController::class, 'show'])->name('message.show');

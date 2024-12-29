<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PublicPageController::class, 'welcome'])->name('home-page');
Route::get('/for-sale', [PublicPageController::class, 'forSale'])->name('for-sale-page');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resources Routes
    Route::resource('/cars', CarController::class);
    Route::resource('/bids', BidController::class);
    Route::resource('/appointments', AppointmentController::class);
    Route::resource('/transactions', TransactionController::class);
});

// 404 pages
Route::fallback(function () {
    return Inertia::render('Public/NotFound');
});

// Auth Routes
require __DIR__ . '/auth.php';

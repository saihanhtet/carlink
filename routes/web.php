<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PrivatePageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [PublicPageController::class, 'welcome'])->name('home-page');
Route::get('/for-sale', [PublicPageController::class, 'forSale'])->name('for-sale-page');
Route::get('/about-us', [PublicPageController::class, 'aboutUs'])->name('about-us-page');
Route::get('/contact-us', [PublicPageController::class, 'contactUs'])->name('contact-us-page');
Route::get('/car-listing', [PublicPageController::class, 'carListing'])->name('car-listing-page');

// Resources Routes Not Need Authentication
Route::resource('/cars', CarController::class);

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PrivatePageController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/car-sales', [PrivatePageController::class, 'sales'])->name('car-sales');

    // Profile Routes
    Route::get('/dashboard/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/dashboard/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/dashboard/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resources Routes
    Route::resource('/bids', BidController::class);
    Route::resource('/appointments', AppointmentController::class);
    Route::resource('/transactions', TransactionController::class);

});


// Auth Routes
require __DIR__ . '/auth.php';

// 404 pages
Route::fallback(function () {
    return Inertia::render('Public/NotFound');
});

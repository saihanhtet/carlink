<?php
// Routes import
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

// model
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\EngineController;
use App\Http\Controllers\FuelController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProfileController;
// Pages controller import
use App\Http\Controllers\Pages\PublicPageController;
use App\Http\Controllers\Pages\PrivatePageController;
use App\Http\Middleware\IsAdminMiddleware;

// Public Routes
Route::get('/', [PublicPageController::class, 'welcome'])->name('home-page');
Route::get('/for-sale', [PublicPageController::class, 'forSale'])->name('for-sale-page');
Route::get('/about-us', [PublicPageController::class, 'aboutUs'])->name('about-us-page');
Route::get('/contact-us', [PublicPageController::class, 'contactUs'])->name('contact-us-page');
Route::get('/car-listing', [PublicPageController::class, 'carListing'])->name('car-listing-page');
Route::get('/car-details/{car}', [PublicPageController::class, 'carDetailsPage'])->name('car-details-page');

// Resources Routes Not Need Authentication
Route::resource('/cars', CarController::class);
Route::get('/cars', [CarController::class, 'index'])->name('car.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('car.show');

// Admin Route

Route::middleware(['auth', 'verified', IsAdminMiddleware::class])->group(function () {
    Route::get('/dashboard/admin/analytics', [PrivatePageController::class, 'dashboard'])->name('admin-dashboard');
    Route::get('/dashboard/admin/users-management', [PrivatePageController::class, 'userManagementDashboard'])->name('user-management-dashboard');
    Route::get('/dashboard/admin/cars-management', [PrivatePageController::class, 'carManagementDashboard'])->name('car-management-dashboard');

    Route::put('/dashboard/admin/users-management', [ProfileController::class, 'updateStatus'])->name('user.update');
    Route::put('/dashboard/admin/users-management/appointment', [AppointmentController::class, 'updateAppointmentStatus'])->name('car.appointment.update');
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard Routes
    Route::get('/dashboard/analytics/dashboard', [PrivatePageController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/analytics/car-sales', [PrivatePageController::class, 'salesDashboard'])->name('car-sales-dashboard');
    Route::get('/dashboard/cars/car-upload', [PrivatePageController::class, 'uploadCarDashboard'])->name('car-upload-dashboard');
    Route::get('/dashboard/cars/car-edit/{car}', [PrivatePageController::class, 'editCarDashboard'])->name('car-edit-dashboard');
    Route::get('/dashboard/cars/bidding-history', [PrivatePageController::class, 'biddingCarDashboard'])->name('bidding-history-dashboard');
    Route::get('/dashboard/cars/carlist', [PrivatePageController::class, 'carListDashboard'])->name('car-list-dashboard');

    // Car Management
    Route::post('/cars/store', [CarController::class, 'store'])->name('car.store');
    Route::patch('/cars/{car}/update', [CarController::class, 'update'])->name('car.update');
    Route::delete('/cars/{car}/delete', [CarController::class, 'destroy'])->name('car.destroy');

    // Profile Routes
    Route::get('/dashboard/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/dashboard/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/dashboard/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bid Management
    Route::post('/bids', [BidController::class, 'store'])->name('bid.store');
    Route::put('/bids', [CarController::class, 'updateBidStatus'])->name('bid.update');

    // Resources Routes
    Route::resource('/appointments', AppointmentController::class);
    Route::resource('/transactions', TransactionController::class);

    // Fuel Management
    Route::get('/fuels', [FuelController::class, 'index'])->name('fuels.index');
    Route::post('/fuels', [FuelController::class, 'store'])->name('fuels.store');
    Route::put('/fuels/{fuel}', [FuelController::class, 'update'])->name('fuels.update');
    Route::delete('/fuels/{fuel}', [FuelController::class, 'destroy'])->name('fuels.delete');

    // Engine Management
    Route::get('/engines', [EngineController::class, 'index'])->name('engines.index');
    Route::post('/engines', [EngineController::class, 'store'])->name('engines.store');
    Route::put('/engines/{engine}', [EngineController::class, 'update'])->name('engines.update');
    Route::delete('/engines/{engine}', [EngineController::class, 'destroy'])->name('engines.delete');
});


// Auth Routes
require __DIR__ . '/auth.php';

// 404 pages
Route::fallback(function () {
    return Inertia::render('Public/NotFound');
});

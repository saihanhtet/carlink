<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Car;  // Import the Car model

class PublicPageController extends Controller
{
    /**
     * Render a public page dynamically.
     *
     * @param string $view
     * @return \Inertia\Response
     */
    public function renderPage(string $view, $data = [])
    {
        return Inertia::render($view, array_merge([
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'isLoggedIn' => Auth::check(),
        ], $data));
    }

    public function welcome()
    {
        return $this->renderPage('Public/HomePage/page');
    }

    public function forSale()
    {
        return $this->renderPage('Public/ForSalePage/page');
    }

    public function aboutUs()
    {
        return $this->renderPage('Public/AboutUsPage/page');
    }

    public function contactUs()
    {
        return $this->renderPage('Public/ContactUsPage/page');
    }

    public function carListing()
    {
        // Fetch paginated cars from the database (adjust the page size as needed)
        $cars = Car::with('brand')->paginate(15);

        // Pass the paginated cars to the frontend
        return $this->renderPage('Public/CarListingsPage/page', [
            'cars' => $cars,  // Passing paginated car data to the view
        ]);
    }

}

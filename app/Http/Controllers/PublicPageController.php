<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    /**
     * Render a public page dynamically.
     *
     * @param string $view
     * @return \Inertia\Response
     */
    public function renderPage(string $view)
    {
        return Inertia::render($view, [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'isLoggedIn' => Auth::check(),
        ]);
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
        return $this->renderPage('Public/CarListingsPage/page');
    }
}

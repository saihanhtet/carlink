<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Public/Welcome/page', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function forSale()
    {
        return Inertia::render('Public/ForSale/page', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}

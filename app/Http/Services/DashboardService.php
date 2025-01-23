<?php

namespace App\Http\Services;

use App\Models\Car;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    public function getDashboardData(string $role): array
    {
        if ($role === 'admin') {
            return [
                'user' => false,
                'admin' => true,
                'role' => 'admin',
            ];
        }

        return [
            'user' => true,
            'admin' => false,
            'role' => 'user',
        ];
    }

    public function getUserCars()
    {
        $user = Auth::user();
        return Car::where('user_id', $user->id)->get();
    }

    public function calculateTotalProfit($cars)
    {
        return $cars->reduce(function ($carry, $car) {
            $highestBid = $car->bids()->max('bid_price');
            $profit = $highestBid ? $highestBid - $car->price : 0;
            return $carry + $profit;
        }, 0);
    }
}

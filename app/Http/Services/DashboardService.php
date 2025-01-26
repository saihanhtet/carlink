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
        $cars = Car::where('user_id', $user->id)->with(['brand', 'fuel']);
        return $cars;
    }

    public function calculateTotalProfit($carsQuery)
    {
        $cars = $carsQuery->get();
        return $cars->reduce(function ($carry, $car) {
            $highestBid = $car->bids()->max('bid_price');
            $profit = $highestBid ? $highestBid - $car->price : 0;
            return $carry + $profit;
        }, 0);
    }

    public function getUserCarsWithTransactions()
    {
        $user = Auth::user();

        $cars = Car::select(
            'cars.id as car_id',
            'cars.model',
            'transactions.id as transaction_id',
            'transactions.transaction_date',
            'transactions.final_price',
            'fuels.name as fuel_name'
        )
            ->join('transactions', 'cars.id', '=', 'transactions.car_id') // Correct join for transactions
            ->join('fuels', 'fuels.id', '=', 'cars.fuel_id') // Correct join for fuels
            ->where('cars.user_id', $user->id) // Filter by user ID
            ->orderBy('transactions.transaction_date', 'desc') // Order by latest transactions
            ->limit(10) // Limit to 10 records
            ->get();

        return $cars;
    }

}

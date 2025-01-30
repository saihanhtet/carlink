<?php

namespace App\Http\Services;

use App\Models\Bid;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    /**
     * Get dashboard data based on the user's role.
     *
     * @param string $role
     * @return array
     */
    public function getDashboardData(string $role): array
    {
        return [
            'user' => $role !== 'admin',
            'admin' => $role === 'admin',
            'role' => $role,
        ];
    }

    /**
     * Retrieve cars belonging to the authenticated user.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getUserCars()
    {
        $user = Auth::user();

        return Car::where('user_id', $user->id)
            ->with(['brand', 'fuel'])
            ->orderBy('created_at', 'desc');
    }

    /**
     * Calculate total profit from the user's cars.
     *
     * @param \Illuminate\Database\Eloquent\Builder $carsQuery
     * @return float
     */
    public function calculateTotalProfit($carsQuery): float
    {
        $cars = $carsQuery->get();

        return $cars->reduce(function ($carry, $car) {
            $highestBid = $car->bids()->max('bid_price');
            $profit = $highestBid ? $highestBid - $car->price : 0;
            return $carry + $profit;
        }, 0);
    }

    /**
     * Get user cars with associated transactions (latest 10).
     *
     * @return \Illuminate\Support\Collection
     */
    public function getUserCarsWithTransactions()
    {
        $user = Auth::user();

        return Car::select(
            'cars.id as car_id',
            'cars.model',
            'transactions.id as transaction_id',
            'transactions.transaction_date',
            'transactions.final_price',
            'fuels.name as fuel_name'
        )
            ->join('transactions', 'cars.id', '=', 'transactions.car_id')
            ->join('fuels', 'fuels.id', '=', 'cars.fuel_id')
            ->where('cars.user_id', $user->id)
            ->orderBy('transactions.transaction_date', 'desc')
            ->limit(10)
            ->get();
    }

    /**
     * Retrieve bidding information related to the user's cars.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getBiddingRelatedWithUserCar()
    {
        $user = Auth::user();
        // Fetch all bids made on cars owned by the logged-in user
        $bids = Bid::with(['user', 'car'])
        ->whereHas('car', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->orderBy('created_at', 'desc');
        return $bids;
    }

    /**
     * Get user cars with transactions, including additional relationships.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getUserCarsWithTransactionsTwo()
    {
        $user = Auth::user();

        return Car::with(['brand', 'fuel', 'transaction', 'transaction.buyer'])
        ->join('transactions', 'cars.id', '=', 'transactions.car_id')
        ->where('cars.user_id', $user->id)
            ->orderBy('transactions.transaction_date', 'desc')
            ->limit(10)
            ->get([
                'cars.*',
                'transactions.id as transaction_id',
                'transactions.transaction_date',
                'transactions.final_price',
            ]);
    }
}

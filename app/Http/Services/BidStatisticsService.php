<?php

namespace App\Http\Services;

use App\Models\Bid;
use Illuminate\Support\Facades\DB;

class BidStatisticsService
{
    public function getMonthlyBids($userId)
    {
        $sixMonthsAgo = \Carbon\Carbon::now()->subMonths(5);

        return Bid::select(
            DB::raw('DATE_FORMAT(bids.created_at, "%Y-%m") as month'),
            DB::raw('SUM(bid_price) as total_amount'),
            DB::raw('COUNT(*) as total_bids')
        )
            ->join('cars', 'bids.car_id', '=', 'cars.id')
            ->where('cars.user_id', $userId)
            ->where('bids.created_at', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($bid) {
                $bid->month = \Carbon\Carbon::createFromFormat('Y-m', $bid->month)->format('F Y');
                $bid->average_bidding = $bid->total_bids > 0 ? $bid->total_amount / $bid->total_bids : 0;
                return $bid;
            });
    }
}

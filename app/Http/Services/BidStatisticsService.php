<?php

namespace App\Http\Services;

use App\Models\Bid;
use Illuminate\Support\Facades\DB;

class BidStatisticsService
{
    public function getMonthlyBids($userId)
    {
        // Get the date 6 months ago from today
        $sixMonthsAgo = \Carbon\Carbon::now()->subMonths(5)->startOfMonth();
        $now = \Carbon\Carbon::now()->endOfMonth();

        // Fetch the bid data for the available months
        $bids = Bid::select(
            DB::raw('DATE_FORMAT(bids.created_at, "%Y-%m") as month'),
            DB::raw('SUM(bid_price) as total_amount'),
            DB::raw('COUNT(*) as total_bids')
        )
            ->join('cars', 'bids.car_id', '=', 'cars.id')
            ->where('cars.user_id', $userId)
            ->whereBetween('bids.created_at', [$sixMonthsAgo, $now])
            ->groupBy('month')
            ->orderBy('month')
        ->get();

        // Create an array of the last 6 months (including this month)
        $months = [];
        for ($i = 0; $i <= 5; $i++) {
            $months[] = $sixMonthsAgo->copy()->addMonths($i)->format('Y-m'); // Use 'Y-m' for comparison
        }

        // Map the results and fill in the months without any data
        return collect($months)->map(function ($month) use ($bids) {
            // Find the bid data for the specific month (check for 'Y-m' format)
            $existingBid = $bids->firstWhere('month', $month);

            // Prepare the result with zero values if no data exists
            return (object) [
                'month' => \Carbon\Carbon::createFromFormat('Y-m', $month)->format('F Y'),
                'total_amount' => $existingBid ? $existingBid->total_amount : 0,
                'total_bids' => $existingBid ? $existingBid->total_bids : 0,
                'average_bidding' => $existingBid && $existingBid->total_bids > 0 ? $existingBid->total_amount / $existingBid->total_bids : 0,
            ];
        });
    }

    public function getMonthlyBidsAdmin()
    {
        // Get the date 6 months ago from today
        $sixMonthsAgo = \Carbon\Carbon::now()->subMonths(5)->startOfMonth();
        $now = \Carbon\Carbon::now()->endOfMonth();

        // Fetch the bid data for the available months (for all users)
        $bids = Bid::select(
            DB::raw('DATE_FORMAT(bids.created_at, "%Y-%m") as month'),
            DB::raw('SUM(bid_price) as total_amount'),
            DB::raw('COUNT(*) as total_bids')
        )
            ->whereBetween('bids.created_at', [$sixMonthsAgo, $now])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Create an array of the last 6 months (including this month)
        $months = [];
        for ($i = 0; $i <= 5; $i++) {
            $months[] = $sixMonthsAgo->copy()->addMonths($i)->format('Y-m');
        }

        // Map the results and fill in the months without any data
        return collect($months)->map(function ($month) use ($bids) {
            $existingBid = $bids->firstWhere('month', $month);

            return (object) [
                'month' => \Carbon\Carbon::createFromFormat('Y-m', $month)->format('F Y'),
                'total_amount' => $existingBid ? $existingBid->total_amount : 0,
                'total_bids' => $existingBid ? $existingBid->total_bids : 0,
                'average_bidding' => $existingBid && $existingBid->total_bids > 0 ? $existingBid->total_amount / $existingBid->total_bids : 0,
            ];
        });
    }



}

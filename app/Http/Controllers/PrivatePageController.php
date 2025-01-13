<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PrivatePageController extends Controller
{
    public function dashboard()
    {
        // Get the currently authenticated user
        $user = Auth::user();
        // Determine the role of the user
        $role = $user->is_admin ? 'admin' : 'user';
        $dashboardData = $this->getDashboardData($role);

        // Fetch cars owned by the authenticated user
        $cars = Car::where('user_id', $user->id)->get();

        // Get the current date and 6 months ago date
        $sixMonthsAgo = \Carbon\Carbon::now()->subMonths(5);

        // Aggregate total bid amounts per month for the last 6 months
        $monthlyBids = Bid::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('SUM(bid_price) as total_amount'),
            DB::raw('COUNT(*) as total_bids')
        )
            ->where('created_at', '>=', $sixMonthsAgo)  // Only include bids from the last 6 months
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($bid) {
                // Convert the 'month' to a human-readable format (e.g., 'July 2024')
                $bid->month = \Carbon\Carbon::createFromFormat('Y-m', $bid->month)->format('F Y');

                // Calculate the average bidding per month
                $bid->average_bidding = $bid->total_bids > 0 ? $bid->total_amount / $bid->total_bids : 0;

                return $bid;
            });

        // Get the first and last months in the data
        $startMonth = $monthlyBids->first() ? $monthlyBids->first()->month : '';
        $endMonth = $monthlyBids->last() ? $monthlyBids->last()->month : '';

        // Create the label for the last 6 months
        $monthLabel = $startMonth . ' - ' . $endMonth;

        // Calculate total profit for all cars
        $totalProfit = $cars->reduce(function ($carry, $car) {
            // Get the highest bid for the car
            $highestBid = $car->bids()->max('bid_price');
            // Add the profit (highest bid - car price) to the total profit
            $profit = $highestBid ? $highestBid - $car->price : 0;
            return $carry + $profit;
        }, 0);  // Start with 0 to accumulate the profit

        // Pass the data and the label to the dashboard view
        $dashboardData['cars'] = $cars;
        $dashboardData['monthly_bids'] = $monthlyBids;
        $dashboardData['month_label'] = $monthLabel;
        $dashboardData['total_profit'] = $totalProfit;
        $dashboardData['average_bidding'] = $monthlyBids->avg('average_bidding');

        // Return the dashboard view with the user-specific data
        return Inertia::render('Private/Dashboard/page', $dashboardData);
    }



    public function sales()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $dashboardData = $this->getDashboardData($role);

        return Inertia::render('Private/Dashboard/sales', $dashboardData);
    }



    /**
     * Get dashboard data based on role.
     *
     * @param string $role
     * @return array
     */
    private function getDashboardData(string $role): array
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
}

<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Services\BidStatisticsService as ServicesBidStatisticsService;
use App\Http\Services\DashboardService as ServicesDashboardService;
use App\Models\Brand;
use App\Models\Car;
use App\Models\Fuel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PrivatePageController extends Controller
{
    private $dashboardService;
    private $bidStatisticsService;

    public function __construct(ServicesDashboardService $dashboardService, ServicesBidStatisticsService $bidStatisticsService)
    {
        $this->dashboardService = $dashboardService;
        $this->bidStatisticsService = $bidStatisticsService;
    }

    /**
     * Render a public page dynamically.
     *
     * @param string $view
     * @return \Inertia\Response
     */
    public function renderPage(string $view, $data = [])
    {
        return Inertia::render($view, array_merge([
            'isLoggedIn' => Auth::check(),
        ], $data));
    }

    public function analyticsDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);
        $cars = $this->dashboardService->getUserCars();
        $monthlyBids = $this->bidStatisticsService->getMonthlyBids($user->id);

        $startMonth = $monthlyBids->first() ? $monthlyBids->first()->month : '';
        $endMonth = $monthlyBids->last() ? $monthlyBids->last()->month : '';
        $monthLabel = $startMonth . ' - ' . $endMonth;

        $totalProfit = $this->dashboardService->calculateTotalProfit($cars);

        $dashboardData['cars'] = $cars;
        $dashboardData['monthly_bids'] = $monthlyBids;
        $dashboardData['month_label'] = $monthLabel;
        $dashboardData['total_profit'] = $totalProfit;
        $dashboardData['average_bidding'] = $monthlyBids->avg('average_bidding');

        return $this->renderPage('Private/Dashboard/users/analytics/page', $dashboardData);
    }

    public function salesDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);

        return $this->renderPage('Private/Dashboard/users/analytics/sales', $dashboardData);
    }

    public function uploadCarDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $brands = Brand::all();
        $fuels = Fuel::all();
        $cars = Car::with(['brand', 'fuel'])->get();

        // adding data
        $dashboardData = $this->dashboardService->getDashboardData($role);
        $dashboardData['user'] = $user;
        $dashboardData['brands'] = $brands;
        $dashboardData['fuels'] = $fuels;
        $dashboardData['cars'] = $cars;

        return $this->renderPage('Private/Dashboard/users/cars/sell', $dashboardData);
    }

    public function biddingCarDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);
        return $this->renderPage('Private/Dashboard/users/cars/bidding', $dashboardData);
    }

    public function carListDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);
        return $this->renderPage('Private/Dashboard/users/cars/carlist', $dashboardData);
    }

    public function carStatusDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);
        return $this->renderPage('Private/Dashboard/users/cars/status', $dashboardData);
    }
}

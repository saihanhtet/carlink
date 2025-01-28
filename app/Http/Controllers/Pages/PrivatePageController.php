<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Services\BidStatisticsService as ServicesBidStatisticsService;
use App\Http\Services\DashboardService as ServicesDashboardService;
use App\Models\Brand;
use App\Models\Car;
use App\Models\Engine;
use App\Models\Fuel;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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
    private function renderPage(string $view, array $data = [])
    {
        return Inertia::render($view, array_merge([
            'isLoggedIn' => Auth::check(),
            'isPublicPage' => false,
        ], $data));
    }

    public function dashboard()
    {
        $user = Auth::user();
        if ($user->is_admin) {
            return $this->renderPage('Private/Dashboard/admin/page', $this->getAdminData());
        }
        return $this->renderPage('Private/Dashboard/users/analytics/page', $this->getUserData());
    }

    private function getAdminData()
    {
        // Fetch admin-specific data
        return [];
    }

    private function getUserData()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        $dashboardData = $this->dashboardService->getDashboardData($role);
        $cars = $this->dashboardService->getUserCars();
        $monthlyBids = $this->bidStatisticsService->getMonthlyBids($user->id);

        $transactions = $this->dashboardService->getUserCarsWithTransactions();

        // Get the month range
        $startMonth = $monthlyBids->first() ? $monthlyBids->first()->month : '';
        $endMonth = $monthlyBids->last() ? $monthlyBids->last()->month : '';
        $monthLabel = $startMonth . ' - ' . $endMonth;
        $totalProfit = $this->dashboardService->calculateTotalProfit($cars);
        $dashboardData['cars'] = $cars->get();
        $dashboardData['monthly_bids'] = $monthlyBids;
        $dashboardData['month_label'] = $monthLabel;
        $dashboardData['total_profit'] = $totalProfit;
        $dashboardData['transactions'] = $transactions;
        $dashboardData['average_bidding'] = $monthlyBids->avg('average_bidding');

        return $dashboardData;
    }

    public function redirectToDashboard()
    {
        $role = Auth::user()->is_admin ? 'admin' : 'user';

        return $role === 'admin'
        ? redirect()->route('admin.dashboard')
        : redirect()->route('user.dashboard');
    }

    public function userManagementDashboard()
    {
        return $this->renderPage('Private/Dashboard/admin/user-management');
    }

    public function carManagementDashboard()
    {
        return $this->renderPage('Private/Dashboard/admin/car-management');
    }

    public function salesDashboard(Request $request)
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';

        // Retrieve query parameters for filters
        $search = $request->input('search');
        $filterFuel = $request->input('fuel');
        $filterDate = $request->input('date');

        // Query transactions with filters and eager loading
        $transactionsQuery = Car::with(['fuel', 'transaction.buyer'])
        ->when($search, function ($query, $search) {
            $query->where('model', 'LIKE', "%{$search}%")
            ->orWhere('transaction_id', 'LIKE', "%{$search}%");
        })
            ->when($filterFuel, function ($query, $filterFuel) {
                $query->whereHas('fuel', function ($subQuery) use ($filterFuel) {
                    $subQuery->where('name', $filterFuel);
                });
            })
            ->when($filterDate, function ($query, $filterDate) {
                $query->whereDate('transaction_date', $filterDate);
            });

        // Paginate results
        $transactions = $transactionsQuery->paginate(10);

        $dashboardData = $this->dashboardService->getDashboardData($role);
        $dashboardData['transactions'] = $transactions;

        return $this->renderPage('Private/Dashboard/users/analytics/sales', $dashboardData);
    }


    public function uploadCarDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $userData = User::with('profile')->findOrFail($user->id);
        $brands = Brand::all();
        $fuels = Fuel::all();
        $engines = Engine::all();
        $cars = Car::with(['brand', 'fuel', 'engine'])->get();

        // adding data
        $dashboardData = $this->dashboardService->getDashboardData($role);
        $dashboardData['user'] = $userData;
        $dashboardData['brands'] = $brands;
        $dashboardData['fuels'] = $fuels;
        $dashboardData['cars'] = $cars;
        $dashboardData['engines'] = $engines;

        return $this->renderPage('Private/Dashboard/users/cars/sell', $dashboardData);
    }

    public function editCarDashboard($id)
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $userData = User::with('profile')->findOrFail($user->id);
        $brands = Brand::all();

        $fuels = Fuel::all();
        $currentCar = Car::with(['brand', 'fuel'])->findOrFail($id);

        // Add data to the dashboard
        $dashboardData = $this->dashboardService->getDashboardData($role);
        $dashboardData['user'] = $userData;
        $dashboardData['brands'] = $brands;
        $dashboardData['fuels'] = $fuels;
        $dashboardData['currentCar'] = $currentCar; // Pass the current car data

        return $this->renderPage('Private/Dashboard/users/cars/edit', $dashboardData);
    }


    public function biddingCarDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $allBids = $this->dashboardService->getBiddingRelatedWithUserCar();
        $dashboardData = $this->dashboardService->getDashboardData($role);
        $dashboardData['allBids'] = $allBids;

        return $this->renderPage('Private/Dashboard/users/cars/bidding', $dashboardData);
    }

    public function carListDashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $cars = $this->dashboardService->getUserCars()->paginate(15);;

        $dashboardData = $this->dashboardService->getDashboardData($role);
        // Add images to cars
        foreach ($cars->items() as $car) {
            $car->image = $car->image ? asset('storage/' . $car->image) : null;
        }
        $dashboardData['cars'] = $cars;

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

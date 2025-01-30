<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use App\Models\Brand;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Car;
use App\Models\Fuel;
use Illuminate\Http\Request;

class PublicPageController extends Controller
{
    /**
     * Render a public page with dynamic data.
     *
     * @param string $view The view to render.
     * @param array $data Additional data for the view.
     * @return \Inertia\Response
     */
    public function renderPage(string $view, $data = [])
    {
        return Inertia::render($view, array_merge([
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'isLoggedIn' => Auth::check(),
            'isPublicPage' => true,
        ], $data));
    }

    public function welcome()
    {
        return $this->renderPage('Public/HomePage/page');
    }

    public function forSale()
    {
        $cars = Car::with(['brand', 'fuel', 'engine', 'user'])->get();
        $brands = Brand::all();
        $fuels = Fuel::all();
        $data = [
            'cars' => $cars,
            'brands' => $brands,
            'fuels' => $fuels,
        ];
        return $this->renderPage('Public/ForSalePage/page', $data);
    }

    public function aboutUs()
    {
        return $this->renderPage('Public/AboutUsPage/page');
    }

    public function contactUs()
    {
        return $this->renderPage('Public/ContactUsPage/page');
    }

    /**
     * Display detailed information about a specific car.
     *
     * @param int $id The ID of the car.
     * @return \Inertia\Response
     */
    public function carDetailsPage($id)
    {
        $currentCar = Car::with(['brand', 'fuel', 'engine', 'user', 'user.profile'])->findOrFail($id);
        $currentCar->image = $currentCar->image ? asset('storage/' . $currentCar->image) : null;

        $currentBids = Bid::with('user')->where('car_id', $id)->get();
        $highestBid = $currentBids->max('bid_price');
        $lastBid = $currentBids->last();

        $bidable = false;
        $isOwner = false;
        $user = null;

        if (Auth::check()) {
            $user = Auth::user();
            $isOwner = $user->id === $currentCar->user_id;
            $bidable = $user->id !== $currentCar->user_id && $currentCar->bid_status !== 'close';
        }

        $data = [
            'car' => $currentCar,
            'currentBid' => $currentBids,
            'highestBid' => $highestBid,
            'lastBid' => $lastBid,
            'user' => $user,
            'isOwner' => $isOwner,
            'bidable' => $bidable,
        ];

        return $this->renderPage('Public/CarListingsPage/details', $data);
    }

    /**
     * Display a list of cars with optional filters.
     *
     * @param Request $request The HTTP request object.
     * @return \Inertia\Response
     */
    public function carListing(Request $request)
    {
        $query = Car::with(['brand', 'fuel', 'engine', 'user'])->orderBy('created_at', 'desc');;

        if ($request->input('clearFilters') === 'true') {
            return $this->renderClearFilters($query);
        }

        $selectedFilters = [
            'brands' => $this->parseFilter($request->input('brands')),
            'fuels' => $this->parseFilter($request->input('fuels')),
            'priceMin' => $request->input('priceMin'),
            'priceMax' => $request->input('priceMax'),
            'yearStart' => $request->input('yearStart'),
            'yearEnd' => $request->input('yearEnd'),
        ];

        $this->applyFilters($query, $selectedFilters);

        $cars = $query->paginate(15);
        $status = $cars->isEmpty()
        ? 'No cars found matching your filters. Please adjust your search criteria.'
        : 'Cars found matching your filters.';

        foreach ($cars->items() as $car) {
            $car->image = $car->image ? asset('storage/' . $car->image) : null;
        }

        $brands = Brand::all();
        $fuels = Fuel::all();

        return $this->renderPage('Public/CarListingsPage/page', [
            'cars' => $cars,
            'brands' => $brands,
            'fuels' => $fuels,
            'selectedFilters' => $selectedFilters,
            'isFilterActive' => $this->isFilterActive($selectedFilters),
            'status' => $status,
        ]);
    }

    /**
     * Render response when filters are cleared.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Inertia\Response
     */
    private function renderClearFilters($query)
    {
        $cars = $query->paginate(15);
        $brands = Brand::all();
        $fuels = Fuel::all();

        return $this->renderPage('Public/CarListingsPage/page', [
            'cars' => $cars,
            'brands' => $brands,
            'fuels' => $fuels,
            'selectedFilters' => [],
            'isFilterActive' => false,
            'status' => 'All cars are displayed.',
        ]);
    }

    private function parseFilter($filter)
    {
        return $filter && strtolower($filter) !== 'all' ? explode(',', $filter) : [];
    }

    /**
     * Apply filters to the car query based on user input.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query The car query.
     * @param array $filters The filters to apply.
     */
    private function applyFilters(&$query, array $filters)
    {
        if (!empty($filters['brands'])) {
            $query->whereHas('brand', function ($subQuery) use ($filters) {
                $subQuery->whereIn('name', $filters['brands']);
            });
        }

        if (!empty($filters['fuels'])) {
            $query->whereHas('fuel', function ($subQuery) use ($filters) {
                $subQuery->whereIn('name', $filters['fuels']);
            });
        }

        if (!empty($filters['priceMin'])) {
            $query->where('price', '>=', $filters['priceMin']);
        }

        if (!empty($filters['priceMax'])) {
            $query->where('price', '<=', $filters['priceMax']);
        }

        if (!empty($filters['yearStart'])) {
            $query->where('registration_year', '>=', $filters['yearStart']);
        }

        if (!empty($filters['yearEnd'])) {
            $query->where('registration_year', '<=', $filters['yearEnd']);
        }
    }

    /**
     * Check if any filters are active.
     *
     * @param array $filters The filters to check.
     * @return bool
     */
    private function isFilterActive(array $filters)
    {
        return !empty($filters['brands']) ||
            !empty($filters['fuels']) ||
            !empty($filters['priceMin']) ||
            !empty($filters['priceMax']) ||
            !empty($filters['yearStart']) ||
            !empty($filters['yearEnd']);
    }
}

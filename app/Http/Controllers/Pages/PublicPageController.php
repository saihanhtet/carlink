<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
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
     * Render a public page dynamically.
     *
     * @param string $view
     * @return \Inertia\Response
     */
    public function renderPage(string $view, $data = [])
    {
        return Inertia::render($view, array_merge([
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'isLoggedIn' => Auth::check(),
        ], $data));
    }

    public function welcome()
    {
        return $this->renderPage('Public/HomePage/page');
    }

    public function forSale()
    {
        return $this->renderPage('Public/ForSalePage/page');
    }

    public function aboutUs()
    {
        return $this->renderPage('Public/AboutUsPage/page');
    }

    public function contactUs()
    {
        return $this->renderPage('Public/ContactUsPage/page');
    }

    public function carListing(Request $request)
    {
        $query = Car::with(['brand', 'fuel']);

        // Check if "clear" action is requested
        if ($request->input('clearFilters') === 'true') {
            // Return all cars with no filters applied
            $cars = $query->paginate(15);

            $brands = Brand::all();
            $fuels = Fuel::all();

            return $this->renderPage('Public/CarListingsPage/page', [
                'cars' => $cars,
                'brands' => $brands,
                'fuels' => $fuels,
                'selectedFilters' => [], // Clear all selected filters
                'isFilterActive' => false,
                'status' => 'All cars are displayed.',
            ]);
        }

        // Otherwise, process selected filters
        $selectedFilters = [
            'brands' => $request->input('brands') ? explode(',', $request->input('brands')) : [],
            'fuels' => $request->input('fuels') ? explode(',', $request->input('fuels')) : [],
            'priceMin' => $request->input('priceMin'),
            'priceMax' => $request->input('priceMax'),
            'yearStart' => $request->input('yearStart'),
            'yearEnd' => $request->input('yearEnd'),
        ];

        // Apply reusable query filter logic
        $this->applyFilters($query, $selectedFilters);

        // Paginate results
        $cars = $query->paginate(15);

        $status = $cars->isEmpty()
            ? 'No cars found matching your filters. Please adjust your search criteria.'
            : 'Cars found matching your filters.';

        // Add images to cars
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
     * Apply filters dynamically to the query based on selected filters.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $filters
     * @return void
     */
    private function applyFilters(&$query, array $filters)
    {
        // Filter by brand names
        if (!empty($filters['brands'])) {
            $query->whereHas('brand', function ($subQuery) use ($filters) {
                $subQuery->whereIn('name', $filters['brands']);
            });
        }

        // Filter by fuel types
        if (!empty($filters['fuels'])) {
            $query->whereHas('fuel', function ($subQuery) use ($filters) {
                $subQuery->whereIn('name', $filters['fuels']);
            });
        }

        // Filter by minimum price
        if (!empty($filters['priceMin'])) {
            $query->where('price', '>=', $filters['priceMin']);
        }

        // Filter by maximum price
        if (!empty($filters['priceMax'])) {
            $query->where('price', '<=', $filters['priceMax']);
        }

        // Filter by start year
        if (!empty($filters['yearStart'])) {
            $query->where('registration_year', '>=', $filters['yearStart']);
        }

        // Filter by end year
        if (!empty($filters['yearEnd'])) {
            $query->where('registration_year', '<=', $filters['yearEnd']);
        }
    }

    /**
     * Determine if any filters are active.
     *
     * @param array $filters
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

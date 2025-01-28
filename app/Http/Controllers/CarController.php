<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    /**
     * Display a listing of cars with images.
     */
    public function index()
    {
        $cars = Car::with(['brand'])
        ->get()
            ->map(function ($car) {
                $car->image = $car->image ? asset('storage/cars_images/' . basename($car->image)) : null;
                return $car;
            });
        return response()->json($cars);
    }

    /**
     * Show the details of a single car.
     */
    public function show(Car $car)
    {
        $car->image = $car->image ? asset('storage/cars_images/' . basename($car->image)) : null;
        return response()->json($car);
    }

    /**
     * Store a new car in the database.
     */
    public function store(Request $request)
    {
        $validated = $this->validateCar($request);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $this->storeImage($request->file('image'));
        }

        // Create the car
        $car = Car::create(array_merge($validated, ['user_id' => Auth::id()]));

        return Redirect::route('car-upload-dashboard')->with('success', 'Car created successfully.');
    }

    /**
     * Update the details of an existing car.
     */
    public function update(Request $request, Car $car)
    {
        $validated = $this->validateCar($request);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            if ($car->image) {
                Storage::disk('public')->delete($car->image);
            }
            $validated['image'] = $this->storeImage($request->file('image'));
        }

        // Update car
        $car->update($validated);

        return Redirect::route('car-list-dashboard')->with('success', 'Car updated successfully.');
    }

    /**
     * Delete a car and its associated image.
     */
    public function destroy(Car $car)
    {
        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        $car->delete();

        return Redirect::route('car-list-dashboard')->with('success', 'Car deleted successfully.');
    }

    /**
     * Validate car data.
     */
    private function validateCar(Request $request)
    {
        return $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'engine_id' => 'required|exists:engines,id',
            'model' => 'required|string|max:255',
            'registration_year' => 'required|integer|min:1900|max:' . now()->year,
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'transmission' => 'required|string|max:255',
            'seats' => 'required|integer|min:2|max:10',
            'description' => 'nullable|string|max:255',
            'dealer_name' => 'required|string|max:255',
            'dealer_location' => 'required|string|max:255',
            'price_category' => 'nullable|in:Not Available,Good Deal,Fair Deal,Overpriced,Underpriced',
            'car_status' => 'nullable|in:available,sold',
            'bid_status' => 'nullable|in:open,close',
        ]);
    }

    /**
     * Store the uploaded image and return its path.
     */
    private function storeImage($image)
    {
        return $image->store('cars_images', 'public');
    }
}

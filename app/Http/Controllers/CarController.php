<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Brand;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function show($id)
    {
        $car = Car::findOrFail($id);
        return response()->json($car);
    }
    // List all cars
    public function index()
    {
        $cars = Car::with('brand')->get();
        return response()->json($cars);
    }

    // Show the form to create a car (useful if you're using React frontend)
    public function create()
    {
        $brands = Brand::all();
        return response()->json($brands);
    }

    // Store a new car
    public function store(Request $request)
    {
        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:255',
            'registration_year' => 'required|integer|min:1900|max:' . date('Y'),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'dealer_name' => 'required|string|max:255',
            'dealer_location' => 'required|string|max:255',
            'price_category' => 'nullable|in:Good Deal,Fair Deal,Overpriced',
            'status' => 'nullable|in:open,close',
            'image' => 'required|string',
        ]);

        $car = Car::create(array_merge($request->all(), ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Car created successfully.',
            'car' => $car,
        ], 201);
    }

    // Show the form to edit a car (useful if you're using React frontend)
    public function edit(Car $car)
    {
        $brands = Brand::all();
        return response()->json([
            'car' => $car,
            'brands' => $brands
        ]);
    }

    // Update car details
    public function update(Request $request, Car $car)
    {
        $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string',
            'registration_year' => 'required|integer',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'price_category' => 'nullable|in:Good Deal,Fair Deal,Overpriced',
            'status' => 'nullable|in:open,close',
            'image' => 'required|string',
        ]);

        $car->update($request->all());

        return response()->json([
            'message' => 'Car updated successfully.',
            'car' => $car
        ]);
    }

    // Delete a car
    public function destroy(Car $car)
    {
        $car->delete();
        return response()->json(['message' => 'Car deleted successfully.']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    // List all cars with storage assets (including images)
    public function index()
    {
        $cars = Car::with([
            'brand'
        ])->get()->map(function ($car) {
            $car->image = $car->image ? asset('storage/cars_images/' . basename($car->image)) : null; // Update image URL path
        });

        return response()->json($cars);
    }

    public function show($id)
    {
        $car = Car::findOrFail($id);
        $car->image = $car->image ? asset('storage/cars_images/' . basename($car->image)) : null; // Update image URL path
        return response()->json($car);
    }

    // Store a new car with an image
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'model' => 'required|string|max:255',
            'registration_year' => 'required|integer|min:1900|max:' . date('Y'),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|numeric|min:0',
            'dealer_name' => 'required|string|max:255',
            'dealer_location' => 'required|string|max:255',
            'price_category' => 'nullable|in:Good Deal,Fair Deal,Overpriced, Underpriced',
            'status' => 'nullable|in:open,close',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('cars_images', 'public'); // Store image in 'cars_images' folder
            $validated['image'] = $imagePath; // Store image path in the database
        }

        // Create the car
        $car = Car::create(array_merge($validated, ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Car created successfully.',
            'car' => $car,'image_url' => $car->image ? asset('storage/cars_images/' . basename($car->image)) : null, // Return image URL
        ], 201);
    }

    // Update car details with image
    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'model' => 'required|string',
            'registration_year' => 'required|integer',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'price_category' => 'nullable|in:Good Deal,Fair Deal,Overpriced',
            'status' => 'nullable|in:open,close',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            if ($car->image) {
                Storage::disk('public')->delete($car->image); // Delete old image
            }
            $imagePath = $request->file('image')->store('cars_images', 'public'); // Store new image in 'cars_images' folder
            $validated['image'] = $imagePath; // Store image path in the database
        }

        // Update car
        $car->update($validated);

        return response()->json([
            'message' => 'Car updated successfully.','car' => $car,
            'image_url' => $car->image ? asset('storage/cars_images/' . basename($car->image)) : null, // Return image URL
        ]);
    }

    // Delete a car and its image
    public function destroy(Car $car)
    {
        if ($car->image) {
            Storage::disk('public')->delete($car->image); // Delete image file
        }

        $car->delete();
        return response()->json(['message' => 'Car deleted successfully.']);
    }
}

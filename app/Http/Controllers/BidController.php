<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Car;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class BidController extends Controller
{
    // Fetch all bids with related car and user data
    public function index()
    {
        $bids = Bid::with(['car', 'user'])->get();
        return response()->json($bids); // Return data as JSON
    }

    // Fetch available cars for placing bids
    public function create()
    {
        $cars = Car::all();
        return response()->json($cars); // Return cars as JSON
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['car_id' => 'required|exists:cars,id',
            'bid_price' => 'required|numeric|min:1', // Ensure bid price is a valid positive number
        ]);

        // Fetch the car to perform additional checks
        $car = Car::findOrFail($validated['car_id']);

        // Check if the authenticated user is the owner of the car
        if ($car->user_id === auth()->id()) {
            return back()->withErrors(['bid_price' => 'You cannot place a bid on your own car.']);
        }

        // Get the highest current bid for the car
        $highestBid = Bid::where('car_id', $car->id)->max('bid_price');

        // Check if the new bid is higher than the highest bid
        if ($highestBid && $validated['bid_price'] <= $highestBid) {
            return back()->withErrors(['bid_price' => 'Your bid must be higher than the current highest bid of ' . number_format($highestBid, 2) . '.']);
        }

        // Create the bid
        Bid::create([
            'car_id' => $validated['car_id'],
            'bid_price' => $validated['bid_price'],
            'user_id' => auth()->id(),
        ]);

        // Redirect to the car details page
        return redirect()->route('car-details-page', $validated['car_id'])
        ->with('success', 'Your bid has been placed successfully.');
    }
    // Delete a bid
    public function destroy(Bid $bid)
    {
        $bid->delete();

        return response()->json([
            'message' => 'Bid deleted successfully.',
        ], 200); // Return success message
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Car;
use Illuminate\Http\Request;

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

    // Store a new bid
    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'bid_price' => 'required|numeric|min:1', // Ensure bid price is valid
        ]);

        $bid = Bid::create(array_merge($validated, ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Bid placed successfully.',
            'bid' => $bid,
        ], 201); // Return success with created bid data
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

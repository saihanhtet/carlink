<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TransactionController extends Controller
{
    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction);
    }
    // List all transactions
    public function index()
    {
        $transactions = Transaction::with(['car', 'buyer'])->get();
        return response()->json($transactions);
    }

    // Show the form to create a transaction (useful if you're using React frontend)
    public function create()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'final_price' => 'required|numeric',
            'buyer_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'transaction_date' => 'required|date',
        ]);

        // Store the transaction
        Transaction::create($request->all());
        // Update the car status to 'sold'
        $car = Car::find($request->car_id);
        if ($car) {
            $car->update(['car_status' => 'sold']);
            $car->update(['bid_status' => 'close']);
        }
        // Redirect with success message
        return Redirect::route('bidding-history-dashboard')->with('success', 'Created transaction and updated car status successfully.');
    }

    // Delete a transaction
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully.']);
    }
}

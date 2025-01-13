<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Car;
use Illuminate\Http\Request;

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

    // Store a new transaction
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'final_price' => 'required|numeric',
            'transaction_date' => 'required|date',
        ]);

        // Store the transaction
        $transaction = Transaction::create(array_merge($request->all(), ['buyer_id' => auth()->id()]));

        return response()->json([
            'message' => 'Transaction recorded successfully.',
            'transaction' => $transaction,
        ], 201);
    }

    // Delete a transaction
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully.']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['car', 'user'])->get();
        return view('bookings.index', compact('bookings'));
    }

    public function create()
    {
        $cars = Car::all();
        return view('bookings.create', compact('cars'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'schedule_date' => 'required|date|after_or_equal:today',
        ]);

        Booking::create(array_merge($request->all(), ['user_id' => Auth::id(), 'status' => 'pending']));

        return redirect()->route('car-details-page', $validated['car_id'])
            ->with('success', 'Your Booking has been placed successfully. Please wait for the approval.');
    }

    public function updateAppointmentStatus(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:bookings,id',
            'status' => 'required|string|in:pending,approved,denied',
        ]);
        $booking = Booking::findOrFail($validated['id']);
        $booking->update([
            'status' => $validated['status'],
        ]);
        return Redirect::route('booking-management-dashboard')->with('status', 'Booking approved.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->route('bookings.index')->with('success', 'Booking canceled.');
    }
}

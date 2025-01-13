<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Car;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with(['car', 'user'])->get();
        return view('appointments.index', compact('appointments'));
    }

    public function create()
    {
        $cars = Car::all();
        return view('appointments.create', compact('cars'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'appointment_date' => 'required|date|after_or_equal:today',
        ]);

        Appointment::create(array_merge($request->all(), ['user_id' => auth()->id(), 'status' => 'pending']));

        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'Appointment canceled successfully.');
    }
}

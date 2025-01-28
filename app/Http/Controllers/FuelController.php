<?php

namespace App\Http\Controllers;

use App\Models\Fuel;
use Illuminate\Http\Request;

class FuelController extends Controller
{
    public function index()
    {
        $Fuels = Fuel::all();
        return response()->json($Fuels);
    }

    public function create()
    {
        return view('fuels.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:Fuels,name',
        ]);
        Fuel::create($request->only('name'));
        return redirect()->route('fuels.index')->with('success', 'Fuel created successfully.');
    }

    public function show(Fuel $Fuel)
    {
        return view('fuels.show', compact('Fuel'));
    }

    public function edit(Fuel $Fuel)
    {
        return view('fuels.edit', compact('Fuel'));
    }

    public function update(Request $request, Fuel $Fuel)
    {
        $request->validate([
            'name' => 'required|string|unique:Fuels,name,' . $Fuel->id,
        ]);

        $Fuel->update($request->only('name'));
        return redirect()->route('fuels.index')->with('success', 'Fuel updated successfully.');
    }

    public function destroy(Fuel $Fuel)
    {
        $Fuel->delete();
        return redirect()->route('fuels.index')->with('success', 'Fuel deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Engine;
use Illuminate\Http\Request;

class EngineController extends Controller
{
    public function index()
    {
        $engines = Engine::all();
        return response()->json($engines);
    }

    public function create()
    {
        return view('engines.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:Engines,name',
        ]);
        Engine::create($request->only('name'));
        return redirect()->route('engines.index')->with('success', 'Engine created successfully.');
    }

    public function show(Engine $engine)
    {
        return view('engines.show', compact('Engine'));
    }

    public function edit(Engine $engine)
    {
        return view('engines.edit', compact('Engine'));
    }

    public function update(Request $request, Engine $engine)
    {
        $request->validate([
            'name' => 'required|string|unique:Engines,name,' . $engine->id,
        ]);
        $engine->update($request->only('name'));
        return redirect()->route('engines.index')->with('success', 'Engine updated successfully.');
    }

    public function destroy(Engine $engine)
    {
        $engine->delete();
        return redirect()->route('engines.index')->with('success', 'Engine deleted successfully.');
    }
}

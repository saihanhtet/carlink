<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $model; // The model class to be used by the controller

    public function __construct($model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json($this->model::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'Render create form here.']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate($this->model::validationRules());
        $item = $this->model::create($data);

        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = $this->model::findOrFail($id);

        return response()->json($item);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $item = $this->model::findOrFail($id);

        return response()->json(['message' => 'Render edit form here.', 'item' => $item]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate($this->model::validationRules());
        $item = $this->model::findOrFail($id);
        $item->update($data);

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = $this->model::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

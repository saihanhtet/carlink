<?php

use App\Models\Brand;
use App\Models\Fuel;
use App\Models\User;

test('user can view car listings', function () {
    $user = User::factory()->create(); // Create a test user
    $this->actingAs($user); // Log the user in

    $response = $this->get('/cars'); // Access the route
    $response->assertOk(); // Assert that the response is a 200 OK
});

test('authenticated user can create a car listing', function () {
    $user = User::factory()->create(); // Create a user
    $brand = Brand::factory()->create(); // Create a brand
    $fuel = Fuel::factory()->create();

    $this->actingAs($user); // Log the user in

    $response = $this->post('/cars', [
        'brand_id' => $brand->id, // Use the valid brand_id
        'model' => 'Model Y',
        'registration_year' => 2023,
        'price' => 50000,
        'mileage' => 15000,
        'dealer_name' => 'Dealer XYZ',
        'dealer_location' => 'Location ABC',
        'status' => 'open',
        'fuel_id' => $fuel->id,
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/dashboard/cars/car-upload');
    $this->assertDatabaseHas('cars', [
        'model' => 'Model Y',
        'brand_id' => $brand->id,
    ]);
});




test('car listing requires all fields', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/cars', []);

    $response->assertSessionHasErrors(['brand_id', 'model', 'price']);
});

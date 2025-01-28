<?php

use App\Models\Brand;
use App\Models\Engine;
use App\Models\Fuel;
use App\Models\User;

test('user can view car listings', function () {
    $user = User::factory()->create(); // Create a test user
    $this->actingAs($user); // Log the user in

    $response = $this->get('/cars');
    $response->assertOk();
});

test('authenticated user can create a car listing', function () {
    $user = User::factory()->create(); // Create a user
    $brand = Brand::factory()->create(['name' => 'Toyota']); // Create the Toyota brand
    $fuel = Fuel::factory()->create();
    $engine = Engine::factory()->create();

    $this->actingAs($user); // Log the user in

    $response = $this->post('/cars', [
        'brand_id' => $brand->id,
        'fuel_id' => $fuel->id,
        'engine_id' => $engine->id,
        'model' => 'Corolla',
        'registration_year' => 2023,
        'price' => 30000,
        'mileage' => 12000,
        'transmission' => 'Automatic',
        'seats' => 3,
        'description' => 'A reliable Toyota car with excellent mileage.',
        'dealer_name' => 'Dealer XYZ',
        'dealer_location' => 'Location ABC',
        'price_category' => 'Good Deal',
    ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/dashboard/cars/car-upload');
    $this->assertDatabaseHas('cars', [
        'model' => 'Corolla',
        'brand_id' => $brand->id,
        'fuel_id' => $fuel->id,
        'engine_id' => $engine->id,
    ]);
});

test('car listing requires all fields', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/cars', []);

    $response->assertSessionHasErrors(['brand_id', 'model', 'price']);
});

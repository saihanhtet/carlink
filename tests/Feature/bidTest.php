<?php

use App\Models\Bid;
use App\Models\User;
use App\Models\Car;

test('user can view their bids', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/bids');

    $response->assertOk();
});

test('user can place a bid', function () {
    $user = User::factory()->create();
    $car = Car::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/bids', [
            'car_id' => $car->id,
            'bid_price' => 15000,
        ]);

    $response->assertSessionHasNoErrors()
        ->assertRedirect("/car-details/{$car->id}");
    // Check that the bid was stored in the database
    $this->assertDatabaseHas('bids', [
        'car_id' => $car->id,
        'bid_price' => 15000,
    ]);
});


test('bid price must be valid', function () {
    $user = User::factory()->create();
    $car = Car::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/bids', [
            'car_id' => $car->id,
            'bid_price' => -100, // Invalid price
        ]);

    $response->assertSessionHasErrors('bid_price');
});

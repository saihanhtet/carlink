<?php

use App\Models\Transaction;
use App\Models\User;
use App\Models\Car;

test('user can view transactions', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/transactions');

    $response->assertOk();
});

test('transaction can be created', function () {
    $user = User::factory()->create();
    $car = Car::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/transactions', [
            'buyer_id' => $user->id,
            'car_id' => $car->id,
            'final_price' => 20000,
            'transaction_date' => now(),
        ]);

    $response->assertStatus(201);
    $this->assertDatabaseHas('transactions', [
        'buyer_id' => $user->id,
        'car_id' => $car->id,
    ]);
});

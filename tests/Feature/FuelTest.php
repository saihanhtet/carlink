<?php

use App\Models\Fuel;
use App\Models\User;

test('user can view all fuels', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/fuels');
    $response->assertOk();
});

test('user can create a fuel', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/fuels', [
            'name' => 'Diesel',
        ]);

    $response->assertSessionHasNoErrors()
        ->assertRedirect('/fuels');

    $this->assertDatabaseHas('fuels', [
        'name' => 'Diesel',
    ]);
});

test('fuel name must be unique', function () {
    $user = User::factory()->create();
    Fuel::factory()->create(['name' => 'Duplicate Fuel']);

    $response = $this
        ->actingAs($user)
        ->post('/fuels', [
            'name' => 'Duplicate Fuel',
        ]);

    $response->assertSessionHasErrors('name');
});

test('user can update a fuel', function () {
    $user = User::factory()->create();
    $fuel = Fuel::factory()->create(['name' => 'Old Fuel']);

    $response = $this
        ->actingAs($user)
        ->put("/fuels/{$fuel->id}", [
            'name' => 'Updated Fuel',
        ]);

    $response->assertSessionHasNoErrors()
        ->assertRedirect('/fuels');

    $this->assertDatabaseHas('fuels', [
        'id' => $fuel->id,
        'name' => 'Updated Fuel',
    ]);
});

test('user can delete a fuel', function () {
    $user = User::factory()->create();
    $fuel = Fuel::factory()->create();

    $response = $this->actingAs($user)->delete("/fuels/{$fuel->id}");

    $response->assertRedirect('/fuels');

    $this->assertDatabaseMissing('fuels', [
        'id' => $fuel->id,
    ]);
});

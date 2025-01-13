<?php

use App\Models\Appointment;
use App\Models\User;
use App\Models\Car;

test('user can create an appointment', function () {
    $user = User::factory()->create();
    $car = Car::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/appointments', [
            'car_id' => $car->id,
            'user_id' => $user->id, // Ensure user_id is passed
            'appointment_date' => now()->addDay(), // Match validation rules
            'status' => 'pending',
        ]);

    $response->assertSessionHasNoErrors()->assertRedirect('/appointments');
    $this->assertDatabaseHas('appointments', [
        'car_id' => $car->id,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);
});

test('user can delete an appointment', function () {
    $user = User::factory()->create();
    $appointment = Appointment::factory()->create(['user_id' => $user->id]);

    $response = $this
        ->actingAs($user)
        ->delete("/appointments/{$appointment->id}");

    $response->assertRedirect('/appointments');
    $this->assertDatabaseMissing('appointments', ['id' => $appointment->id]);
});

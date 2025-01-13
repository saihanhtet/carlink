<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition()
    {
        return [
            'car_id' => Car::factory(), // Creates and associates a car
            'user_id' => User::factory(), // Creates and associates a user
            'appointment_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'status' => $this->faker->randomElement(['pending', 'approved', 'denied']),
        ];
    }
}

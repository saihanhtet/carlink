<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Creates and associates a user
            'avatar' => $this->faker->imageUrl(640, 480, 'people', true), // Avatar image
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'birth_date' => $this->faker->dateTimeBetween('-30 years', '-18 years'), // 18+ users
        ];
    }
}

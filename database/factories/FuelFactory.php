<?php

namespace Database\Factories;

use App\Models\Fuel;
use Illuminate\Database\Eloquent\Factories\Factory;

class FuelFactory extends Factory
{
    protected $model = Fuel::class;

    public function definition()
    {
        $fuels = [
            'Gasoline (Petrol)',
            'Diesel',
            'Electric',
            'Hybrid',
            'Hydrogen',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($fuels),
        ];
    }
}

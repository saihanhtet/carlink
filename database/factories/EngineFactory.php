<?php

namespace Database\Factories;

use App\Models\Engine;
use Illuminate\Database\Eloquent\Factories\Factory;

class EngineFactory extends Factory
{
    protected $model = Engine::class;

    public function definition()
    {
        $engines = [
            '1.8L',
            '2.0L Turbo',
            'Electric',
            '5.0L V8',
            '3.0L Turbo',
            '2.0L Diesel',
            '2.0L Turbo'
        ];

        return [
            'name' => $this->faker->unique()->randomElement($engines),
        ];
    }
}

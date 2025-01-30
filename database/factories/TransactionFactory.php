<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition()
    {
        return [
            'car_id' => Car::factory(),
            'buyer_id' => User::factory(),
            'seller_id' => User::factory(),
            'final_price' => $this->faker->numberBetween(5000, 100000),
        ];
    }
}

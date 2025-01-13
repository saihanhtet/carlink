<?php

namespace Database\Factories;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition()
    {
        return [
            'car_id' => Car::factory(), // Creates and associates a car
            'buyer_id' => User::factory(), // Creates and associates a buyer
            'final_price' => $this->faker->numberBetween(5000, 100000),
            'transaction_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}

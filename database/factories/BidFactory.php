<?php

namespace Database\Factories;

use App\Models\Bid;
use App\Models\User;
use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class BidFactory extends Factory
{
    protected $model = Bid::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get the car_id as a parameter or create a new car
        $car = Car::find($this->state['car_id'] ?? Car::factory()->create()->id);
        // Find the car owner
        $carOwner = $car->user_id;
        // Randomly select a user who is NOT the car owner
        $user = User::where('id', '!=', $carOwner)->inRandomOrder()->first();
        // Generate a bid timestamp that is after the car's created_at timestamp
        $bidTimestamp = $this->faker->dateTimeBetween($car->created_at, 'now');
        return [
            'car_id' => $car->id, // Associate the car
            'user_id' => $user->id, // Assign the user who is not the car owner
            'bid_price' => $this->faker->numberBetween(5000, 100000), // Random bid price
            'created_at' => $bidTimestamp, // Set the bid creation timestamp
            'updated_at' => $bidTimestamp, // Set the bid updated timestamp
        ];
    }
}

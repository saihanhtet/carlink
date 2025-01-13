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
     * @param int $carId
     * @return array
     */
    public function definition()
    {
        // Get the car_id as a parameter
        $carId = $this->state['car_id'] ?? Car::factory()->create()->id; // Create a car if not provided
        // Find the car owner
        $carOwner = Car::find($carId)->user_id;
        // Randomly select a user who is NOT the car owner
        $user = User::where('id', '!=', $carOwner)->inRandomOrder()->first();

        return [
            'car_id' => $carId, // Associate the car
            'user_id' => $user->id, // Assign the user who is not the car owner
            'bid_price' => $this->faker->numberBetween(5000, 100000), // Random bid price
        ];
    }
}

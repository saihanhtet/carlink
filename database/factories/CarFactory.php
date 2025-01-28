<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use App\Models\Brand;
use App\Models\Engine;
use App\Models\Fuel;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition()
    {
        $carsByBrand = [
            'Toyota' => ['Corolla', 'Camry', 'RAV4', 'Prius'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Fit'],
            'Ford' => ['Focus', 'Fiesta', 'Mustang', 'Explorer'],
            'Audi' => ['A3 e-tron', 'Q5', 'A6', 'Q7'],
        ];

        $priceCategory = ['Good Deal', 'Fair Deal', 'Overpriced'];
        $transmissionCategory = ['Automatic', 'Manual'];
        $dealers = [
            ['name' => 'The Autobarn Volkswagen of Countryside', 'location' => 'Raleigh, NC'],
            ['name' => 'Luxury Auto Mart', 'location' => 'Charlotte, NC'],
            ['name' => 'Dream Cars Dealer', 'location' => 'Austin, TX'],
        ];
        // Select a random brand
        $brand = Brand::inRandomOrder()->first() ?? Brand::factory()->create();
        $fuel = Fuel::inRandomOrder()->first() ?? Fuel::factory()->create();
        $engine = Engine::inRandomOrder()->first() ?? Engine::factory()->create();
        // Select a random model based on the brand
        $models = $carsByBrand[$brand->name] ?? ['Generic Model'];
        // Select a random dealer
        $dealer = $this->faker->randomElement($dealers);
        // Generate a random timestamp within the last 12 months
        $createdAt = $this->faker->dateTimeBetween('-12 months', 'now');

        return [
            'user_id' => User::factory(),
            'brand_id' => $brand->id,
            'fuel_id' =>  $fuel->id,
            'engine_id' => $engine->id,

            'model' => $this->faker->randomElement($models),
            'registration_year' => $this->faker->numberBetween(2000, date('Y')),
            'price' => $this->faker->numberBetween(5000, 50000),
            'mileage' => $this->faker->numberBetween(5000, 150000),
            'image' => $this->faker->imageUrl(640, 480, 'cars', true),
            'transmission' => $this->faker->randomElement($transmissionCategory),
            'seats' => $this->faker->numberBetween(2, 8),
            'description' => $this->faker->text(100),

            'dealer_name' => $dealer['name'],
            'dealer_location' => $dealer['location'],

            'price_category' => $this->faker->randomElement($priceCategory),

            'car_status' => $this->faker->randomElement(['available', 'sold']),
            'bid_status' => $this->faker->randomElement(['open', 'close']),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use App\Models\Brand;
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
        $dealers = [
            ['name' => 'The Autobarn Volkswagen of Countryside', 'location' => 'Raleigh, NC'],
            ['name' => 'Luxury Auto Mart', 'location' => 'Charlotte, NC'],
            ['name' => 'Dream Cars Dealer', 'location' => 'Austin, TX'],
        ];

        // Select a random brand
        $brand = Brand::inRandomOrder()->first() ?? Brand::factory()->create();

        // Select a random model based on the brand
        $models = $carsByBrand[$brand->name] ?? ['Generic Model'];

        // Select a random dealer
        $dealer = $this->faker->randomElement($dealers);

        return [
            'user_id' => User::factory(),
            'brand_id' => $brand->id,
            'model' => $this->faker->randomElement($models),
            'registration_year' => $this->faker->numberBetween(2000, date('Y')),
            'price' => $this->faker->numberBetween(5000, 50000),
            'mileage' => $this->faker->numberBetween(5000, 150000),
            'dealer_name' => $dealer['name'],
            'dealer_location' => $dealer['location'],
            'price_category' => $this->faker->randomElement($priceCategory),
            'image' => $this->faker->imageUrl(640, 480, 'cars', true),
            'status' => $this->faker->randomElement(['open', 'close']),
        ];
    }
}

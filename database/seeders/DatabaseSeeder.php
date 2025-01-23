<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Car;
use App\Models\Bid;
use App\Models\Brand;
use App\Models\Profile;
use App\Models\Appointment;
use App\Models\Fuel;
use App\Models\Transaction;
use Faker\Factory as Faker;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create predefined brands
        Brand::factory()->count(4)->sequence(
            ['name' => 'Toyota'],
            ['name' => 'Honda'],
            ['name' => 'Ford'],
            ['name' => 'Audi']
        )->create();

        Fuel::factory()->count(4)->sequence(
            ['name' => 'Gasoline (Petrol)'],
            ['name' => 'Diesel'],
            ['name' => 'Electric'],
            ['name' => 'Hybrid'],
            ['name' => 'Hydrogen']
        )->create();

        // Create an admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        // Create 20 users and their data
        $users = User::factory(20)->create();
        // Create profile for all users
        $users->each(function ($user) {
            Profile::factory()->create(['user_id' => $user->id]);
        });

        // random get the 3 users who will upload car
        $randomUsers = User::inRandomOrder()->limit(3)->get();

        $randomUsers->each(function (
            $user,
            $index
        ) {
            // Define one car for each user
            $customCar = [
                [
                    'brand_id' => Brand::where('name', 'Toyota')->first()->id,
                    'model' => 'Corolla',
                    'fuel_id' => Fuel::where('name', 'Diesel')->first()->id,
                    'registration_year' => 2018,
                    'price' => 15000.00,
                    'mileage' => 40000,
                    'dealer_name' => 'John\'s Autos',
                    'dealer_location' => 'Los Angeles, CA',
                    'price_category' => 'Good Deal',
                    'image' => 'cars_images/001.png',
                    'status' => 'open',
                    'user_id' => $user->id,
                ],
                [
                    'brand_id' => Brand::where('name', 'Honda')->first()->id,
                    'model' => 'Civic',
                    'fuel_id' => Fuel::where('name', 'Gasoline (Petrol)')->first()->id,
                    'registration_year' => 2020,
                    'price' => 20000.00,
                    'mileage' => 25000,
                    'dealer_name' => 'Elite Cars',
                    'dealer_location' => 'New York, NY',
                    'price_category' => 'Fair Deal',
                    'image' => 'cars_images/002.png',
                    'status' => 'open',
                    'user_id' => $user->id,
                ],
                [
                    'brand_id' => Brand::where('name', 'Ford')->first()->id,
                    'model' => 'Focus',
                    'fuel_id' => Fuel::where('name', 'Hybrid')->first()->id,
                    'registration_year' => 2019,
                    'price' => 18000.00,
                    'mileage' => 30000,
                    'dealer_name' => 'City Motors',
                    'dealer_location' => 'Chicago, IL',
                    'price_category' => 'Fair Deal',
                    'image' => 'cars_images/003.png',
                    'status' => 'open',
                    'user_id' => $user->id,
                ]
            ];
            $faker = Faker::create();

            // Assign one car per user based on their index
            $carData = $customCar[$index];
            $car = Car::create($carData);

            // Create an appointment for the car
            $appointment = Appointment::factory()->create([
                'car_id' => $car->id,
                'user_id' => $user->id,
                'appointment_date' => $faker->dateTimeBetween('now', '+1 month'),
                'status' => $faker->randomElement(['pending', 'approved', 'denied']),
            ]);

            // If the appointment is approved, create bids
            if ($appointment->status === 'approved') {
                // Get 3 distinct users who are not the owner of the car
                $bidUsers = User::where('id', '!=', $car->user_id)
                ->inRandomOrder()
                ->limit(3)
                ->get();
                // return the data
                $bids = $bidUsers->map(function ($user) use ($car, $faker) {
                        $bidTimestamp = $faker->dateTimeBetween($car->created_at, 'now');
                        return Bid::factory()->create([
                        'car_id' => $car->id,
                        'user_id' => $user->id,
                        'created_at' => $bidTimestamp,
                        'updated_at' => $bidTimestamp,
                    ]);
                });
                // Determine the highest bid
                $highestBid = $bids->sortByDesc('bid_price')->first();
                // Create a transaction for the car with the highest bid
                if ($highestBid) {
                    Transaction::factory()->create([
                        'car_id' => $car->id,
                        'buyer_id' => $highestBid->user_id,
                        'final_price' => $highestBid->bid_price,
                        'transaction_date' => $faker->dateTimeBetween($car->created_at, 'now'),
                    ]);
                }
            }
        });
    }
}

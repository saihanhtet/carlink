<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Car;
use App\Models\Bid;
use App\Models\Brand;
use App\Models\Profile;
use App\Models\Appointment;
use App\Models\Engine;
use App\Models\Fuel;
use App\Models\Transaction;
use Faker\Factory as Faker;
use Carbon\Carbon;

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

        Fuel::factory()->count(5)->sequence(
            ['name' => 'Petrol'],
            ['name' => 'Diesel'],
            ['name' => 'Electric'],
            ['name' => 'Hybrid'],
            ['name' => 'Hydrogen']
        )->create();

        Engine::factory()->count(5)->sequence(
            ['name' => '1.8L'],
            ['name' => '2.0L Turbo'],
            ['name' => 'Electric'],
            ['name' => '5.0L V8'],
            ['name' => '3.0L Turbo']
        )->create();

        // Create an admin user
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);
        Profile::factory()->create(['user_id' => $user->id]);

        // Create 20 users and their profiles
        $users = User::factory(20)->create();
        $users->each(fn($user) => Profile::factory()->create(['user_id' => $user->id]));

        // Randomly select 3 users to upload cars
        $randomUsers = User::inRandomOrder()->limit(3)->get();
        $previousUserId = null;

        $randomUsers->each(function (
            $user,
            $index
        ) use (&$previousUserId) {
            $faker = Faker::create();
            $carDetails = $this->getCarDetails($user, $index);
            $car = Car::create($carDetails);

            // Assign timestamps for the car
            $previousMonthDate = Carbon::now()
                ->subMonth()
                ->startOfMonth()
                ->setTime(12, 0, 0) // Set to noon
                ->format('Y-m-d H:i:s');

            $previousDayDate = Carbon::now()
                ->subDays(10)
                ->startOfMonth()
                ->setTime(12, 0, 0) // Set to noon
                ->format('Y-m-d H:i:s');

            $appointmentDate = null;
            if ($index === 0) {
                $car->update(['created_at' => $previousMonthDate, 'updated_at' => $previousMonthDate]);
                $endDate = Carbon::parse($car->created_at)->copy()->addDays(7);
                $appointmentDate = $faker->dateTimeBetween($car->created_at, $endDate);
            } elseif ($index === 1) {
                $car->update(['user_id' => $previousUserId, 'created_at' => $previousDayDate, 'updated_at' => $previousDayDate]);
                $endDate = Carbon::parse($car->created_at)->copy()->addDays(7);
                $appointmentDate = $faker->dateTimeBetween($car->created_at, $endDate);
            } else {
                $appointmentDate = $faker->dateTimeBetween('now', '+7 day');
            }

            $appointment = Appointment::factory()->create([
                'car_id' => $car->id,
                'user_id' => $car->user_id,
                'appointment_date' => $appointmentDate,
                'status' => 'approved',
            ]);

            if ($index === 0) {
                $appointment->update(['created_at' => $previousMonthDate, 'updated_at' => $previousMonthDate]);
            }

            if ($index === 1) {
                $appointment->update(['created_at' => $previousDayDate, 'updated_at' => $previousDayDate]);
            }

            $previousUserId = $user->id;

            if ($appointment->status === 'approved') {
                $this->handleBids($car, $faker, $appointmentDate);
                $bids = Bid::where('car_id', $car->id)->get();
                if ($car->id == 1) {
                    $this->handleTransactions($car, $faker, $bids);
                }
            }
        });

        if (isset($randomUsers[0])) {
            echo $randomUsers[0]->email;
        }
    }

    /**
     * Get car details based on the user and index.
     */
    private function getCarDetails($user, $index): array
    {
        $carOptions = [
            [
                'brand_id' => Brand::where('name', 'Toyota')->first()->id,
                'fuel_id' => Fuel::where('name', 'Petrol')->first()->id,
                'engine_id' => Engine::where('name', '1.8L')->first()->id,

                'model' => 'Corolla Altis',
                'registration_year' => 2021,
                'price' => 15000.00,
                'mileage' => 30000,
                'image' => 'cars_images/001.png',
                'transmission' => 'Automatic',
                'seats' => 5,
                'description' => 'Reliable sedan with excellent fuel economy.',
                'dealer_name' => 'John\'s Autos',
                'dealer_location' => 'Los Angeles, CA',

                'price_category' => 'Good Deal',
                'user_id' => $user->id,
            ],
            [
                'brand_id' => Brand::where('name', 'Honda')->first()->id,
                'fuel_id' => Fuel::where('name', 'Petrol')->first()->id,
                'engine_id' => Engine::where('name', '2.0L Turbo')->first()->id,

                'model' => 'Civic Type R',
                'registration_year' => 2022,
                'price' => 38000.00,
                'mileage' => 12000,
                'image' => 'cars_images/002.png',
                'transmission' => 'Manual',
                'seats' => 5,
                'description' => 'Sporty hatchback with cutting-edge design.',
                'dealer_name' => 'John\'s Autos',
                'dealer_location' => 'Los Angeles, CA',

                'price_category' => 'Good Deal',
                'user_id' => $user->id,
            ],
            [
                'brand_id' => Brand::where('name', 'Ford')->first()->id,
                'fuel_id' => Fuel::where('name', 'Petrol')->first()->id,
                'engine_id' => Engine::where('name', '2.0L Turbo')->first()->id,

                'model' => 'Mustang GT',
                'registration_year' => 2020,
                'price' => 45000.00,
                'mileage' => 25000,
                'image' => 'cars_images/003.png',
                'transmission' => 'Manual',
                'seats' => 4,
                'description' => 'Sporty hatchback with cutting-edge design.',

                'dealer_name' => 'City Motors',
                'dealer_location' => 'Chicago, IL',

                'price_category' => 'Fair Deal',
                'user_id' => $user->id,
            ],
        ];

        return $carOptions[$index];
    }

    /**
     * Handle bids for a car.
     */
    private function handleBids($car, $faker, $appointmentDate): void
    {
        // Ensure bids are after the appointment date
        $bidders = User::where('id', '!=', $car->user_id)->inRandomOrder()->limit(3)->get();

        $bidders->map(function ($bidder) use ($car, $faker, $appointmentDate) {
            $endDate = Carbon::parse($appointmentDate)->copy()->addDays(7);
            $bidTimestamp = $faker->dateTimeBetween($appointmentDate, $endDate)->format('Y-m-d H:i:s');
            // Get the last bid amount or fallback to the car's original price
            $lastBid = Bid::where('car_id', $car->id)->latest()->first();
            $baseBidAmount = $lastBid ? $lastBid->bid_price : $car->price;
            // Add a random increment (e.g., between $10 and $100)
            $randomIncrement = rand(10, 100);
            $bidAmount = $baseBidAmount + $randomIncrement;

            return Bid::factory()->create([
                'car_id' => $car->id,
                'user_id' => $bidder->id,
                'bid_price' => $bidAmount,
                'created_at' => $bidTimestamp,
                'updated_at' => $bidTimestamp,
            ]);
        });
    }

    /**
     * Handle transactions based on the highest bid.
     */
    private function handleTransactions($car, $faker, $bids): void
    {
        // Create a transaction based on the highest bid
        $highestBid = $bids->sortByDesc('bid_price')->first();
        $bidendDate = Carbon::parse($highestBid->created_at)->copy()->addDays(1);

        if ($highestBid) {
            Transaction::factory()->create([
                'car_id' => $car->id,
                'buyer_id' => $highestBid->user_id,
                'seller_id' => $car->user_id,
                'final_price' => $highestBid->bid_price,
                'transaction_date' => $faker->dateTimeBetween($highestBid->created_at, $bidendDate)->format('Y-m-d H:i:s'),
                'created_at' => $bidendDate,
                'updated_at' => $bidendDate,
            ]);
            $car->update([
                'car_status' => 'sold',
                'bid_status' => 'close',
            ]);
        }
    }


}

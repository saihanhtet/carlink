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


            $endDayDate = Carbon::parse($previousDayDate)->copy()->addDays(7);
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
                $this->handleBidsAndTransactions($car, $faker, $previousMonthDate, $previousDayDate);
            }
        });
    }

    /**
     * Get car details based on the user and index.
     */
    private function getCarDetails($user, $index): array
    {
        $carOptions = [
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
            ],
        ];

        return $carOptions[$index];
    }

    /**
     * Handle bids and transactions for a car.
     */
    private function handleBidsAndTransactions($car, $faker): void
    {
        // Get the appointment date for the car
        $appointment = Appointment::where('car_id', $car->id)->where('status', 'approved')->first();
        $appointmentDate = $appointment ? Carbon::parse($appointment->appointment_date) : null;

        if (!$appointmentDate) {
            // If no appointment is found, fallback to a default date (e.g., car's creation date)
            $appointmentDate = Carbon::parse($car->created_at);
        }
        // Ensure bids are after the appointment date
        $bidders = User::where('id', '!=', $car->user_id)->inRandomOrder()->limit(3)->get();

        $bids = $bidders->map(function ($bidder) use ($car, $faker, $appointmentDate) {
            $endDate = Carbon::parse($appointmentDate)->copy()->addDays(7);
            $bidTimestamp = $faker->dateTimeBetween($appointmentDate, $endDate)->format('Y-m-d H:i:s');
            return Bid::factory()->create([
                'car_id' => $car->id,
                'user_id' => $bidder->id,
                'created_at' => $bidTimestamp,
                'updated_at' => $bidTimestamp,
            ]);
        });

        // Create a transaction based on the highest bid
        $highestBid = $bids->sortByDesc('bid_price')->first();
        $bidendDate = Carbon::parse($highestBid->created_at)->copy()->addDays(1);
        if ($highestBid) {
            Transaction::factory()->create([
                'car_id' => $car->id,
                'buyer_id' => $highestBid->user_id,
                'final_price' => $highestBid->bid_price,
                'transaction_date' => $faker->dateTimeBetween($highestBid->created_at, $bidendDate)->format('Y-m-d H:i:s'),
                'created_at' => $bidendDate,
                'updated_at' => $bidendDate,
            ]);
        }
    }

}

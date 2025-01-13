<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Car;
use App\Models\Bid;
use App\Models\Brand;
use App\Models\Profile;
use App\Models\Transaction;

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

        // Create an admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), // Set your desired password
            'is_admin' => true, // Mark this user as an admin
        ]);

        // Create 20 users, and their profiles, cars, bids, appointments, and transactions
        $users = User::factory(20)->create();

        // Create profiles, cars, bids, appointments, and transactions for each user
        $users->each(function ($user) {
            // Create a profile for each user
            Profile::factory()->create(['user_id' => $user->id]);

            // Create cars for each user
            Car::factory(5)->create(['user_id' => $user->id])->each(function ($car) use ($user) {
                // Create appointments for each car
                $appointment = Appointment::factory()->create([
                    'car_id' => $car->id,
                    'user_id' => $user->id,
                ]);

                // Create bids for the car only if the appointment is approved
                if (
                    $appointment->status === 'approved'
                ) {
                    Bid::factory(3)->create([
                        'car_id' => $car->id,
                    ]);
                    // Create a transaction for the car with the highest bid
                    $bids = Bid::where(
                        'car_id',
                        $car->id
                    )->get();
                    $highestBid = $bids->sortByDesc('bid_price')->first();

                    if ($highestBid) {
                        Transaction::factory()->create([
                            'car_id' => $car->id,
                            'buyer_id' => $highestBid->user_id, // Buyer is the user who placed the highest bid
                            'final_price' => $highestBid->bid_price,
                        ]);
                    }
                }
            });
        });
    }
}

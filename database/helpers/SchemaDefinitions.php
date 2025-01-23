<?php

namespace Database\Helpers;

use Illuminate\Database\Schema\Blueprint;

class SchemaDefinitions
{
    public static function usersTable(Blueprint $table)
    {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->boolean('is_admin')->default(false);
        $table->timestamps();
    }

    public static function profilesTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('avatar')->nullable();
        $table->string('phone')->nullable();
        $table->text('address')->nullable();
        $table->date('birth_date')->nullable();
        $table->timestamps();
    }

    public static function brandsTable(Blueprint $table)
    {
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
    }

    public static function fuelsTable(Blueprint $table)
    {
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
    }

    public static function carsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('brand_id')->constrained('brands')->onDelete('cascade');
        $table->foreignId('fuel_id')->constrained('fuels')->onDelete('cascade');
        $table->string('model');
        $table->integer('registration_year');
        $table->decimal('price', 10, 2);
        $table->integer('mileage');
        $table->string('dealer_name')->nullable();
        $table->string('dealer_location')->nullable();
        $table->enum('price_category', ['Good Deal', 'Fair Deal', 'Overpriced', 'Underpriced'])->nullable();
        $table->string('image')->nullable();
        $table->enum('status', ['open', 'close'])->default('open');
        $table->timestamps();
    }

    public static function bidsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->decimal('bid_price', 10, 2);
        $table->timestamps();
    }

    public static function appointmentsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->date('appointment_date');
        $table->enum('status', ['pending', 'approved', 'denied'])->default('pending');
        $table->timestamps();
    }

    public static function transactionsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
        $table->decimal('final_price', 10, 2);
        $table->date('transaction_date');
        $table->timestamps();
    }
}

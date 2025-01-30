<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'brand_id',
        'fuel_id',
        'engine_id',
        'model',
        'registration_year',
        'price',
        'mileage',
        'image',
        'transmission',
        'seats',
        'description',
        'dealer_name',
        'dealer_location',
        'price_category',
        'car_status',
        'bid_status',
        'created_at',
        'updated_at'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function transaction()
    {
        return $this->hasOne(Transaction::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function fuel()
    {
        return $this->belongsTo(Fuel::class);
    }

    public function engine()
    {
        return $this->belongsTo(Engine::class);
    }

}

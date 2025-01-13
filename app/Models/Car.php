<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'user_id',
        'make',
        'model',
        'registration_year',
        'price',
        'mileage',
        'dealer_name',
        'dealer_location',
        'image',
        'status'
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

}

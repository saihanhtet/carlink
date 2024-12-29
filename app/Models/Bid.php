<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'user_id',
        'bid_price'
    ];

    public static function validationRules()
    {
        return [
            'car_id' => 'required|exists:cars,id',
            'user_id' => 'required|exists:users,id',
            'bidding_price' => 'required|numeric|min:1',
        ];
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}

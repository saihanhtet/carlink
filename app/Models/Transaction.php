<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'buyer_id',
        'final_price',
        'transaction_date'
    ];

    public static function validationRules()
    {
        return [
            'car_id' => 'required|exists:cars,id',
            'buyer_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'final_price' => 'required|numeric|min:1',
            'transaction_date' => 'required|date',
        ];
    }


    // Relationships
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}

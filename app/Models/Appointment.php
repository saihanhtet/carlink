<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'user_id',
        'appointment_date',
        'status'
    ];

    public static function validationRules()
    {
        return [
            'car_id' => 'required|exists:cars,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'status' => 'required|in:pending,approved,denied',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'make',
        'model',
        'registration_year',
        'price',
        'image_path',
        'is_active'
    ];

    public static function validationRules($isUpdate = false)
    {
        return [
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'registration_year' => 'required|integer|min:1900|max:' . date('Y'),
            'price' => 'required|numeric|min:0',
            'image_path' => $isUpdate ? 'nullable|string|max:255' : 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:active,inactive', // For "Activate/Deactivate" status
        ];
    }

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
}

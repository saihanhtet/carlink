<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin'
    ];

    public static function validationRules($isUpdate = false, $id = null)
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email' . ($isUpdate ? ',' . $id : ''),
            'password' => $isUpdate ? 'nullable|string|min:8|confirmed' : 'required|string|min:8|confirmed',
        ];
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationships
    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'buyer_id');
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
}

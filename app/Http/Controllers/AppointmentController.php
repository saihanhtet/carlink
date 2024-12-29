<?php

namespace App\Http\Controllers;

use App\Models\Appointment;

class AppointmentController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new Appointment());
    }
}
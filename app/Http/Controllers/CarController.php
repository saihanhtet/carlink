<?php

namespace App\Http\Controllers;

use App\Models\Car;

class CarController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new Car());
    }
}

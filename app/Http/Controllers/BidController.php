<?php

namespace App\Http\Controllers;

use App\Models\Bid;

class BidController extends BaseController
{
    public function __construct()
    {
        parent::__construct(new Bid());
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PrivatePageController extends Controller
{

    public function dashboard()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $dashboardData = $this->getDashboardData($role);

        return Inertia::render('Private/Dashboard/page', $dashboardData);
    }

    public function sales()
    {
        $user = Auth::user();
        $role = $user->is_admin ? 'admin' : 'user';
        $dashboardData = $this->getDashboardData($role);

        return Inertia::render('Private/Dashboard/sales', $dashboardData);
    }



    /**
     * Get dashboard data based on role.
     *
     * @param string $role
     * @return array
     */
    private function getDashboardData(string $role): array
    {
        if ($role === 'admin') {
            return [
                'user' => false,
                'admin' => true,
                'role' => 'admin',
            ];
        }

        return [
            'user' => true,
            'admin' => false,
            'role' => 'user',
        ];
    }
}

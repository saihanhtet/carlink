import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CarForm from '@/Pages/Private/Partials/AddEditCarForm';
import { usePage } from '@inertiajs/react';
import React from 'react'

const SellMyCarDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Sell your car", link: route("car-upload-dashboard") },
    ];

    const { brands, fuels, engines, cars, user } = usePage().props;

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <CarForm brands={brands} fuels={fuels} engines={engines} otherCars={cars} user={user} />
        </AuthenticatedLayout>
    )
}

export default SellMyCarDashboard

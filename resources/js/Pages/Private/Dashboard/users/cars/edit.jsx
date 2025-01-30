import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CarForm from '@/Pages/Private/Partials/AddEditCarForm';
import { usePage } from '@inertiajs/react';
import React from 'react'

const EditMyCarDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Edit car", link: null },
    ];


    const { brands, fuels, cars, user, currentCar, engines } = usePage().props;

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <CarForm brands={brands} fuels={fuels} otherCars={cars} user={user} car={currentCar} engines={engines} />
        </AuthenticatedLayout>
    )
}

export default EditMyCarDashboard

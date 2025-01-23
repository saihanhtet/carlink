import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'

const MyCarListDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>MyCarList</AuthenticatedLayout>
    )
}

export default MyCarListDashboard

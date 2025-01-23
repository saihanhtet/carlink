import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'

const MyCarStatusDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Car Status", link: route("car-status-dashboard") },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>CarStatus</AuthenticatedLayout>
    )
}

export default MyCarStatusDashboard

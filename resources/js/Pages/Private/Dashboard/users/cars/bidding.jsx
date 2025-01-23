import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react'

const MyCarBiddingDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Bidding Dashboard", link: route("bidding-history-dashboard") },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>MyCarBiddingDashboard</AuthenticatedLayout>
    )
}

export default MyCarBiddingDashboard

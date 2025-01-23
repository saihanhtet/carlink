import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react'

const Analytics = () => {
    const breadcrumbs = [
        { name: 'Dashboard', link: route('dashboard') },
        { name: 'Car Sales', link: route('car-sales-dashboard') },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Sales" />
            <div className="">
                Car Sales
            </div>
        </AuthenticatedLayout>
    );
}

export default Analytics

import ReUsableTable from '@/components/reusabletable';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react'

const Analytics = () => {
    const breadcrumbs = [
        { name: 'Dashboard', link: route('dashboard') },
        { name: 'Car Sales Transactions', link: route('car-sales-dashboard') },
    ];
    const { transactions } = usePage().props;

    const tableHeaders = [
        { title: "Txn ID", className: "w-[100px]" },
        { title: "Car ID", className: "w-[100px]" },
        { title: "Car Model" },
        { title: "Fuel", className: "w-[200px]" },
        { title: "Buyer", className: "w-[200px]" },
        { title: "Txn Date" },
        { title: "Final Price", className: "text-right" },
        { title: "Actions", className: "w-[150px] text-center" }
    ];

    const tableData = transactions?.map((car) => {
        return [
            { content: car.transaction_id, className: "font-medium" },
            { content: car.id, className: "font-medium" },
            { content: car.model, className: "font-medium" },
            { content: car.fuel.name, className: "font-medium" },
            { content: car.transaction.buyer.name, className: "font-medium" },
            { content: car.transaction_date },
            { content: `$${car.final_price}`, className: "text-right" },
            {
                content: (
                    <div className="flex justify-center gap-2">
                        {/* <Button
                            className="bg-blue-500 text-white px-2 py-1 rounded w-[60px]"
                            onClick={() => handleEdit(car.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="bg-red-500 text-white px-2 py-1 rounded w-[60px]"
                            onClick={() => handleDelete(car.id)}
                        >
                            Delete
                        </Button> */}
                        <Button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded w-[60px]"
                            onClick={() => handleView(car.id)}
                        >
                            View
                        </Button>
                    </div>
                ),
                className: "text-center",
            },
        ];
    });

    const handleView = (id) => {
        console.log(`View car with ID: ${id}`);
    };

    const filterDataFunc = (data) => {
        console.log(data);
    }

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Sales" />
            <div className="">
                <ReUsableTable tableHeaders={tableHeaders} tableData={tableData} filterFunc={filterDataFunc} />
            </div>
        </AuthenticatedLayout>
    );
}

export default Analytics

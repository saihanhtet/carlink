import ReUsableTable from '@/components/reusabletable';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Analytics = () => {
    const breadcrumbs = [
        { name: 'Dashboard', link: route('dashboard') },
        { name: 'Car Sales Transactions', link: route('car-sales-dashboard') },
    ];
    const { transactions } = usePage().props;
    const { data, links } = transactions;

    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const transformData = (data) =>
        data.map((car) => [
            { content: car.transaction?.id ?? 'N/A', className: 'font-medium' },
            { content: car.id ?? 'N/A' },
            { content: car.model ?? 'N/A' },
            { content: car.fuel?.name ?? 'N/A' },
            { content: car.transaction?.buyer?.name ?? 'N/A' },
            { content: car.transaction?.transaction_date ?? 'N/A' },
            {
                content: car.transaction?.final_price
                    ? `$${car.transaction.final_price.toLocaleString()}`
                    : 'N/A',
                className: 'text-right'
            },
            {
                content: (
                    <div className="flex justify-center gap-2">
                        <Button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded w-[60px]"
                            onClick={() => handleView(car)}
                        >
                            View
                        </Button>
                    </div>
                ),
                className: 'text-center',
            },
        ]);


    const tableHeaders = [
        { title: 'Txn ID', className: 'w-[100px]' },
        { title: 'Car ID', className: 'w-[100px]' },
        { title: 'Car Model' },
        { title: 'Fuel', className: 'w-[200px]' },
        { title: 'Buyer', className: 'w-[200px]' },
        { title: 'Txn Date' },
        { title: 'Final Price', className: 'text-right' },
        { title: 'Actions', className: 'w-[150px] text-center' },
    ];

    React.useEffect(() => {
        setFilteredData(transformData(data));
    }, [data]);

    const handleView = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleSearch = (query) => {
        const results = data.filter((car) =>
            car.model.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(transformData(results));
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        let sortedData = [...data];
        // Sorting logic
        switch (filter) {
            case 'price_asc':
                sortedData.sort((a, b) => a.transaction.final_price - b.transaction.final_price);
                break;
            case 'price_desc':
                sortedData.sort((a, b) => b.transaction.final_price - a.transaction.final_price);
                break;
            case 'date_asc':
                sortedData.sort(
                    (a, b) =>
                        new Date(a.transaction.transaction_date) -
                        new Date(b.transaction.transaction_date)
                );
                break;
            case 'date_desc':
                sortedData.sort(
                    (a, b) =>
                        new Date(b.transaction.transaction_date) -
                        new Date(a.transaction.transaction_date)
                );
                break;
            default:
                break;
        }

        setFilteredData(transformData(sortedData));
    };


    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Sales" />
            <div>
                <ReUsableTable
                    caption="Transactions List"
                    className={'max-h-[650px] h-auto'}
                    tableHeaders={tableHeaders}
                    tableData={filteredData}
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    selectedFilter={selectedFilter}
                    filters={[
                        { value: 'price_asc', label: 'Price: Low to High' },
                        { value: 'price_desc', label: 'Price: High to Low' },
                        { value: 'date_asc', label: 'Date: Oldest First' },
                        { value: 'date_desc', label: 'Date: Newest First' },
                    ]}
                />
            </div>
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex flex-wrap gap-2">
                        {links.map((link, index) => {
                            if (index === 0) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            } else if (index === links.length - 1) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationNext href={link.url} />
                                    </PaginationItem>
                                );
                            } else {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink href={link.url} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            }
                        })}
                    </PaginationContent>
                </Pagination>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">Car Details</h2>
                            {selectedCar && (
                                <div>
                                    <p><strong>Model:</strong> {selectedCar.model}</p>
                                    <p><strong>Fuel Type:</strong> {selectedCar.fuel?.name ?? 'N/A'}</p>
                                    <p><strong>Buyer:</strong> {selectedCar.transaction?.buyer?.name ?? 'N/A'}</p>
                                    <p><strong>Transaction Date:</strong> {selectedCar.transaction?.transaction_date ?? 'N/A'}</p>
                                    <p><strong>Final Price:</strong> {selectedCar.transaction?.final_price ? `$${selectedCar.transaction.final_price.toLocaleString()}` : 'N/A'}</p>
                                </div>
                            )}
                            <div className="mt-4 flex justify-end">
                                <Button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Close</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </AuthenticatedLayout>
    );
};

export default Analytics;

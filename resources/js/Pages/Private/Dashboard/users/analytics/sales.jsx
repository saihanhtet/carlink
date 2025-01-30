import ReUsableTable from '@/components/reusabletable';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const Analytics = () => {
    const breadcrumbs = [
        { name: 'Dashboard', link: route('dashboard') },
        { name: 'Car Sales Transactions', link: route('car-sales-dashboard') },
    ];
    const { transactions } = usePage().props;
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
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
                            onClick={() => handleView(car.id)}
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
        setFilteredData(transformData(transactions.data));
    }, [transactions.data]);

    const handleView = (id) => {
        console.log(`View car with ID: ${id}`);
    };

    console.log(transactions.data)

    const handleSearch = (query) => {
        const results = transactions.data.filter((car) =>
            car.model.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(transformData(results));
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);

        let sortedData = [...transactions.data];

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

    console.log(filteredData)

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
        </AuthenticatedLayout>
    );
};

export default Analytics;

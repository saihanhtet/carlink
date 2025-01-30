import ReUsableTable from '@/components/reusabletable';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const MyCarBiddingDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Bidding Dashboard", link: route("bidding-history-dashboard") },
    ];
    const { allBids } = usePage().props;

    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [isTransactionDialogOpen, setTransactionDialogOpen] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [selectedCarModel, setSelectedCarModel] = useState('');
    const [selectedBidUser, setSelectedBidUser] = useState('');
    const [selectedBidPrice, setSelectedBidPrice] = useState('');
    const formattedTransactionDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const { data, setData, post, processing } =
        useForm({
            buyer_id: '',
            buyer_id: '',
            car_id: '',
            final_price: '',
            transaction_date: formattedTransactionDate,
        });


    const openTransactionDialog = (carId, bidUserId, sellUserId, carModel, bidUser, bidPrice) => {
        setSelectedCarId(carId);
        setSelectedCarModel(carModel);
        setSelectedBidUser(bidUser);
        setSelectedBidPrice(bidPrice);

        // Update form data with the selected values
        setData({
            ...data,
            buyer_id: bidUserId,
            seller_id: sellUserId,
            car_id: carId,
            final_price: bidPrice,
        });

        setTransactionDialogOpen(true);
    };

    const closeTransactionDialog = () => {
        setTransactionDialogOpen(false);
        setSelectedCarId(null);
        setSelectedCarModel('');
        setSelectedBidUser('');
        setSelectedBidPrice('');
    };

    const confirmTransaction = () => {
        handleSubmitTransaction();
    };

    const handleSubmitTransaction = () => {
        post('/transactions', {
            onSuccess: () => {
                alert('Transaction Successful!');
                closeTransactionDialog();
            },
            onError: (error) => {
                console.error('Error creating transaction:', error);
            },
        });
    };

    const transformData = (data) => {
        return data.map((bid) => {
            const highestBidForCar = Math.max(...data.filter(b => b.car_id === bid.car_id).map(b => b.bid_price));
            const bidPercentage = highestBidForCar > bid.car.price
                ? Math.round((((bid.bid_price - bid.car.price) / (highestBidForCar - bid.car.price)) * 99 + 1))
                : 1;
            return [
                { content: bid.id, className: "font-medium w-[50px]" },
                { content: bid.car_id, className: "font-medium w-[50px]" },
                { content: bid.car.model, className: "font-medium w-[150px]" },
                { content: bid.user.name, className: "font-medium" },
                {
                    content: new Date(bid.created_at).toISOString().split("T")[0],
                    className: "font-medium w-[150px]"
                },
                { content: `$${bid.car.price.toLocaleString()}` },
                { content: `$${bid.bid_price.toLocaleString()}` },
                {
                    content: `${bidPercentage}%`,
                    className: "font-medium text-center w-[100px]"
                },
                {
                    content: (
                        <div className="flex justify-center gap-2">
                            {bid.car.bid_status === 'open' ? (
                                <Button
                                    className="px-2 py-1 rounded w-auto"
                                    onClick={() => openTransactionDialog(bid.car.id, bid.car.user_id, bid.user_id, bid.car.model, bid.user.name, bid.bid_price)}
                                >
                                    Make Transaction
                                </Button>
                            ) : (
                                <span className="text-red-600 font-semibold">Bidding Closed</span>
                            )}
                        </div>
                    ),
                    className: "text-center",
                },
            ];
        });
    };

    const tableHeaders = [
        { title: "Bid ID", className: "w-[100px]" },
        { title: "Car ID", className: "w-[100px]" },
        { title: "Car Model" },
        { title: "Buyer", className: "w-[200px]" },
        { title: "Bid Date", className: "text-center" },
        { title: "Original Price", className: "text-center" },
        { title: "Amount Price", className: "text-center" },
        { title: "Profit Percentage", className: "text-center" },
        { title: "Actions", className: "w-[150px] text-center" }
    ];

    const handleSearch = (query) => {
        const results = allBids.data.filter((bid) =>
            bid.car.model.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(transformData(results));
    };

    const handleFilter = (filter) => {
        setSelectedFilter(filter);
        let sortedData = [...allBids.data];
        switch (filter) {
            case 'price_asc':
                sortedData.sort((a, b) => a.bid_price - b.bid_price);
                break;
            case 'price_desc':
                sortedData.sort((a, b) => b.bid_price - a.bid_price);
                break;
            case 'date_asc':
                sortedData.sort(
                    (a, b) =>
                        new Date(a.created_at) -
                        new Date(b.created_at)
                );
                break;
            case 'date_desc':
                sortedData.sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                );
                break;
            default:
                break;
        }

        setFilteredData(transformData(sortedData));
    };

    React.useEffect(() => {
        setFilteredData(transformData(allBids.data));
    }, [allBids.data]);

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="My Car Bidding" />
            <div>
                <ReUsableTable
                    caption="My Car Bidding List"
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

                {/* Confirmation Dialog */}
                {isTransactionDialogOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-lg font-bold">Confirm Transaction</h3>
                            <p className="mt-2 text-md text-gray-600">
                                Are you sure you want to proceed with the transaction for the car model: <strong>{selectedCarModel}</strong><br />Bidded by <strong>{selectedBidUser}</strong><br />With a bid price of <strong>${selectedBidPrice.toLocaleString()}</strong>?
                            </p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="secondary" onClick={closeTransactionDialog}>
                                    Cancel
                                </Button>
                                <Button variant="default" onClick={confirmTransaction} disabled={processing}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}

export default MyCarBiddingDashboard;

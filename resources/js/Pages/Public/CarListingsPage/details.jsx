import React, { useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Flag, Goal, MoveLeft, Pencil } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import TextInput from '@/components/TextInput';
import { handleFormSubmit } from '@/lib/utils';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';

const PlaceBidButton = ({ dialogOpen, setDialogOpen, data, car, setData, errors, handleSubmit }) => {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="md:max-w-[250px] w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase">
                    Place a Bid
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Place a Bid for {car.model}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <InputLabel htmlFor="bid_price" value="Bidding amount" />
                    <TextInput
                        id="bid_price"
                        type="number"
                        value={data.bid_price}
                        onChange={(e) => setData('bid_price', e.target.value)}
                        placeholder="Enter your Bidding amount"
                        className="focus:ring-0"
                    />
                    <InputError message={errors.bid_price} />
                    <Button
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSubmit}
                    >
                        Place Bid
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CarDetailsPage = ({ canLogin, canRegister, isLoggedIn }) => {
    const { car, currentBid, highestBid, lastBid, user, bidable, isOwner } = usePage().props;
    const [alert, setAlert] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        errors,
        reset,
        clearErrors,
    } = useForm({
        car_id: car?.id || '',
        bid_price: '',
    });

    const handleSubmit = () => {
        handleFormSubmit({
            data,
            model: 'bid',
            actions: { post },
            reset,
            clearErrors,
            setAlert: (newAlert) => {
                setAlert(newAlert);
                setTimeout(() => setAlert(null), 5000);
            },
            onSuccess: () => {
                setDialogOpen(false); // Close the dialog
            },
        });
    };

    const handleBidOpen = (car_id) => {
        put(route('bid.update'), {
            data: { id: car_id, action: 'open' },
            preserveScroll: false,
            onSuccess: (response) => {
                setAlert({
                    type: "success",
                    message: 'Car status updated successfully',
                });
                if (onSuccess) onSuccess(response);
            },
            onError: (errors) => {
                setAlert({
                    type: "destructive",
                    message: "Failed to update the car status. Please try again.",
                });
                if (onError) onError(errors);
            },
        });
    }

    const handleBidClose = (car_id) => {
        put(route('bid.update'), {
            data: { id: car_id, action: 'close' },
            preserveScroll: false,
            onSuccess: (response) => {
                setAlert({
                    type: "success",
                    message: 'Car status updated successfully',
                });
                if (onSuccess) onSuccess(response);
            },
            onError: (errors) => {
                setAlert({
                    type: "destructive",
                    message: "Failed to update the car status. Please try again.",
                });
                if (onError) onError(errors);
            },
        });
    }

    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            {alert && (
                <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            )}
            <div className="container mx-auto p-4">
                {/* Back Button */}
                <Button variant="link" className="mb-3" onClick={() => router.visit(route('car-listing-page'))}>
                    <MoveLeft /> Go Back
                </Button>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Car Photo */}
                    <div className="bg-white p-4 flex justify-center items-center rounded-md shadow-md">
                        <img
                            src={car.image}
                            alt={car.model}
                            className="max-w-full h-auto object-cover rounded-md"
                        />
                    </div>

                    {/* Right Column: Car Information */}
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <div className="flex flex-wrap gap-5 justify-between items-center rubik mb-4">
                            <h1 className="text-2xl font-bold">{car.model || ''}</h1>
                            <h1 className="text-2xl font-bold">${highestBid || car.price}</h1>
                        </div>
                        <p className="text-gray-600">
                            <span className="font-semibold">Brand:</span>{' '}
                            <span className='font-bold'>{car.brand.name || ''}</span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Fuel Type:</span>{' '}
                            <span className='font-bold'>{car.fuel.name || ''}</span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Original Price:</span>{' '}
                            <span className='font-bold'>${car.price || ''}</span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Bidding Status:</span>{' '}
                            <span className='font-bold capitalize'>{car.bid_status || 'closed'}</span>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">InStock Status:</span>{' '}
                            <span className='font-bold capitalize'>{car.car_status || ''}</span>
                        </p>
                        <Separator className="my-5" />
                        {!user && (<div className="flex flex-wrap w-full justify-center items-center">
                            <Button
                                className="w-full font-semibold text-white capitalize bg-blue-500 hover:bg-blue-600"
                                onClick={() => router.visit(route('login'))}
                            >
                                Please log in first!
                            </Button>
                        </div>)}
                        {bidable && (<div className="flex flex-wrap  w-full justify-center gap-3">
                            {/* Bid Button */}
                            <PlaceBidButton
                                dialogOpen={dialogOpen}
                                setDialogOpen={setDialogOpen}
                                data={data}
                                car={car}
                                setData={setData}
                                errors={errors}
                                handleSubmit={handleSubmit}
                            />
                        </div>)}
                        {!bidable && user && !isOwner ? (
                            <div className="text-red-600 font-semibold text-center">You cannot bid this car anymore.</div>
                        ) : null}
                        {isOwner && (
                            <div className="flex flex-wrap justify-start items-center w-full gap-3">
                                {car.bid_status === 'open' ? (
                                    <Button
                                        className='bg-red-600 hover:bg-red-700 text-white w-auto'
                                        onClick={() => router.visit(route('bidding-history-dashboard'))}
                                    >
                                        <Flag /> Make Transaction Bidding</Button>
                                ) : null}
                                <Button className='bg-gray-500 hover:bg-gray-600 text-white w-auto'
                                    onClick={() => router.visit(route('car-edit-dashboard', { car: car.id }))}>
                                    <Pencil />
                                    Edit
                                </Button>
                            </div>
                        )}
                        <Separator className="my-5" />
                        <div>
                            <h2 className="text-xl font-bold mb-4">Bid Information</h2>
                            {/* Bidding Details */}
                            <p className="text-gray-600">
                                <span className="font-semibold">Highest Bid:</span>{' '}
                                <span className='font-bold'>${highestBid || 'No bids yet'}</span>
                            </p>
                            {lastBid && (
                                <>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Last Bidder:</span>{' '}
                                        <span className='font-bold'>{lastBid.user.name || 'N/A'}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Last Bid Time:</span>{' '}
                                        <span className='font-bold'>{new Date(lastBid.created_at).toLocaleString() || 'N/A'}</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Full Width Section: Car and User Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-gray-50 mt-8 p-6 rounded-md shadow-md">
                        <h2 className="text-xl font-bold rubik">Additional Details</h2>
                        <p className="font-normal poppins">{car.description}</p>
                    <Separator className="my-5" />
                    {/* Car Details */}
                    <div className="mb-4">
                            <h2 className="text-xl font-bold rubik">Car Specifications</h2>
                        <p className="text-gray-600">
                            <span className="font-semibold">Transmission:</span> {car.transmission || ''}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Seats:</span> {car.seats || ''}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Engine:</span> {car.engine.name || ''}
                        </p>
                    </div>
                    <Separator className='my-4' />
                    {/* User Information */}
                    <div>
                            <h2 className="text-xl font-bold rubik">Owner Information</h2>
                        <p className="text-gray-600">
                            <span className="font-semibold">Name:</span> {car.user.name || ''}
                        </p>
                        <p className="text-gray-600">
                                <span className="font-semibold">Contact:</span> {car.user.profile.phone || ''}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Email:</span> {car.user.email || ''}
                        </p>
                    </div>
                </div>
                    <div className="cols-pan-1 bg-gray-50 mt-8 rounded-md shadow-md p-6">
                        <h2 className="text-xl font-bold rubik">All Bids for {car.model}</h2>
                        <div className="overflow-y-auto my-4 max-h-[350px]">
                            {currentBid.length > 0 ? (
                                <ul className="space-y-2">
                                    {currentBid.map((bid) => (
                                        <li
                                            key={bid.id}
                                            className="flex flex-wrap justify-between items-center border p-2 rounded-md"
                                        >
                                            <div>
                                                <p className="font-semibold">{bid.user.name}</p>
                                                <p className="text-sm text-gray-500 font-semibold">
                                                    {new Date(bid.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-blue-600 rubik font-bold">${bid.bid_price}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="flex justify-between items-center border p-2 rounded-md text-gray-500">No bids available for this car.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout >
    );
};

export default CarDetailsPage;

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from "@inertiajs/react";
import { useState } from "react";


const CarCard = ({ car, showEditButton, handleEditFunc = null, handleDelFunc = null }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const confirmDelete = () => {
        handleDelFunc(car.id);
        closeDialog();
    };

    return (
        <div className="w-full h-full mx-auto shadow-md border border-gray-200 rounded-lg flex flex-col md:flex-row relative overflow-hidden">
            <div className="relative w-full h-full flex justify-center items-center max-w-[450px] max-h-[350px] bg-gray-100">
                <img
                    src={car.image}
                    alt={car.model}
                    className="w-10/12 h-full object-contain object-center"
                />
                <div
                    className={`absolute top-0 left-0 text-xs font-semibold px-2 py-1 capitalize ${car.bid_status === "open" ? "bg-yellow-300" : "bg-red-600 text-white"
                        }`}
                >
                    Bidding {car.bid_status}
                </div>
            </div>
            <div className="p-4 font-mono flex-1">
                <h2 className="text-xl font-bold rubik">
                    {car.model} - {car.brand ? car.brand.name : "No Brand Available"}
                </h2>
                <p className="text-sm text-muted-foreground font-semibold">
                    {car.mileage} mi
                </p>
                <p className="mt-2 text-lg font-semibold mb-2">${car.price}</p>
                {car.price_category !== 'Not Available' ? (
                    <span className="inline-block bg-green-300 text-xs font-semibold px-2 py-1 rounded">
                        {car.price_category}
                    </span>
                ) : null}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold">{car.dealer_location}</h3>
                    <p className="text-sm mt-2">{car.location}</p>
                    <Link
                        href={route('car-details-page', car.id)}
                        className="mt-4 block text-blue-700 text-sm font-semibold poppins"
                    >
                        View Details →
                    </Link>
                </div>
                {showEditButton && (
                    <div className="mt-4 flex space-x-2">
                        <Button variant="default" onClick={() => handleEditFunc(car.id)}>
                            Edit
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="font-semibold" variant='destructive'>
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Delete {car.model} Model</DialogTitle>
                                </DialogHeader>
                                <div className="mt-5 px-5 space-y-5">
                                    <p className="text-red-700 font-semibold text-center">Do you want to delete this car?</p>
                                    <div className="flex justify-end">
                                        <Button variant="destructive" onClick={openDialog}>
                                            Yes
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>

            {/* Confirmation Dialog */}

            {isDialogOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-lg font-bold">Confirm Delete</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="secondary" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarCard;

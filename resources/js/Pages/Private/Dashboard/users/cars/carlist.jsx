import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { handleFormSubmit } from "@/lib/utils";
import CarCard from "@/Pages/Public/CarListingsPage/CarCard";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

const MyCarListDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
    ];
    const { cars } = usePage().props;
    const { data, links } = cars;
    const [alert, setAlert] = useState(null);
    // Initialize the form hooks once outside
    const { delete: destroy, reset, clearErrors } = useForm();

    const handleEdit = (id) => {
        router.visit(route('car-edit-dashboard', { car: id }));
    };

    const handleDelete = (id) => {
        handleFormSubmit({
            data: { action: 'delete' },
            model: 'car',
            instance: { id },
            actions: { delete: destroy },
            setAlert: setAlert,
            reset,
            clearErrors,
            onSuccess: () => {
                console.log("Deleted successfully");
                setAlert({ type: "success", message: "Car deleted successfully!" });
            },
            onError: (err) => {
                console.error(err);
                setAlert({ type: "destructive", message: "Failed to delete the car." });
            },
        });
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="My Car Listing" />
            {/* Success or Error Message */}
            {alert && (
                <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            )}

            <div className="grid grid-cols-1 gap-6 p-4">
                <div className="flex justify-between items-center">
                    <p className="text-primary font-bold text-xl rubik capitalize">Your cars For Sale</p>
                    <Button onClick={() => router.visit(route('car-upload-dashboard'))}>Upload Car</Button>
                </div>
                {data.length > 0 ? (
                    data.map((car, index) => (
                        <CarCard
                            car={car}
                            key={index}
                            showEditButton={true}
                            handleEditFunc={handleEdit}
                            handleDelFunc={handleDelete}
                        />
                    ))
                ) : (
                    <p className="text-center p-3 border capitalize rounded-md bg-gray-200 text-lg">No cars available</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex flex-wrap gap-2">
                        {/* Page Numbers */}
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
            </div>
        </AuthenticatedLayout>
    );
};

export default MyCarListDashboard;

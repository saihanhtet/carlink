import ReUsableTable from "@/components/reusabletable";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { BadgePlus, Car, CircleOff, Edit, Signature, Trash } from "lucide-react";
import React, { useState } from "react";

const CarManagementDashboard = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "Car Management", link: route("car-management-dashboard") },
    ];

    const { cars } = usePage().props;
    const [filteredData, setFilteredData] = useState([]);
    const [alert, setAlert] = useState(null);

    const {
        data,
        setData,
        put,
        onSuccess,
        onError,
    } = useForm({
        id: '',
        car_id: '',
        status: '',
    });

    const updateCarStatus = () => {
        put(route('car.appointment.update'), {
            data,
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
    };

    const tableHeaders = [
        { title: "Car ID", className: "w-[100px]" },
        { title: "Model", className: "w-[150px]" },
        { title: "Year", className: "w-[100px]" },
        { title: "Status", className: "w-[150px] text-center" },
        { title: "Date", className: "w-[200px] text-center" },
        { title: "Price", className: "w-[50px] text-center" },
        { title: "Actions", className: "w-auto text-center" }
    ];

    const transformData = (data) => {
        return data.map((car) => {
            return [
                { content: car.id, className: "font-medium" },
                { content: car.model, className: "font-medium" },
                { content: car.registration_year, className: "font-medium text-center" },
                { content: car.appointment.status, className: "font-medium capitalize text-center" },
                { content: car.appointment.appointment_date, className: "font-medium capitalize text-center" },
                { content: `$${car.price}`, className: "font-medium text-center" },
                {
                    content: (
                        <div className="flex justify-center gap-2">
                            {car.appointment.status !== 'approved' ? (
                                <>
                                    <Button
                                        className="px-2 py-1 rounded w-auto"
                                        variant='destructive'
                                        onClick={async (e) => {
                                            setData('id', car.appointment.id);
                                            setData('car_id', car.id);
                                            setData('status', 'approved');
                                            await new Promise((resolve) => setTimeout(resolve, 0));
                                            updateCarStatus();
                                        }}
                                    >
                                        <Signature /> Approved
                                    </Button>
                                    <Button
                                        className="px-2 py-1 rounded  w-auto"
                                        variant='destructive'
                                        onClick={async (e) => {
                                            setData('id', car.id);
                                            setData('car_id', car.id);
                                            setData('status', 'denied');
                                            await new Promise((resolve) => setTimeout(resolve, 0));
                                            updateCarStatus();
                                        }}
                                    >
                                        <CircleOff /> Denied
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="px-2 py-1 rounded w-auto"
                                    variant='destructive'
                                    disabled
                                >
                                    <Signature /> Approved
                                </Button>
                            )}

                        </div>
                    ),
                    className: "text-center",
                },
            ]
        })
    }

    const handleSearch = (query) => {
        const results = cars.data.filter((car) =>
            car.model.toLowerCase().includes(query.toLowerCase()) ||
            car.registration_year.toString().includes(query)
        );
        setFilteredData(transformData(results));
    };

    React.useEffect(() => {
        setFilteredData(transformData(cars.data));
    }, [cars.data]);

    React.useEffect(() => {
        if (data.id && data.status) {
            updateCarStatus();
        }
    }, [data]);

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Car Management Dashboard" />
            {alert && (
                <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            )}
            <div className="flex flex-1 flex-col gap-4">
                <ReUsableTable
                    caption="Car List"
                    className={'max-h-[550px] h-auto'}
                    tableHeaders={tableHeaders}
                    tableData={filteredData}
                    onSearch={handleSearch}
                />
            </div>
            <div className="mt-6 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex flex-wrap gap-2">
                        {/* Page Numbers */}
                        {cars.links.map((link, index) => {
                            if (index === 0) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            } else if (index === cars.links.length - 1) {
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

export default CarManagementDashboard;

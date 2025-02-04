import ReUsableTable from "@/components/reusabletable";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { CircleOff, Signature } from "lucide-react";
import React, { useState } from "react";

const CarManagementDashboard = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "Booking Management", link: route("booking-management-dashboard") },
    ];

    const { bookings } = usePage().props;
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

    const updateBookingStatus = () => {
        put(route('booking.appointment.update'), {
            data,
            preserveScroll: false,
            onSuccess: (response) => {
                setAlert({
                    type: "success",
                    message: 'Booking status updated successfully',
                });
                if (onSuccess) onSuccess(response);
            },
            onError: {},
        });
    };

    const tableHeaders = [
        { title: "Booking ID", className: "w-[100px]" },
        { title: "Model", className: "w-[150px]" },
        { title: "Year", className: "w-[100px]" },
        { title: "Status", className: "w-[150px] text-center" },
        { title: "Date", className: "w-[200px] text-center" },
        { title: "Actions", className: "w-auto text-center" }
    ];

    const transformData = (data) => {
        return data.map((booking) => {
            return [
                { content: booking.id, className: "font-medium" },
                { content: booking.car.model, className: "font-medium" },
                { content: booking.car.registration_year, className: "font-medium text-center" },
                { content: booking.status, className: "font-medium capitalize text-center" },
                { content: booking.schedule_date, className: "font-medium capitalize text-center" },
                {
                    content: (
                        <div className="flex justify-center gap-2">
                            {booking.status !== 'approved' ? (
                                <>
                                    <Button
                                        className="px-2 py-1 rounded w-auto"
                                        variant='destructive'
                                        onClick={async (e) => {
                                            setData('id', booking.id);
                                            setData('status', 'approved');
                                            await new Promise((resolve) => setTimeout(resolve, 0));
                                            updateBookingStatus();
                                        }}
                                    >
                                        <Signature /> Approved
                                    </Button>
                                    <Button
                                        className="px-2 py-1 rounded  w-auto"
                                        variant='destructive'
                                        onClick={async (e) => {
                                            setData('id', booking.id);
                                            setData('status', 'denied');
                                            await new Promise((resolve) => setTimeout(resolve, 0));
                                            updateBookingStatus();
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
        const results = bookings.data.filter((booking) =>
            booking.model.toLowerCase().includes(query.toLowerCase()) ||
            booking.registration_year.toString().includes(query)
        );
        setFilteredData(transformData(results));
    };

    React.useEffect(() => {
        setFilteredData(transformData(bookings.data));
    }, [bookings.data]);

    React.useEffect(() => {
        if (data.id && data.status) {
            updateBookingStatus();
        }
    }, [data]);

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Booking Management Dashboard" />
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
                        {bookings.links.map((link, index) => {
                            if (index === 0) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            } else if (index === bookings.links.length - 1) {
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

import ReUsableTable from "@/components/reusabletable";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { handleFormSubmit } from "@/lib/utils";
import { Head, useForm, usePage } from "@inertiajs/react";
import { BadgePlus, Ban, ShieldCheck, ShieldOff } from "lucide-react";
import React, { useState } from "react";



const UserManagementDashboard = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "User Management", link: route("user-management-dashboard") },
    ];

    const { users } = usePage().props;
    const [filteredData, setFilteredData] = useState([]);
    const [alert, setAlert] = useState(null);


    const {
        data,
        setData,
        put,
    } = useForm({
        id: '',
        status: '',
        is_admin: '',
    });

    const updateStatus = () => {
        put(route('user.update'), {
            data,
            preserveScroll: false,
            onSuccess: (response) => {
                setAlert({
                    type: "success",
                    message: 'User updated successfully',
                });
                if (onSuccess) onSuccess(response);
            },
            onError: (errors) => {
                setAlert({
                    type: "destructive",
                    message: "Failed to update the user. Please try again.",
                });
                if (onError) onError(errors);
            },
        });
    };


    const tableHeaders = [
        { title: "User ID", className: "w-[100px]" },
        { title: "Name", className: "w-[100px]" },
        { title: "Email" },
        { title: "Role", className: "w-[50px]" },
        { title: "Status", className: "text-center" },
        { title: "Phone", className: "text-center" },
        { title: "Actions", className: "w-[150px] text-center" }
    ];

    const transformData = (data) => {
        return data.map((user) => {
            return [
                { content: user.id, className: "font-medium w-[50px]" },
                { content: user.name, className: "font-medium w-[50px]" },
                { content: user.email, className: "font-medium w-[50px]" },
                { content: user.is_admin === 0 ? 'user' : 'admin', className: "font-medium w-[50px] capitalize" },
                { content: user.status === 'active' ? 'Active' : 'Banned', className: "font-medium w-[50px]" },
                { content: user.profile.phone, className: "font-medium w-[50px]" },
                {
                    content: (
                        <div className="flex justify-center gap-2">
                            {user.status === 'active' ? (
                                <Button
                                    className="px-2 py-1 rounded w-auto"
                                    variant='destructive'
                                    onClick={async (e) => {
                                        setData('id', user.id);
                                        setData('is_admin', user.is_admin);
                                        setData('status', 'banned');
                                        await new Promise((resolve) => setTimeout(resolve, 0));
                                        updateStatus();
                                    }}
                                >
                                    <Ban /> Ban
                                </Button>
                            ) : (
                                <Button
                                    className="px-2 py-1 rounded w-auto bg-green-400 hover:bg-green-400 text-black"
                                    onClick={async (e) => {
                                        setData('id', user.id);
                                        setData('is_admin', user.is_admin);
                                        setData('status', 'active');
                                        await new Promise((resolve) => setTimeout(resolve, 0));
                                        updateStatus();
                                    }}
                                >
                                    <BadgePlus /> Unban
                                </Button>
                            )}
                            {user.is_admin ? (
                                <Button
                                    className="px-2 py-1 rounded w-auto"
                                    variant='destructive'
                                    onClick={async (e) => {
                                        setData('id', user.id);
                                        setData('is_admin', false);
                                        setData('status', user.status);
                                        await new Promise((resolve) => setTimeout(resolve, 0));
                                        updateStatus();
                                    }}
                                >
                                    <ShieldOff /> Demote
                                </Button>
                            ) : (
                                <Button
                                    className="px-2 py-1 rounded w-auto bg-green-400 hover:bg-green-400 text-black"
                                    onClick={async (e) => {
                                        setData('id', user.id);
                                        setData('is_admin', true);
                                        setData('status', user.status);
                                        await new Promise((resolve) => setTimeout(resolve, 0));
                                        updateStatus();
                                    }}
                                >
                                    <ShieldCheck /> Promote
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
        const results = users.data.filter((car) =>
            car.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(transformData(results));
    };


    React.useEffect(() => {
        setFilteredData(transformData(users.data));
    }, [users.data]);

    React.useEffect(() => {
        if (data.id && data.status) {
            updateStatus();
        }
    }, [data]);


    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management Dashboard" />
            {alert && (
                <Alert variant={alert.type} className="mb-4">
                    {alert.message}
                </Alert>
            )}
            <div className="flex flex-1 flex-col gap-4">
                <ReUsableTable
                    caption="My Car Bidding List"
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
                        {users.links.map((link, index) => {
                            if (index === 0) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            } else if (index === users.links.length - 1) {
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

export default UserManagementDashboard;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';
import React from 'react'

const MyCarBiddingDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
        { name: "Bidding Dashboard", link: route("bidding-history-dashboard") },
    ];
    const { allBids } = usePage().props;
    console.log(allBids)
    const tableHeaders = [
        { title: "Bid ID", className: "w-[100px]" },
        { title: "Car ID", className: "w-[100px]" },
        { title: "Car Model" },
        { title: "Buyer", className: "w-[200px]" },
        { title: "Bid Date" },
        { title: "Original Price", className: "text-right" },
        { title: "Amount Price", className: "text-right" },
        { title: "Profit Percentage", className: "text-center" },
        { title: "Actions", className: "w-[150px] text-center" }
    ];

    // const tableData = biddings?.map((bid) => {
    //     return [
    //         { content: car.transaction_id, className: "font-medium" },
    //         { content: car.id, className: "font-medium" },
    //         { content: car.model, className: "font-medium" },
    //         { content: car.fuel.name, className: "font-medium" },
    //         { content: car.transaction.buyer.name, className: "font-medium" },
    //         { content: car.transaction_date },
    //         { content: `$${car.final_price}`, className: "text-right" },
    //         {
    //             content: (
    //                 <div className="flex justify-center gap-2">
    //                     {/* <Button
    //                             className="bg-blue-500 text-white px-2 py-1 rounded w-[60px]"
    //                             onClick={() => handleEdit(car.id)}
    //                         >
    //                             Edit
    //                         </Button>
    //                         <Button
    //                             className="bg-red-500 text-white px-2 py-1 rounded w-[60px]"
    //                             onClick={() => handleDelete(car.id)}
    //                         >
    //                             Delete
    //                         </Button> */}
    //                     <Button
    //                         className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded w-[60px]"
    //                         onClick={() => handleView(car.id)}
    //                     >
    //                         View
    //                     </Button>
    //                 </div>
    //             ),
    //             className: "text-center",
    //         },
    //     ];
    // });

    const handleView = (id) => {
        console.log(`View car with ID: ${id}`);
    };

    const filterDataFunc = (data) => {
        console.log(data);
    }

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>MyCarBiddingDashboard</AuthenticatedLayout>
    )
}

export default MyCarBiddingDashboard

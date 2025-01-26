import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CarCard from "@/Pages/Public/CarListingsPage/CarCard";
import { usePage } from "@inertiajs/react";


const MyCarListDashboard = () => {
    const breadcrumbs = [
        { name: "Cars", link: route("car-list-dashboard") },
    ];
    const { cars } = usePage().props;
    const { data, links } = cars;
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <div className="grid grid-cols-1 gap-6 p-4">
                {data.map((car, index) => (
                    <CarCard car={car} key={index} />
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center">
                <Pagination>
                    <PaginationContent className={'flex flex-wrap gap-2'}>
                        {/* Page Numbers */}
                        {links.map((link, index) => {
                            if (index === 0) {
                                return (<PaginationItem key={index}><PaginationPrevious href={link.url} /></PaginationItem>)
                            } else if (index === links.length - 1) {
                                return (<PaginationItem key={index}><PaginationNext href={link.url} /></PaginationItem>)
                            } else {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationLink href={link.url} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                        })}
                    </PaginationContent>
                </Pagination>
            </div>
        </AuthenticatedLayout>
    )
}

export default MyCarListDashboard

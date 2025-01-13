import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import CarCard from "./CarCard";
import { AppSidebar } from "./filter-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const CarListingWithSidebar = ({ canLogin, canRegister, isLoggedIn }) => {
    const { cars } = usePage().props;  // The paginated car data
    const { data, links } = cars;  // Destructure the car data and links

    const handleFiltersApplied = (filters) => {
        console.log("Selected Filters:", filters);
        // Handle the selected filters here (e.g., fetch API, filter data, etc.)
    };

    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <SidebarProvider>
                <AppSidebar className={'mt-[72px] bg-white'} onApplyFilters={handleFiltersApplied} />
                <SidebarInset>
                    <header className="flex bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route("home-page")}>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route("for-sale-page")}>Car for Sale</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Listings</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>

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
                </SidebarInset>
            </SidebarProvider>
        </GuestLayout>
    );
};

export default CarListingWithSidebar;

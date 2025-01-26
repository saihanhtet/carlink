import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import GuestLayout from "@/Layouts/GuestLayout";
import { router, usePage } from "@inertiajs/react";
import { FilterIcon } from "lucide-react";
import CarCard from "./CarCard";
import { AppSidebar } from "./filter-sidebar";

const CarListingWithSidebar = ({ canLogin, canRegister, isLoggedIn }) => {
    const { cars, brands, fuels, selectedFilters, isFilterActive, status } = usePage().props;
    const { data, links } = cars;

    const handleFiltersApplied = (selectedFilters) => {
        const filterQuery = {
            brands: Array.isArray(selectedFilters.brands) ? selectedFilters.brands.join(",") : "",
            fuels: Array.isArray(selectedFilters.fuels) ? selectedFilters.fuels.join(",") : "",
            priceMin: selectedFilters.priceRange.min,
            priceMax: selectedFilters.priceRange.max,
            yearStart: selectedFilters.yearRange.start,
            yearEnd: selectedFilters.yearRange.end
        };

        router.visit(route('car-listing-page'), {
            method: 'get',
            data: filterQuery,
            preserveState: true
        });
    };

    const cleanFilterApplied = () => {
        router.visit(route('car-listing-page'), {
            method: 'get',
            preserveState: false
        });
    }

    const SidebarToggler = () => {
        const { toggleSidebar } = useSidebar();
        return (
            <Button
                data-sidebar="trigger"
                variant="ghost"
                size="icon"
                className={"h-7 w-7 -ml-1"}
                onClick={() => {
                    toggleSidebar()
                }}>
                <FilterIcon />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        )
    }


    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <SidebarProvider>
                <AppSidebar className={'pt-[72px] bg-white'} onApplyFilters={handleFiltersApplied} cleanFilter={cleanFilterApplied} selectedFilters={selectedFilters} isFilterActive={isFilterActive} brands={brands} fuels={fuels} />
                <SidebarInset>
                    <header className="flex bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                        {/* <SidebarTrigger className="-ml-1" /> */}
                        <SidebarToggler />
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
                        {isFilterActive && status && (
                            <div className="w-full p-3 m-0 bg-green-200 rounded-md shadow-sm border">{status}</div>
                        )}
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

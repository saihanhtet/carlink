import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import GuestLayout from "@/Layouts/GuestLayout";
import CarCard from "./CarCard";
import { AppSidebar } from "./filter-sidebar";

const CarListingWithSidebar = ({ canLogin, canRegister, isLoggedIn }) => {

    const cars = [
        {
            year: 2016,
            model: "Audi A3 e-tron 1.4T Premium",
            price: "$13,990",
            mileage: "88,111 mi",
            location: "Raleigh, NC",
            image: "https://platform.cstatic-images.com/large/in/v2/stock_photos/373f505f-8dc8-4bcb-9df6-fcb922f8dc65/3bca6fbc-3582-4829-94ec-4ab5ef82cad5.png",
        },
        {
            year: 2018,
            model: "Audi A3 e-tron 1.4T Tech Premium",
            price: "$15,995",
            mileage: "65,000 mi",
            location: "Atlanta, GA",
            image: "path/to/car2.jpg",
        },
        {
            year: 2020,
            model: "Tesla Model 3 Standard Range Plus",
            price: "$33,000",
            mileage: "12,000 mi",
            location: "San Francisco, CA",
            image: "https://tesla-cdn.thron.com/delivery/public/image/tesla/23e6c235-1b22-4d0f-96c4-d276dba525e4/bvlatuR/std/2880x1800/Desktop-Model3",
        },
        {
            year: 2019,
            model: "BMW 3 Series 330i xDrive",
            price: "$28,500",
            mileage: "45,000 mi",
            location: "New York, NY",
            image: "https://cdn.bmwblog.com/wp-content/uploads/2022/05/2023-BMW-3-Series-Facelift.jpg",
        },
        {
            year: 2015,
            model: "Honda Civic LX",
            price: "$9,995",
            mileage: "90,000 mi",
            location: "Chicago, IL",
            image: "https://www.honda.ca/Content/honda.ca/20393ed6-70f8-43ee-9a9e-346d23ae8b44/ModelPage_Hero/2020_Honda_Civic_Sedan_Front.png",
        },
        {
            year: 2021,
            model: "Ford Mustang Mach-E Select",
            price: "$45,500",
            mileage: "10,000 mi",
            location: "Austin, TX",
            image: "https://cdn.motor1.com/images/mgl/0ANmW/s3/2021-ford-mustang-mach-e.jpg",
        },
        {
            year: 2017,
            model: "Toyota Camry SE",
            price: "$14,750",
            mileage: "75,000 mi",
            location: "Orlando, FL",
            image: "https://toyota-cms-media.s3.amazonaws.com/wp-content/uploads/2021/02/2021_Camry_SE_Hybrid_Sedan_GalacticAquaMica_L-scaled.jpg",
        },
        {
            year: 2019,
            model: "Chevrolet Bolt EV Premier",
            price: "$24,995",
            mileage: "18,500 mi",
            location: "Denver, CO",
            image: "https://platform.cstatic-images.com/large/in/v2/stock_photos/56dfe10d-5e27-499d-9b78-264aa59cfb10/9f07d79d-c68f-49ea-a80f-5678b6c5c94d.png",
        }
    ];

    const handleFiltersApplied = (filters) => {
        console.log("Selected Filters:", filters)
        // Handle the selected filters here (e.g., fetch API, filter data, etc.)
    }

    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
            <SidebarProvider>
                <AppSidebar className={'mt-[72px]'} onApplyFilters={handleFiltersApplied} />
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
                        {cars.map((car, index) => (
                            <CarCard car={car} key={index} />
                        ))}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </GuestLayout>
    );
};

export default CarListingWithSidebar;

import { usePage } from "@inertiajs/react"
import { NavMain } from "./nav-main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarRail } from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"
import { Car, CarFrontIcon, ChartCandlestick, User } from "lucide-react"
import { NavUser } from "./nav-user"

export function DashboardSidebar({ user, admin, ...props }) {
    const { url } = usePage() // Get the current URL
    const isAdmin = admin === 1 ? true : false;

    // Dynamically update the isActive flag based on the current route
    const adminData = {
        navMain: [
            {
                title: "Analytics",
                url: "#",
                icon: ChartCandlestick,
                items: [
                    {
                        title: "Dashboard",
                        url: new URL(route("dashboard")).pathname,
                        isActive: url === new URL(route("dashboard")).pathname
                    },
                ],
            },
            {
                title: "Cars",
                url: "#",
                icon: Car,
                items: [
                    {
                        title: "Cars Approve",
                        url: new URL(route("car-management-dashboard")).pathname,
                        isActive: url === new URL(route("car-management-dashboard")).pathname
                    },
                    {
                        title: "Bookings Approve",
                        url: new URL(route("booking-management-dashboard")).pathname,
                        isActive: url === new URL(route("booking-management-dashboard")).pathname
                    },
                ],
            },
            {
                title: "Users",
                url: "#",
                icon: User,
                items: [
                    {
                        title: "Management",
                        url: new URL(route("user-management-dashboard")).pathname,
                        isActive: url === new URL(route("user-management-dashboard")).pathname
                    },
                ],
            },
        ],
    }

    const data = {
        navMain: [
            {
                title: "Analytics",
                url: "#",
                icon: ChartCandlestick,
                items: [
                    {
                        title: "Dashboard",
                        url: new URL(route("dashboard")).pathname,
                        isActive: url === new URL(route("dashboard")).pathname
                    },
                    {
                        title: "Transactions",
                        url: new URL(route("car-sales-dashboard")).pathname,
                        isActive: url === new URL(route("car-sales-dashboard")).pathname
                    },
                ],
            },
            {
                title: "Cars",
                url: "#",
                icon: Car,
                items: [
                    {
                        title: "Cars List",
                        url: new URL(route("car-list-dashboard")).pathname,
                        isActive: url === new URL(route("car-list-dashboard")).pathname
                    },
                    {
                        title: "Sell",
                        url: new URL(route("car-upload-dashboard")).pathname,
                        isActive: url === new URL(route("car-upload-dashboard")).pathname
                    },
                    {
                        title: "Bidding",
                        url: new URL(route("bidding-history-dashboard")).pathname,
                        isActive: url === new URL(route("bidding-history-dashboard")).pathname
                    },
                ],
            },
        ],
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className='bg-background'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('home-page')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <CarFrontIcon className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold rubik text-lg">CarLink</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto bg-background">
                <NavMain items={isAdmin ? adminData.navMain : data.navMain} />
            </SidebarContent>
            <SidebarFooter className='bg-background'>
                {user && <NavUser user={user} />}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

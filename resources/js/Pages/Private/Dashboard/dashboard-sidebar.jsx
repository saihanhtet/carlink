"use client"

import {
    Car,
    ChartCandlestick,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2
} from "lucide-react"

import { NavMain } from "./nav-main"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { Link } from "@inertiajs/react"


// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: ChartCandlestick,
            isActive: true,
            items: [
                {
                    title: "Analytics",
                    url: new URL(route("dashboard")).pathname,
                },
                {
                    title: "My Sales",
                    url: new URL(route("car-sales")).pathname,
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },

        {
            title: "Cars",
            url: "#",
            icon: Car,
            items: [
                {
                    title: "Sell Your Car",
                    url: "#",
                },
                {
                    title: "My Cars",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function DashboardSidebar({ user, ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('home-page')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">CarLink</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {user && (
                    <NavUser user={user} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

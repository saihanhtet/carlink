import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const data = {
    navMain: [
        {
            title: "Car Filters",
            items: [
                {
                    title: "Brand",
                    options: ["Toyota", "Honda", "Ford", "BMW", "Mercedes"],
                },
                {
                    title: "Price Range",
                    options: ["$10,000 - $20,000", "$20,000 - $30,000", "$30,000+"],
                },
                {
                    title: "Fuel Type",
                    options: ["Petrol", "Diesel", "Electric", "Hybrid"],
                },
                {
                    title: "Year",
                    options: ["2020", "2021", "2022", "2023"],
                },
            ],
        },
    ],
}

export function AppSidebar({ onApplyFilters, ...props }) {
    const [selectedFilters, setSelectedFilters] = React.useState({})

    const handleCheckboxChange = (filterTitle, option) => {
        setSelectedFilters((prev) => {
            const updatedFilter = new Set(prev[filterTitle] || [])
            if (updatedFilter.has(option)) {
                updatedFilter.delete(option)
            } else {
                updatedFilter.add(option)
            }
            return {
                ...prev,
                [filterTitle]: Array.from(updatedFilter),
            }
        })
    }

    const handleApplyFilters = () => {
        if (onApplyFilters) {
            onApplyFilters(selectedFilters)
        }
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader className="text-md font-semibold rubik capitalize text-primary">
                Filter your car
            </SidebarHeader>
            <SidebarContent className="gap-2 poppins overflow-y-auto max-h-[calc(100vh-80px)]">
                {/* Render each filter dropdown */}
                {data.navMain[0].items.map((filter) => (
                    <Collapsible
                        key={filter.title}
                        className="group/collapsible"
                        defaultOpen={false}
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <CollapsibleTrigger className="flex items-center justify-between p-2">
                                    {filter.title}
                                    <ChevronRight className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent className="p-2">
                                    <ul className="space-y-2">
                                        {filter.options.map((option) => (
                                            <li
                                                key={option}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`${filter.title}-${option}`}
                                                    checked={selectedFilters[filter.title]?.includes(
                                                        option
                                                    )}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            filter.title,
                                                            option
                                                        )
                                                    }
                                                    className="form-checkbox rounded text-blue-600 focus:ring focus:ring-blue-300"
                                                />
                                                <label
                                                    htmlFor={`${filter.title}-${option}`}
                                                    className="text-sm"
                                                >
                                                    {option}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
                {/* Add the "Apply Filters" button */}
                <div className="mt-4 p-2">
                    <Button onClick={handleApplyFilters} className="w-full">
                        Apply Filters
                    </Button>
                </div>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

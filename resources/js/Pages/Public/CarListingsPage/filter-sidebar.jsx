import * as React from "react";
import { ChevronRight, Filter, FilterXIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";

export function AppSidebar({
    onApplyFilters,
    cleanFilter,
    selectedFilters = {},
    isFilterActive = false,
    brands,
    fuels,
    ...props
}) {
    const [filters, setFilters] = React.useState({
        ...selectedFilters,
        priceRange: { min: "", max: "" },
        yearRange: { start: "", end: "" },
    });

    const updateFilter = (field, value, nestedField) => {
        setFilters((prev) => {
            if (nestedField) {
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [nestedField]: value,
                    },
                };
            }
            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const toggleOption = (field, option) => {
        setFilters((prev) => {
            const updatedOptions = new Set(prev[field] || []);
            if (updatedOptions.has(option)) {
                updatedOptions.delete(option);
            } else {
                updatedOptions.add(option);
            }
            return {
                ...prev,
                [field]: Array.from(updatedOptions),
            };
        });
    };

    const handleApplyFilters = () => onApplyFilters?.(filters);

    const handleClearFilters = () => {
        const clearedFilters = {
            priceRange: { min: "", max: "" },
            yearRange: { start: "", end: "" },
        };
        setFilters(clearedFilters);
        cleanFilter?.(clearedFilters);
    };

    const renderCustomRange = (idPrefix, range, onChange) => (
        <div className="space-y-2">
            {Object.entries(range).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                    <InputLabel
                        className=""
                        htmlFor={`${idPrefix}-${key}`}
                        value={`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
                    />
                    <TextInput
                        id={`${idPrefix}-${key}`}
                        type="number"
                        value={value}
                        onChange={(e) => onChange(key, e.target.value)}
                        className="form-input rounded text-blue-600 focus:ring focus:ring-blue-300 w-full"
                    />
                </div>
            ))}
        </div>
    );

    const filtersConfig = [
        {
            title: "Brand",
            field: "brands",
            options: brands.map((brand) => brand.name),
        },
        {
            title: "Price Range",
            field: "priceRange",
            custom: true,
            render: () =>
                renderCustomRange("price", filters.priceRange, (key, value) =>
                    updateFilter("priceRange", value, key)
                ),
        },
        {
            title: "Fuel Type",
            field: "fuels",
            options: fuels.map((fuel) => fuel.name),
        },
        {
            title: "Bidding Status",
            field: "bid",
            options: ['open', 'close'],
        },
        {
            title: "Year",
            field: "yearRange",
            custom: true,
            render: () =>
                renderCustomRange("year", filters.yearRange, (key, value) =>
                    updateFilter("yearRange", value, key)
                ),
        },
    ];

    return (
        <Sidebar {...props}>
            <SidebarHeader className="flex items-center justify-between p-2 bg-white text-md font-semibold flex-row text-primary-foreground">
                <span>Filter your car</span>
                <Button variant="ghost" onClick={handleClearFilters} className={`${!isFilterActive ? 'opacity-0' : ''}`}
                    disable={!isFilterActive}
                >
                    <FilterXIcon color="blue" />
                </Button>
            </SidebarHeader>
            <SidebarContent className="gap-2 p-2 overflow-y-auto bg-white h-[calc(100vh-80px)]">
                {filtersConfig.map(({ title, field, options, custom, render }) => (
                    <Collapsible key={title} defaultOpen={false} className="group">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger className="flex items-center justify-between p-2 hover:bg-sidebar-accent">
                                    {title}
                                    <ChevronRight className="ml-2 transition-transform group-data-[state=open]:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent className="p-2">
                                    {custom
                                        ? render()
                                        : options?.map((option) => (
                                            <div key={option} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`${field}-${option}`}
                                                    checked={filters[field]?.includes(option)}
                                                    onChange={() => toggleOption(field, option)}
                                                    className="form-checkbox rounded text-blue-600 focus:ring focus:ring-blue-300"
                                                />
                                                <label htmlFor={`${field}-${option}`} className="capitalize">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
                <div className="mt-4">
                    <Button onClick={handleApplyFilters} className="w-full">
                        <Filter className="mr-2" /> Apply Filters
                    </Button>
                </div>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}

import { BarChartCustom } from "@/components/chart/bar-chart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, Link, usePage } from "@inertiajs/react";
import { TrendingDown, TrendingUp } from "lucide-react";



const CardTemplate = ({ title, content, link, linkContent, className, ...props }) => {
    return (
        <Card
            {...props}
            className={cn("", className)}
        >
            <CardHeader className="py-4">
                <CardTitle className="font-lg font-semibold rubik capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-muted-foreground text-lg poppins text-right capitalize">
                {content}
            </CardContent>
            <CardFooter className="flex justify-end items-center border-t-2 border-muted py-3">
                <Link
                    href={link}
                    className="underline text-muted-foreground font-semibold underline-offset-4 poppins capitalize"
                >
                    {linkContent}
                </Link>
            </CardFooter>
        </Card>
    );
};

const TableTemplate = ({ caption, headers, data, className, ...props }) => {
    return (
        <div className={`relative overflow-x-auto shadow-md sm:rounded-lg border rounded-lg ${className}`} {...props}>
            <div className="overflow-y-auto max-h-[400px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    {/* Caption */}
                    {caption && (
                        <caption className="p-5 text-lg font-bold text-left rtl:text-right text-muted-foreground  capitalize">
                            {caption}
                            <p className="mt-1 text-sm font-seminormal text-muted-foreground">
                                Browse your data in the table below.
                            </p>
                        </caption>
                    )}

                    {/* Headers */}
                    <thead className="sticky top-0 bg-primary z-10">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-xs uppercase text-white ${header.className || ""}`}
                                >
                                    {header.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`bg-inherit border-b dark:bg-gray-800 dark:border-gray-700 ${rowIndex % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""
                                    }`}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`px-6 py-4 ${cell.className || ""}`}
                                    >
                                        {cell.content}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const AdminDashboard = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "User Management", link: route("user-management-dashboard") },
    ];
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="div">user management dashboard</div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;

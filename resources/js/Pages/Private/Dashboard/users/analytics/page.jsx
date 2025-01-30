import { BarChartCustom } from "@/components/chart/bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, usePage } from "@inertiajs/react";
import { TrendingDown, TrendingUp } from "lucide-react";



const CardTemplate = ({ title, content, link, linkContent, className, ...props }) => {
    return (
        <Card
            {...props}
            className={cn("", className)}
        >
            <CardHeader className="py-5 ">
                <CardTitle className="font-lg font-semibold rubik capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-muted-foreground text-lg poppins text-right capitalize">
                {content}
            </CardContent>
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
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
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
                            ))) : (
                            <tr>
                                <td colSpan={headers.length} className="text-center py-4 text-gray-500 dark:text-gray-400">
                                    No Data Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const Analytics = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "Analytics", link: route("dashboard") },
    ];

    const { monthly_bids, month_label, cars, total_profit, average_bidding, transactions } = usePage().props;

    const chartData = monthly_bids.map((bid) => ({
        month: bid.month,
        total: bid.total_bids,
    }));

    const calculateTrend = (data) => {
        if (data.length < 2) return null;
        const lastMonth = data[data.length - 1].total;
        const secondLastMonth = data[data.length - 2].total;
        if (secondLastMonth === 0) return null;
        const percentChange = ((lastMonth - secondLastMonth) / secondLastMonth) * 100;
        return percentChange.toFixed(1);
    };

    const trend = calculateTrend(chartData);

    const trendText = trend
        ? `Trending ${trend > 0 ? "up" : "down"} by ${Math.abs(trend)}%`
        : "No trend data available";

    const trendIcon = trend > 0
        ? <TrendingUp className="h-4 w-4" />
        : <TrendingDown className="h-4 w-4" />

    const chartConfig = {
        total: {
            label: "Total Bid Amount. ",
            color: "hsl(var(--primary))",
        },
    };

    const tableHeaders = [
        { title: "#", className: "w-[100px]" },
        { title: "Car Model" },
        { title: "Fuel", className: "w-[200px]" },
        { title: "Transaction Date" },
        { title: "Final Price", className: "text-right" },
    ];

    const tableData = transactions?.map((trans) => {
        return [
            { content: trans.transaction_id, className: "font-medium" },
            { content: trans.model, className: "font-medium" },
            { content: trans.fuel_name, className: "font-medium" },
            { content: trans.transaction_date },
            { content: `$${trans.final_price}`, className: "text-right" },
        ];
    });

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />
            <div className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Cards */}
                    <CardTemplate
                        title={"My Cars"}
                        content={cars.length}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />
                    <CardTemplate
                        title={"Profits"}
                        content={`$${total_profit ? total_profit.toFixed(2) : 0}`}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />
                    <CardTemplate
                        title={"Avg. Bidding per Month"}
                        content={`$${average_bidding ? average_bidding.toFixed(2) : 0}`}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />

                    {/* Chart */}
                    <div className="lg:col-span-1">
                        <div className="chart-container overflow-x-auto shadow-md rounded-md">
                            <BarChartCustom
                                className="w-full bg-inherit"
                                data={chartData}
                                config={chartConfig}
                                title="Total Bid Count per Month"
                                description={month_label}
                                footerText={`Total bid counts aggregated by month.`}
                                trendText={trendText}
                                trendIcon={trendIcon}
                                orientation="vertical"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="lg:col-span-2">
                        <TableTemplate
                            caption="A list of your recent transactions."
                            headers={tableHeaders}
                            data={tableData.reverse()}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Analytics;

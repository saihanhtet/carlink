import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Head, usePage } from "@inertiajs/react";
import { BarChartCustom } from "@/components/chart/bar-chart";
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
        </Card>
    );
};


const AdminDashboard = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "Analytics", link: route("dashboard") },
    ];
    const { cars_count, users_count, transactions_count, monthly_bids, month_label } = usePage().props;


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
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <CardTemplate
                        title={"Cars"}
                        content={cars_count}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />
                    <CardTemplate
                        title={"Users"}
                        content={users_count}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />
                    <CardTemplate
                        title={"Transaction"}
                        content={transactions_count}
                        link={"#"}
                        linkContent={"Check out"}
                        className="bg-inherit lg:col-span-1"
                    />

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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;

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
                    className="underline text-primary font-semibold underline-offset-4 poppins capitalize"
                >
                    {linkContent}
                </Link>
            </CardFooter>
        </Card>
    );
};

const Analytics = () => {
    const breadcrumbs = [
        { name: "Dashboard", link: route("dashboard") },
        { name: "Analytics", link: route("dashboard") },
    ];

    const { monthly_bids, month_label, cars, total_profit, average_bidding } = usePage().props;

    // Transform monthly_bids into chart data
    const chartData = monthly_bids.map((bid) => ({
        month: bid.month,
        total: bid.total_amount,
    }));

    // Calculate trend (percentage change between the last two months)
    const calculateTrend = (data) => {
        if (data.length < 2) return null; // Not enough data to calculate a trend
        const lastMonth = data[data.length - 1].total;
        const secondLastMonth = data[data.length - 2].total;
        if (secondLastMonth === 0) return null; // Avoid division by zero
        const percentChange = ((lastMonth - secondLastMonth) / secondLastMonth) * 100;
        return percentChange.toFixed(1); // Round to one decimal place
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
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <CardTemplate title={"My Cars"} content={cars.length} link={"#"} linkContent={"Check out"} />
                    <CardTemplate title={"Profits"} content={`$${total_profit.toFixed(2)}`} link={"#"} linkContent={"Check out"} />
                    <CardTemplate title={"Avg. Bidding per Month"} content={`$${average_bidding.toFixed(2)}`} link={"#"} linkContent={"Check out"} />
                    <div className="chart-container" style={{ overflowX: 'auto' }}>
                        <BarChartCustom
                            className="shadow-md p-0"
                            data={chartData}
                            config={chartConfig}
                            title="Total Bid Amount per Month"
                            description={month_label}
                            footerText={`Total bid amounts aggregated by month.`}
                            trendText={trendText}
                            trendIcon={trendIcon}
                            orientation="vertical"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Analytics;

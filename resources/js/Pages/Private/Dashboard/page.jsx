import { BarChartCustom } from '@/components/chart/bar-chart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

const CardTemplate = ({ title, content, link, linkContent, className, ...props }) => {
    return (
        <Card
            {...props}
            className={cn(
                "shadow-md p-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30",
                className
            )}
        >
            <CardHeader className="py-4">
                <CardTitle className="font-xl rubik capitalize">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-inherit font-semibold text-xl font-mono text-right capitalize">
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
        { name: 'Dashboard', link: route('dashboard') },
        { name: 'Analytics', link: route('dashboard') },
    ];

    // State for dynamic data fetching
    const [chartData, setChartData] = useState([]);
    const [trend, setTrend] = useState(0); // State to store the calculated trend percentage

    useEffect(() => {
        // Simulate API call
        const fetchData = async () => {
            const data = [
                { month: "January", bid: 186 },
                { month: "February", bid: 305 },
                { month: "March", bid: 237 },
                { month: "April", bid: 73 },
                { month: "May", bid: 209 },
                { month: "June", bid: 214 },
            ];
            setChartData(data);

            // Calculate the percentage trend
            if (data.length > 1) {
                const lastMonth = data[data.length - 1].bid;
                const secondLastMonth = data[data.length - 2].bid;
                const percentChange = ((lastMonth - secondLastMonth) / secondLastMonth) * 100;
                setTrend(percentChange.toFixed(1)); // Round to one decimal place
            }
        };

        fetchData();
    }, []);

    const chartConfig = {
        bid: {
            label: "Bid",
            color: "hsl(var(--chart-3))",
        },
    };

    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <CardTemplate title={'Current Sales'} content={'$5000'} link={'#'} linkContent={"Check out"} />
                    <CardTemplate title={'Profit'} content={'$3000'} link={'#'} linkContent={"Check out"} />
                    <CardTemplate title={'Active Cars'} content={'120'} link={'#'} linkContent={"Check out"} />
                    <BarChartCustom
                        className={'shadow-md p-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30'}
                        data={chartData}
                        config={chartConfig}
                        title="Car Biddings per Month"
                        description="January - June 2024"
                        footerText="Number of car biddings for the last 6 months"
                        trendText={`Trending ${trend > 0 ? 'up' : 'down'} by ${Math.abs(trend)}% this month`}
                        orientation='vertical'
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Analytics;

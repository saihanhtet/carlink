import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export function BarChartCustom({
    data,
    config,
    title = "Bar Chart",
    description = "",
    footerText = "",
    trendText = "",
    trendIcon = <TrendingUp className="h-4 w-4" />,
    orientation = "vertical",
    xKey = '',
    ...props
}) {
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle className={'rubik font-semibold'}>{title}</CardTitle>
                {description && <CardDescription className={"popins"}>{description}</CardDescription>}
            </CardHeader>
            <CardContent className={"poppins"}>
                <ChartContainer config={config}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout={orientation === "horizontal" ? "vertical" : "horizontal"}
                        margin={orientation === "vertical" ? {} : { left: -20 }}
                    >
                        {orientation === 'horizontal' ?
                            (
                                <>
                                    <XAxis type="number" dataKey={xKey} hide />
                                    <YAxis
                                        dataKey="month"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                </>
                            )
                            : (
                                <>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                </>
                            )}

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {Object.keys(config).map((key) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={config[key].color}
                                radius={orientation === "vertical" ? 8 : 5}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {trendText && (
                    <div className="flex gap-2 font-medium leading-none">
                        {trendText} {trendIcon}
                    </div>
                )}
                {footerText && (
                    <div className="leading-none text-muted-foreground">
                        {footerText}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

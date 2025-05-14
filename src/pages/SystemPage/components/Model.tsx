import { 
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

const chartConfig = {
    desktop: {
        label: "调用次数",
        color: "blue",
    },
} satisfies ChartConfig

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
    { month: "June", desktop: 214 },
]

const models = [
    { id: 1, name: "模型1" },
    { id: 2, name: "模型2" },
    { id: 3, name: "模型3" },
    { id: 4, name: "模型4" },
    { id: 5, name: "模型5" },
    { id: 6, name: "模型6" },
    { id: 7, name: "模型7" },
    { id: 8, name: "模型8" },
    { id: 9, name: "模型9" },
    { id: 10, name: "模型10" },   
    { id: 11, name: "模型11" },
    { id: 12, name: "模型12" },     
    { id: 13, name: "模型13" },
    { id: 14, name: "模型14" },
]

export default function Model() {
    return <div className="w-full h-full">
        <div className="w-full h-[150px] flex">
            <div className=" basis-1/5 flex flex-col justify-center ml-10 mr-10 border-r">
                <p className=" text-3xl font-bold">模型实况折线图</p>
                <p className="text-sm text-gray-700">展示最近以来的模型调用次数</p>
            </div>
            <div className="flex basis-4/5 items-center space-x-20">
                <div className="border-r text-center">
                    <p>查询时间间隔：</p>
                </div>
                <Carousel className="w-full max-w-[800px]">
                    <CarouselContent>
                        {models.map(model => (
                            <CarouselItem key={model.id} className="md:basis-1/2 lg:basis-1/6">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className=" font-semibold">{model.name}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
        <div className="w-full h-[calc(100%-200px)]">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                        dataKey="desktop"
                        type="linear"
                        stroke="var(--color-desktop)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    </div>
}
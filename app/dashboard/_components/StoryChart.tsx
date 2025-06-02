"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface StoryChartProps {
  data: {
    date: string
    total: number
  }[]
}

const chartConfig = {
  total: {
    label: "Stories",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function StoryChart({ data }: StoryChartProps) {
  // Calculate trend
  const currentTotal = data[data.length - 1]?.total || 0
  const previousTotal = data[data.length - 2]?.total || 0
  const trend = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0
  const trendText = trend > 0 ? `up by ${trend.toFixed(1)}%` : trend < 0 ? `down by ${Math.abs(trend).toFixed(1)}%` : 'unchanged'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Story Activity</CardTitle>
        <CardDescription>
          Total stories created in the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="total"
              type="natural"
              fill="var(--chart-3)"
              fillOpacity={0.2}
              stroke="var(--chart-3)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending {trendText} this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Last 7 days activity
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 
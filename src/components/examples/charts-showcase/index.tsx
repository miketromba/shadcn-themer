'use client'

import * as React from 'react'
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Line,
	LineChart,
	Pie,
	PieChart,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	XAxis,
	YAxis
} from 'recharts'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

export default function ChartsShowcase() {
	return (
		<div className="space-y-8 p-8 bg-background">
			<div>
				<h1 className="text-4xl font-bold mb-2">Charts Showcase</h1>
				<p className="text-muted-foreground">
					Visualize all 5 chart color variables across different chart
					types
				</p>
			</div>

			<Separator />

			{/* Stacked Bar Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Stacked Bar Chart</CardTitle>
					<CardDescription>
						All 5 chart colors in a stacked bar configuration
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={barChartConfig}
						className="h-[300px] w-full"
					>
						<BarChart data={barChartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Bar
								dataKey="metric1"
								stackId="a"
								fill="var(--chart-1)"
								radius={[0, 0, 4, 4]}
							/>
							<Bar
								dataKey="metric2"
								stackId="a"
								fill="var(--chart-2)"
								radius={[0, 0, 0, 0]}
							/>
							<Bar
								dataKey="metric3"
								stackId="a"
								fill="var(--chart-3)"
								radius={[0, 0, 0, 0]}
							/>
							<Bar
								dataKey="metric4"
								stackId="a"
								fill="var(--chart-4)"
								radius={[0, 0, 0, 0]}
							/>
							<Bar
								dataKey="metric5"
								stackId="a"
								fill="var(--chart-5)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Multi-Line Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Multi-Line Chart</CardTitle>
					<CardDescription>
						5 trend lines showing each chart color
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={lineChartConfig}
						className="h-[300px] w-full"
					>
						<LineChart data={lineChartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Line
								dataKey="chart-1"
								type="monotone"
								stroke="var(--chart-1)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="chart-2"
								type="monotone"
								stroke="var(--chart-2)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="chart-3"
								type="monotone"
								stroke="var(--chart-3)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="chart-4"
								type="monotone"
								stroke="var(--chart-4)"
								strokeWidth={2}
								dot={false}
							/>
							<Line
								dataKey="chart-5"
								type="monotone"
								stroke="var(--chart-5)"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Grid Layout - Pie and Radar */}
			<div className="grid gap-8 md:grid-cols-2">
				{/* Pie Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Pie Chart</CardTitle>
						<CardDescription>
							5 segments for each chart color
						</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<ChartContainer
							config={pieChartConfig}
							className="h-[300px] w-full"
						>
							<PieChart>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Pie
									data={pieChartData}
									dataKey="value"
									nameKey="category"
									innerRadius={60}
									strokeWidth={5}
								>
									<Label
										content={({ viewBox }) => {
											if (
												viewBox &&
												'cx' in viewBox &&
												'cy' in viewBox
											) {
												return (
													<text
														x={viewBox.cx}
														y={viewBox.cy}
														textAnchor="middle"
														dominantBaseline="middle"
													>
														<tspan
															x={viewBox.cx}
															y={viewBox.cy}
															className="fill-foreground text-3xl font-bold"
														>
															100%
														</tspan>
														<tspan
															x={viewBox.cx}
															y={
																(viewBox.cy ||
																	0) + 24
															}
															className="fill-muted-foreground"
														>
															Total
														</tspan>
													</text>
												)
											}
											return null
										}}
									/>
								</Pie>
								<ChartLegend content={<ChartLegendContent />} />
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Radar Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Radar Chart</CardTitle>
						<CardDescription>
							5 metrics showing all chart colors
						</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<ChartContainer
							config={radarChartConfig}
							className="h-[300px] w-full"
						>
							<RadarChart data={radarChartData}>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent />}
								/>
								<PolarAngleAxis dataKey="metric" />
								<PolarGrid />
								<Radar
									dataKey="chart-1"
									fill="var(--chart-1)"
									fillOpacity={0.6}
								/>
								<Radar
									dataKey="chart-2"
									fill="var(--chart-2)"
									fillOpacity={0.6}
								/>
								<Radar
									dataKey="chart-3"
									fill="var(--chart-3)"
									fillOpacity={0.6}
								/>
								<Radar
									dataKey="chart-4"
									fill="var(--chart-4)"
									fillOpacity={0.6}
								/>
								<Radar
									dataKey="chart-5"
									fill="var(--chart-5)"
									fillOpacity={0.6}
								/>
								<ChartLegend content={<ChartLegendContent />} />
							</RadarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			{/* Stacked Area Chart */}
			<Card>
				<CardHeader>
					<CardTitle>Stacked Area Chart</CardTitle>
					<CardDescription>
						5 data series stacked to show all chart colors
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={areaChartConfig}
						className="h-[300px] w-full"
					>
						<AreaChart data={areaChartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Area
								dataKey="chart-1"
								type="natural"
								fill="var(--chart-1)"
								fillOpacity={0.4}
								stroke="var(--chart-1)"
								stackId="a"
							/>
							<Area
								dataKey="chart-2"
								type="natural"
								fill="var(--chart-2)"
								fillOpacity={0.4}
								stroke="var(--chart-2)"
								stackId="a"
							/>
							<Area
								dataKey="chart-3"
								type="natural"
								fill="var(--chart-3)"
								fillOpacity={0.4}
								stroke="var(--chart-3)"
								stackId="a"
							/>
							<Area
								dataKey="chart-4"
								type="natural"
								fill="var(--chart-4)"
								fillOpacity={0.4}
								stroke="var(--chart-4)"
								stackId="a"
							/>
							<Area
								dataKey="chart-5"
								type="natural"
								fill="var(--chart-5)"
								fillOpacity={0.4}
								stroke="var(--chart-5)"
								stackId="a"
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Color Reference Card */}
			<Card>
				<CardHeader>
					<CardTitle>Chart Color Reference</CardTitle>
					<CardDescription>
						The 5 chart color variables in your theme
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-5">
						<div className="space-y-2">
							<div
								className="h-12 rounded-md border"
								style={{
									backgroundColor: 'var(--chart-1)'
								}}
							/>
							<p className="text-xs font-medium text-center">
								chart-1
							</p>
						</div>
						<div className="space-y-2">
							<div
								className="h-12 rounded-md border"
								style={{
									backgroundColor: 'var(--chart-2)'
								}}
							/>
							<p className="text-xs font-medium text-center">
								chart-2
							</p>
						</div>
						<div className="space-y-2">
							<div
								className="h-12 rounded-md border"
								style={{
									backgroundColor: 'var(--chart-5)'
								}}
							/>
							<p className="text-xs font-medium text-center">
								chart-3
							</p>
						</div>
						<div className="space-y-2">
							<div
								className="h-12 rounded-md border"
								style={{
									backgroundColor: 'var(--chart-4)'
								}}
							/>
							<p className="text-xs font-medium text-center">
								chart-4
							</p>
						</div>
						<div className="space-y-2">
							<div
								className="h-12 rounded-md border"
								style={{
									backgroundColor: 'var(--chart-5)'
								}}
							/>
							<p className="text-xs font-medium text-center">
								chart-5
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// Chart configurations
const barChartConfig = {
	metric1: {
		label: 'Chart 1',
		color: 'var(--chart-1)'
	},
	metric2: {
		label: 'Chart 2',
		color: 'var(--chart-2)'
	},
	metric3: {
		label: 'Chart 3',
		color: 'var(--chart-3)'
	},
	metric4: {
		label: 'Chart 4',
		color: 'var(--chart-4)'
	},
	metric5: {
		label: 'Chart 5',
		color: 'var(--chart-5)'
	}
} satisfies ChartConfig

const barChartData = [
	{
		month: 'Jan',
		metric1: 186,
		metric2: 80,
		metric3: 120,
		metric4: 90,
		metric5: 60
	},
	{
		month: 'Feb',
		metric1: 305,
		metric2: 200,
		metric3: 150,
		metric4: 120,
		metric5: 90
	},
	{
		month: 'Mar',
		metric1: 237,
		metric2: 120,
		metric3: 180,
		metric4: 150,
		metric5: 100
	},
	{
		month: 'Apr',
		metric1: 73,
		metric2: 190,
		metric3: 90,
		metric4: 80,
		metric5: 70
	},
	{
		month: 'May',
		metric1: 209,
		metric2: 130,
		metric3: 160,
		metric4: 110,
		metric5: 85
	},
	{
		month: 'Jun',
		metric1: 214,
		metric2: 140,
		metric3: 170,
		metric4: 130,
		metric5: 95
	}
]

const lineChartConfig = {
	'chart-1': {
		label: 'Chart 1',
		color: 'var(--chart-1)'
	},
	'chart-2': {
		label: 'Chart 2',
		color: 'var(--chart-2)'
	},
	'chart-3': {
		label: 'Chart 3',
		color: 'var(--chart-3)'
	},
	'chart-4': {
		label: 'Chart 4',
		color: 'var(--chart-4)'
	},
	'chart-5': {
		label: 'Chart 5',
		color: 'var(--chart-5)'
	}
} satisfies ChartConfig

const lineChartData = [
	{
		month: 'Jan',
		'chart-1': 186,
		'chart-2': 305,
		'chart-3': 237,
		'chart-4': 173,
		'chart-5': 209
	},
	{
		month: 'Feb',
		'chart-1': 305,
		'chart-2': 237,
		'chart-3': 173,
		'chart-4': 209,
		'chart-5': 214
	},
	{
		month: 'Mar',
		'chart-1': 237,
		'chart-2': 173,
		'chart-3': 209,
		'chart-4': 214,
		'chart-5': 186
	},
	{
		month: 'Apr',
		'chart-1': 173,
		'chart-2': 209,
		'chart-3': 214,
		'chart-4': 186,
		'chart-5': 305
	},
	{
		month: 'May',
		'chart-1': 209,
		'chart-2': 214,
		'chart-3': 186,
		'chart-4': 305,
		'chart-5': 237
	},
	{
		month: 'Jun',
		'chart-1': 214,
		'chart-2': 186,
		'chart-3': 305,
		'chart-4': 237,
		'chart-5': 173
	}
]

const pieChartConfig = {
	'chart-1': {
		label: 'Chart 1',
		color: 'var(--chart-1)'
	},
	'chart-2': {
		label: 'Chart 2',
		color: 'var(--chart-2)'
	},
	'chart-3': {
		label: 'Chart 3',
		color: 'var(--chart-3)'
	},
	'chart-4': {
		label: 'Chart 4',
		color: 'var(--chart-4)'
	},
	'chart-5': {
		label: 'Chart 5',
		color: 'var(--chart-5)'
	}
} satisfies ChartConfig

const pieChartData = [
	{ category: 'chart-1', value: 275, fill: 'var(--chart-1)' },
	{ category: 'chart-2', value: 200, fill: 'var(--chart-2)' },
	{ category: 'chart-3', value: 187, fill: 'var(--chart-3)' },
	{ category: 'chart-4', value: 173, fill: 'var(--chart-4)' },
	{ category: 'chart-5', value: 90, fill: 'var(--chart-5)' }
]

const radarChartConfig = {
	'chart-1': {
		label: 'Chart 1',
		color: 'var(--chart-1)'
	},
	'chart-2': {
		label: 'Chart 2',
		color: 'var(--chart-2)'
	},
	'chart-3': {
		label: 'Chart 3',
		color: 'var(--chart-3)'
	},
	'chart-4': {
		label: 'Chart 4',
		color: 'var(--chart-4)'
	},
	'chart-5': {
		label: 'Chart 5',
		color: 'var(--chart-5)'
	}
} satisfies ChartConfig

const radarChartData = [
	{
		metric: 'Speed',
		'chart-1': 80,
		'chart-2': 60,
		'chart-3': 90,
		'chart-4': 70,
		'chart-5': 85
	},
	{
		metric: 'Quality',
		'chart-1': 90,
		'chart-2': 85,
		'chart-3': 70,
		'chart-4': 80,
		'chart-5': 75
	},
	{
		metric: 'Reach',
		'chart-1': 70,
		'chart-2': 75,
		'chart-3': 80,
		'chart-4': 90,
		'chart-5': 65
	},
	{
		metric: 'Efficiency',
		'chart-1': 85,
		'chart-2': 70,
		'chart-3': 75,
		'chart-4': 65,
		'chart-5': 90
	},
	{
		metric: 'Impact',
		'chart-1': 75,
		'chart-2': 90,
		'chart-3': 85,
		'chart-4': 75,
		'chart-5': 80
	}
]

const areaChartConfig = {
	'chart-1': {
		label: 'Chart 1',
		color: 'var(--chart-1)'
	},
	'chart-2': {
		label: 'Chart 2',
		color: 'var(--chart-2)'
	},
	'chart-3': {
		label: 'Chart 3',
		color: 'var(--chart-3)'
	},
	'chart-4': {
		label: 'Chart 4',
		color: 'var(--chart-4)'
	},
	'chart-5': {
		label: 'Chart 5',
		color: 'var(--chart-5)'
	}
} satisfies ChartConfig

const areaChartData = [
	{
		month: 'Jan',
		'chart-1': 50,
		'chart-2': 40,
		'chart-3': 60,
		'chart-4': 30,
		'chart-5': 45
	},
	{
		month: 'Feb',
		'chart-1': 60,
		'chart-2': 50,
		'chart-3': 70,
		'chart-4': 40,
		'chart-5': 55
	},
	{
		month: 'Mar',
		'chart-1': 70,
		'chart-2': 60,
		'chart-3': 50,
		'chart-4': 50,
		'chart-5': 65
	},
	{
		month: 'Apr',
		'chart-1': 50,
		'chart-2': 70,
		'chart-3': 60,
		'chart-4': 60,
		'chart-5': 50
	},
	{
		month: 'May',
		'chart-1': 80,
		'chart-2': 60,
		'chart-3': 80,
		'chart-4': 45,
		'chart-5': 70
	},
	{
		month: 'Jun',
		'chart-1': 90,
		'chart-2': 75,
		'chart-3': 70,
		'chart-4': 55,
		'chart-5': 80
	}
]

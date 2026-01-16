"use client";
import { ComponentConfig } from "../layout";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/optics/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

import componentCode from "@/registry/optics/dist/chart.jsx.txt";
import generatedProps from "@/registry/optics/dist/chart.json";

const componentFiles = [
	{
		path: "@/components/optics/chart.jsx",
		code: componentCode,
	},
];

const data = [
	{ month: "Jan", visitors: 1200, sales: 900 },
	{ month: "Feb", visitors: 1500, sales: 1100 },
	{ month: "Mar", visitors: 1800, sales: 1400 },
	{ month: "Apr", visitors: 1600, sales: 1200 },
	{ month: "May", visitors: 1900, sales: 1500 },
	{ month: "Jun", visitors: 2100, sales: 1700 },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
		color: "var(--chart-1, #2563eb)",
	},
	sales: {
		label: "Sales",
		color: "var(--chart-2, #16a34a)",
	},
};



const demoComponent = (
	<ChartContainer config={chartConfig} className="w-full max-w-4xl">
		<LineChart data={data} margin={{ left: 8, right: 8 }}>
			<CartesianGrid strokeDasharray="4 4" vertical={false} />
			<XAxis
				dataKey="month"
				tickLine={false}
				axisLine={false}
				tickMargin={10}
			/>
			<YAxis
				tickLine={false}
				axisLine={false}
				tickMargin={6}
				allowDecimals={false}
			/>
			<ChartTooltip content={<ChartTooltipContent />} />
			<ChartLegend content={<ChartLegendContent />} />
			<Line
				type="monotone"
				dataKey="visitors"
				stroke="var(--color-visitors, #2563eb)"
				strokeWidth={2.5}
				dot={false}
				activeDot={{ r: 5 }}
			/>
			<Line
				type="monotone"
				dataKey="sales"
				stroke="var(--color-sales, #16a34a)"
				strokeWidth={2.5}
				dot={false}
				activeDot={{ r: 5 }}
			/>
		</LineChart>
	</ChartContainer>
);

const componentConfig = {
	header: {
		title: "Chart",
		description:
			"Composable chart container built on Recharts with theming helpers.",
		href: "https://ui.shadcn.com",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/optics/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
	{ month: "Jan", visitors: 1200, sales: 900 },
	{ month: "Feb", visitors: 1500, sales: 1100 },
	{ month: "Mar", visitors: 1800, sales: 1400 },
	{ month: "Apr", visitors: 1600, sales: 1200 },
	{ month: "May", visitors: 1900, sales: 1500 },
	{ month: "Jun", visitors: 2100, sales: 1700 },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
		color: "var(--chart-1, #2563eb)",
	},
	sales: {
		label: "Sales",
		color: "var(--chart-2, #16a34a)",
	},
};`,
		filename: "chart.jsx",
	},
	installation: {
		componentName: "chart",
		dependencies: "recharts",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}


"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = {
	light: "",
	dark: ".dark",
} as const;

type ChartConfigItem = {
	label?: React.ReactNode;
	icon?: React.ComponentType;
	color?: string;
	theme?: Partial<Record<keyof typeof THEMES, string>>;
};

type ChartConfig = Record<string, ChartConfigItem>;

type ChartContextValue = {
	config: ChartConfig;
};

type ChartContainerProps = React.ComponentProps<"div"> & {
	id?: string;
	children?: React.ReactElement;
	config?: ChartConfig;
};

type ChartStyleProps = {
	id: string;
	config: ChartConfig;
};

type ChartTooltipPayloadItem = {
	name?: string;
	dataKey?: string;
	value?: number | string;
	type?: string;
	color?: string;
	payload: Record<string, unknown> & {
		fill?: string;
	};
};

type ChartTooltipContentProps = {
	active?: boolean;
	payload?: ChartTooltipPayloadItem[];
	className?: string;
	indicator?: "dot" | "line" | "dashed";
	hideLabel?: boolean;
	hideIndicator?: boolean;
	label?: string;
	labelFormatter?: (
		value: React.ReactNode,
		payload: ChartTooltipPayloadItem[],
	) => React.ReactNode;
	labelClassName?: string;
	formatter?: (
		value: number | string,
		name: string,
		item: ChartTooltipPayloadItem,
		index: number,
		payload: ChartTooltipPayloadItem["payload"],
	) => React.ReactNode;
	color?: string;
	nameKey?: string;
	labelKey?: string;
};

type ChartLegendContentProps = {
	className?: string;
	hideIcon?: boolean;
	payload?: Array<{
		value?: string;
		dataKey?: string;
		color?: string;
		type?: string;
	}>;
	verticalAlign?: "top" | "bottom";
	nameKey?: string;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}

	return context;
}

function ChartContainer({
	id = undefined,
	className = "",
	children,
	config = {},
	...props
}: ChartContainerProps) {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

	if (!children) {
		return null;
	}

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-slot="chart"
				data-chart={chartId}
				className={cn(
					"[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
					className,
				)}
				{...props}
			>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

function ChartStyle({ id = "", config = {} }: ChartStyleProps) {
	const colorConfig = Object.entries(config).filter(
		([, itemConfig]) => itemConfig.theme || itemConfig.color,
	);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.filter(Boolean)
	.join("\n")}
}
`,
					)
					.join("\n"),
			}}
		/>
	);
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
	active = false,
	payload = [],
	className = "",
	indicator = "dot",
	hideLabel = false,
	hideIndicator = false,
	label = undefined,
	labelFormatter = undefined,
	labelClassName = "",
	formatter = undefined,
	color = undefined,
	nameKey = undefined,
	labelKey = undefined,
}: ChartTooltipContentProps) {
	const { config } = useChart();

	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload.length) {
			return null;
		}

		const [item] = payload;
		const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value =
			!labelKey && typeof label === "string"
				? config[label]?.label || label
				: itemConfig?.label;

		if (labelFormatter) {
			return (
				<div className={cn("font-medium", labelClassName)}>
					{labelFormatter(value, payload)}
				</div>
			);
		}

		if (!value) {
			return null;
		}

		return <div className={cn("font-medium", labelClassName)}>{value}</div>;
	}, [
		config,
		hideLabel,
		label,
		labelClassName,
		labelFormatter,
		labelKey,
		payload,
	]);

	if (!active || !payload.length) {
		return null;
	}

	const nestLabel = payload.length === 1 && indicator !== "dot";

	return (
		<div
			className={cn(
				"border-border/50 bg-background gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs/relaxed shadow-xl grid min-w-32 items-start",
				className,
			)}
		>
			{!nestLabel ? tooltipLabel : null}
			<div className="grid gap-1.5">
				{payload
					.filter((item) => item.type !== "none")
					.map((item, index) => {
						const key = `${nameKey || item.name || item.dataKey || "value"}`;
						const itemConfig = getPayloadConfigFromPayload(config, item, key);
						const indicatorColor = color || item.payload.fill || item.color;

						return (
							<div
								key={item.dataKey ?? item.name ?? index}
								className={cn(
									"[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
									indicator === "dot" && "items-center",
								)}
							>
								{formatter && item.value !== undefined && item.name ? (
									formatter(item.value, item.name, item, index, item.payload)
								) : (
									<>
										{itemConfig?.icon ? (
											<itemConfig.icon />
										) : (
											!hideIndicator && (
												<div
													className={cn(
														"shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
														{
															"h-2.5 w-2.5": indicator === "dot",
															"w-1": indicator === "line",
															"w-0 border-[1.5px] border-dashed bg-transparent":
																indicator === "dashed",
															"my-0.5": nestLabel && indicator === "dashed",
														},
													)}
													style={
														{
															"--color-bg": indicatorColor,
															"--color-border": indicatorColor,
														} as React.CSSProperties
													}
												/>
											)
										)}
										<div
											className={cn(
												"flex flex-1 justify-between leading-none",
												nestLabel ? "items-end" : "items-center",
											)}
										>
											<div className="grid gap-1.5">
												{nestLabel ? tooltipLabel : null}
												<span className="text-muted-foreground">
													{itemConfig?.label || item.name}
												</span>
											</div>
											{item.value !== undefined && (
												<span className="text-foreground font-mono font-medium tabular-nums">
													{item.value.toLocaleString()}
												</span>
											)}
										</div>
									</>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
	className = "",
	hideIcon = false,
	payload = [],
	verticalAlign = "bottom",
	nameKey = undefined,
}: ChartLegendContentProps) {
	const { config } = useChart();

	if (!payload.length) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex items-center justify-center gap-4",
				verticalAlign === "top" ? "pb-3" : "pt-3",
				className,
			)}
		>
			{payload
				.filter((item) => item.type !== "none")
				.map((item) => {
					const key = `${nameKey || item.dataKey || "value"}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);

					return (
						<div
							key={item.value ?? key}
							className={cn(
								"[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
							)}
						>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<div
									className="h-2 w-2 shrink-0 rounded-[2px]"
									style={{
										backgroundColor: item.color,
									}}
								/>
							)}
							{itemConfig?.label}
						</div>
					);
				})}
		</div>
	);
}

function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: Record<string, unknown>,
	key: string,
) {
	if (typeof payload !== "object" || payload === null) {
		return undefined;
	}

	const payloadPayload =
		"payload" in payload &&
		typeof payload.payload === "object" &&
		payload.payload !== null
			? (payload.payload as Record<string, unknown>)
			: undefined;

	let configLabelKey = key;

	if (key in payload && typeof payload[key] === "string") {
		configLabelKey = payload[key] as string;
	} else if (
		payloadPayload &&
		key in payloadPayload &&
		typeof payloadPayload[key] === "string"
	) {
		configLabelKey = payloadPayload[key] as string;
	}

	return config[configLabelKey] ?? config[key];
}

export {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	ChartStyle,
};

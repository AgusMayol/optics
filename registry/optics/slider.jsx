"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { buttonVariants } from "@/registry/optics/button";
import { cn } from "@/lib/utils";

function Slider({
	className = "",
	defaultValue = undefined,
	value = undefined,
	min = 0,
	max = 100,
	...props
}) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			className="w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40"
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control
				className={cn(
					"relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:min-h-40",
					className,
				)}
			>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className={cn(
						"bg-muted relative grow select-none overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
					)}
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="bg-primary absolute select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={index}
						className={cn(
							"border-primary ring-ring/30 size-4 border bg-white shadow-sm hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50",
							buttonVariants({
								variant: "raised",
								size: "icon-xs",
								animation: "none",
								className:
									"rounded-full squircle-none transition-[color,background-color,border-color,box-shadow] duration-150 motion-reduce:transition-none",
							}),
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

export { Slider };

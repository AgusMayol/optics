"use client";

import type * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({
	className = "",
	children = null,
	value = 0,
	...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "className"> & {
	className?: string;
}) {
	return (
		<ProgressPrimitive.Root
			value={value}
			data-slot="progress"
			className={cn("flex flex-wrap gap-3", className)}
			{...props}
		>
			{children}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Track>, "className"> & {
	className?: string;
}) {
	return (
		<ProgressPrimitive.Track
			className={cn(
				"bg-muted h-1 rounded-md relative flex w-full items-center overflow-x-hidden",
				className,
			)}
			data-slot="progress-track"
			{...props}
		/>
	);
}

function ProgressIndicator({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Indicator>, "className"> & {
	className?: string;
}) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className={cn("bg-primary h-full transition-all", className)}
			{...props}
		/>
	);
}

function ProgressLabel({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Label>, "className"> & {
	className?: string;
}) {
	return (
		<ProgressPrimitive.Label
			className={cn("text-xs/relaxed font-medium", className)}
			data-slot="progress-label"
			{...props}
		/>
	);
}

function ProgressValue({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof ProgressPrimitive.Value>, "className"> & {
	className?: string;
}) {
	return (
		<ProgressPrimitive.Value
			className={cn("text-muted-foreground ml-auto text-xs/relaxed tabular-nums", className)}
			data-slot="progress-value"
			{...props}
		/>
	);
}

Progress.displayName = "Progress";
ProgressTrack.displayName = "ProgressTrack";
ProgressIndicator.displayName = "ProgressIndicator";
ProgressLabel.displayName = "ProgressLabel";
ProgressValue.displayName = "ProgressValue";

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };

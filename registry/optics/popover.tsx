"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverTriggerProps = React.ComponentProps<
	typeof PopoverPrimitive.Trigger
>;
type PopoverPopupProps = Omit<
	React.ComponentProps<typeof PopoverPrimitive.Popup>,
	"className"
>;
type PopoverContentProps = PopoverPopupProps & {
	className?: string;
	positionerClassName?: string;
	align?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["align"];
	alignOffset?: React.ComponentProps<
		typeof PopoverPrimitive.Positioner
	>["alignOffset"];
	side?: React.ComponentProps<typeof PopoverPrimitive.Positioner>["side"];
	sideOffset?: React.ComponentProps<
		typeof PopoverPrimitive.Positioner
	>["sideOffset"];
};

function Popover(props: PopoverProps) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger(props: PopoverTriggerProps) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
	className = "",
	positionerClassName = "",
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 4,
	...props
}: PopoverContentProps) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className={cn("isolate z-50", positionerClassName)}
			>
				<PopoverPrimitive.Popup
					data-slot="popover-content"
					className={cn(
						"bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-4 rounded-lg p-2.5 text-xs shadow-md ring-1 duration-100 z-50 w-72 origin-(--transform-origin) outline-hidden",
						className,
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverHeader({
	className = "",
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-1 text-xs", className)}
			{...props}
		/>
	);
}

function PopoverTitle({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Title>, "className"> & {
	className?: string;
}) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className = "",
	...props
}: Omit<
	React.ComponentProps<typeof PopoverPrimitive.Description>,
	"className"
> & {
	className?: string;
}) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("text-muted-foreground", className)}
			{...props}
		/>
	);
}

Popover.displayName = "Popover";
PopoverContent.displayName = "PopoverContent";
PopoverDescription.displayName = "PopoverDescription";
PopoverHeader.displayName = "PopoverHeader";
PopoverTitle.displayName = "PopoverTitle";
PopoverTrigger.displayName = "PopoverTrigger";

export {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
};

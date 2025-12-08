"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
	TooltipProvider,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/optics/tooltip";

import { cn } from "@/registry/optics/lib/utils";

function AvatarStack({ data, children, ...props }) {
	return (
		<div className="flex items-center -space-x-2">
			{data.map((item, index) => (
				<Avatar title={item.title} key={index}>
					<AvatarImage src={item.image} />
					<AvatarFallback>{item.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
}

function Avatar({ className, title, side, sideOffset = 0, ...props }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<AvatarPrimitive.Root
						data-slot="avatar"
						className={cn(
							"relative flex size-8 shrink-0 overflow-hidden rounded-full squircle-none border border-background shadow-sm",
							className,
						)}
						{...props}
					/>
				</TooltipTrigger>
				<TooltipContent side={side} sideOffset={sideOffset}>
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function AvatarImage({ className, ...props }) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

function AvatarFallback({ className, ...props }) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-muted flex size-full items-center justify-center rounded-full squircle-none",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback, AvatarStack };

"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul-base";

import { cn } from "@/lib/utils";

function Drawer({ ...props } = {}) {
	return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props } = {}) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props } = {}) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props } = {}) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className = "", ...props }) {
	return (
		<DrawerPrimitive.Overlay
			data-slot="drawer-overlay"
			className={cn(
				"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/80 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerHandle({ className = "", ...props }) {
	return (
		<DrawerPrimitive.Handle
			data-slot="drawer-handle"
			className={cn(
				"mx-auto mt-4 h-1.5 w-[100px] rounded-full bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({ className = "", children = null, ...props }) {
	return (
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />
			<DrawerPrimitive.Content
				data-slot="drawer-content"
				className={cn(
					"before:bg-background flex h-auto flex-col bg-transparent p-2 text-xs/relaxed before:absolute before:inset-2 before:-z-10 before:rounded-xl data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm group/drawer-content fixed z-50",
					className,
				)}
				{...props}
			>
				<DrawerHandle className="group-data-[vaul-drawer-direction=bottom]/drawer-content:block hidden shrink-0" />
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

function DrawerHeader({ className = "", ...props }) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				"gap-1 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:text-left flex flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerFooter({ className = "", ...props }) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("gap-2 p-4 mt-auto flex flex-col", className)}
			{...props}
		/>
	);
}

function DrawerTitle({ className = "", ...props }) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("text-foreground text-sm font-medium", className)}
			{...props}
		/>
	);
}

function DrawerDescription({ className = "", ...props }) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-muted-foreground text-xs/relaxed", className)}
			{...props}
		/>
	);
}


Drawer.displayName = "Drawer";
DrawerPortal.displayName = "DrawerPortal";
DrawerOverlay.displayName = "DrawerOverlay";
DrawerTrigger.displayName = "DrawerTrigger";
DrawerClose.displayName = "DrawerClose";
DrawerHandle.displayName = "DrawerHandle";
DrawerContent.displayName = "DrawerContent";
DrawerHeader.displayName = "DrawerHeader";
DrawerFooter.displayName = "DrawerFooter";
DrawerTitle.displayName = "DrawerTitle";
DrawerDescription.displayName = "DrawerDescription";

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerHandle,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};


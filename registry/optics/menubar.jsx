"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";

import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/optics/dropdown-menu";
import { CheckIcon } from "lucide-react";

function Menubar({ className = "", ...props }) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			className={cn(
				"bg-background h-9 rounded-md border p-1 flex items-center",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarMenu({ ...props } = {}) {
	return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({ ...props } = {}) {
	return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({ ...props } = {}) {
	return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarTrigger({ className = "", ...props }) {
	return (
		<DropdownMenuTrigger
			data-slot="menubar-trigger"
			className={cn(
				"hover:bg-muted aria-expanded:bg-muted rounded-[calc(var(--radius-sm)-2px)] px-2 py-[calc(--spacing(0.875))] text-xs/relaxed font-medium flex items-center outline-hidden select-none",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarContent({
	className = "",
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}) {
	return (
		<DropdownMenuContent
			data-slot="menubar-content"
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"bg-popover text-popover-foreground data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-48 rounded-lg p-1 shadow-md ring-1 duration-100",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarItem({
	className = "",
	inset = false,
	variant = "default",
	...props
}) {
	return (
		<DropdownMenuItem
			data-slot="menubar-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs/relaxed data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-3.5 group/menubar-item",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarCheckboxItem({
	className = "",
	children = null,
	checked = undefined,
	...props
}) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground min-h-7 gap-2 rounded-md py-1.5 pr-2 pl-8 text-xs data-disabled:opacity-50 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="left-2 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center">
				<MenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</MenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</MenuPrimitive.CheckboxItem>
	);
}

function MenubarRadioGroup({ ...props } = {}) {
	return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarRadioItem({ className = "", children = null, ...props }) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menubar-radio-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground min-h-7 gap-2 rounded-md py-1.5 pr-2 pl-8 text-xs data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span className="left-2 size-4 [&_svg:not([class*='size-'])]:size-4 pointer-events-none absolute flex items-center justify-center">
				<MenuPrimitive.RadioItemIndicator>
					<CheckIcon />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}

function MenubarLabel({ className = "", inset = false, ...props }) {
	return (
		<DropdownMenuLabel
			data-slot="menubar-label"
			data-inset={inset}
			className={cn(
				"text-muted-foreground px-2 py-1.5 text-xs data-[inset]:pl-8",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSeparator({ className = "", ...props }) {
	return (
		<DropdownMenuSeparator
			data-slot="menubar-separator"
			className={cn("bg-border/50 -mx-1 my-1 h-px -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function MenubarShortcut({ className = "", ...props }) {
	return (
		<DropdownMenuShortcut
			data-slot="menubar-shortcut"
			className={cn(
				"text-muted-foreground group-focus/menubar-item:text-accent-foreground text-[0.625rem] tracking-widest ml-auto",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSub({ ...props } = {}) {
	return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({ className = "", inset = false, ...props }) {
	return (
		<DropdownMenuSubTrigger
			data-slot="menubar-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-3.5",
				className,
			)}
			{...props}
		/>
	);
}

function MenubarSubContent({ className = "", ...props }) {
	return (
		<DropdownMenuSubContent
			data-slot="menubar-sub-content"
			className={cn(
				"bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-48 rounded-lg p-1 shadow-md ring-1 duration-100",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Menubar,
	MenubarPortal,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarGroup,
	MenubarSeparator,
	MenubarLabel,
	MenubarItem,
	MenubarShortcut,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSub,
	MenubarSubTrigger,
	MenubarSubContent,
};

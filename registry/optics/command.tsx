"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogPopup,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/registry/optics/dialog";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { SearchIcon } from "lucide-react";

type CommandProps = Omit<
	React.ComponentProps<typeof CommandPrimitive>,
	"className"
> & {
	className?: string;
};
type CommandDialogProps = Omit<
	React.ComponentProps<typeof Dialog>,
	"children"
> & {
	title?: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	showCloseButton?: boolean;
};

function Command({ className = "", ...props }: CommandProps) {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(
				"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-2xl",
				className,
			)}
			{...props}
		/>
	);
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children = null,
	className = "",
	showCloseButton = false,
	...props
}: CommandDialogProps) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogPopup
				className={cn("overflow-hidden", className)}
				showCloseButton={showCloseButton}
				containerClassName="p-0"
			>
				<Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogPopup>
		</Dialog>
	);
}

function CommandInput({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Input>, "className"> & {
	className?: string;
}) {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-9 items-center gap-2 border-b px-3 bg-background"
		>
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			<CommandPrimitive.Input
				data-slot="command-input"
				className={cn(
					"placeholder:text-muted-foreground flex h-10 w-full rounded-xl bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CommandList({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.List>, "className"> & {
	className?: string;
}) {
	return (
		<ScrollArea
			className={cn("max-h-[300px]", className)}
			viewportClassName="scroll-py-1"
		>
			<CommandPrimitive.List
				data-slot="command-list"
				className="overflow-x-hidden"
				{...props}
			/>
		</ScrollArea>
	);
}

function CommandEmpty(
	props: React.ComponentProps<typeof CommandPrimitive.Empty>,
) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className="py-6 text-center text-sm"
			{...props}
		/>
	);
}

function CommandGroup({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Group>, "className"> & {
	className?: string;
}) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className,
			)}
			{...props}
		/>
	);
}

function CommandSeparator({
	className = "",
	...props
}: Omit<
	React.ComponentProps<typeof CommandPrimitive.Separator>,
	"className"
> & {
	className?: string;
}) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn("bg-border -mx-1 h-px", className)}
			{...props}
		/>
	);
}

function CommandItem({
	className = "",
	...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Item>, "className"> & {
	className?: string;
}) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}

function CommandShortcut({
	className = "",
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(
				"text-muted-foreground ml-auto text-xs tracking-widest",
				className,
			)}
			{...props}
		/>
	);
}

Command.displayName = "Command";
CommandDialog.displayName = "CommandDialog";
CommandInput.displayName = "CommandInput";
CommandList.displayName = "CommandList";
CommandEmpty.displayName = "CommandEmpty";
CommandGroup.displayName = "CommandGroup";
CommandItem.displayName = "CommandItem";
CommandShortcut.displayName = "CommandShortcut";
CommandSeparator.displayName = "CommandSeparator";

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
};

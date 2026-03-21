"use client";

import * as React from "react";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

import { cn } from "@/lib/utils";
import { ChevronRightIcon, CheckIcon, CircleIcon } from "lucide-react";

type ContextMenuProps = React.ComponentProps<typeof ContextMenuPrimitive.Root>;
type ContextMenuPortalProps = React.ComponentProps<
	typeof ContextMenuPrimitive.Portal
>;
type ContextMenuTriggerProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.Trigger>,
	"className"
> & {
	className?: string;
};
type ContextMenuContentProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.Popup>,
	"className"
> & {
	className?: string;
	align?: React.ComponentProps<typeof ContextMenuPrimitive.Positioner>["align"];
	alignOffset?: React.ComponentProps<
		typeof ContextMenuPrimitive.Positioner
	>["alignOffset"];
	side?: React.ComponentProps<typeof ContextMenuPrimitive.Positioner>["side"];
	sideOffset?: React.ComponentProps<
		typeof ContextMenuPrimitive.Positioner
	>["sideOffset"];
};
type ContextMenuGroupProps = React.ComponentProps<
	typeof ContextMenuPrimitive.Group
>;
type ContextMenuLabelProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.GroupLabel>,
	"className"
> & {
	className?: string;
	inset?: boolean;
};
type ContextMenuItemVariant = "default" | "destructive";
type ContextMenuItemProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.Item>,
	"className"
> & {
	className?: string;
	inset?: boolean;
	variant?: ContextMenuItemVariant;
};
type ContextMenuSubProps = React.ComponentProps<
	typeof ContextMenuPrimitive.SubmenuRoot
>;
type ContextMenuSubTriggerProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.SubmenuTrigger>,
	"className" | "children"
> & {
	className?: string;
	inset?: boolean;
	children?: React.ReactNode;
};
type ContextMenuCheckboxItemProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
};
type ContextMenuRadioGroupProps = React.ComponentProps<
	typeof ContextMenuPrimitive.RadioGroup
>;
type ContextMenuRadioItemProps = Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
};

function ContextMenu(props: ContextMenuProps) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal(props: ContextMenuPortalProps) {
	return (
		<ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
	);
}

function ContextMenuTrigger({
	className = "",
	...props
}: ContextMenuTriggerProps) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			className={cn("select-none", className)}
			{...props}
		/>
	);
}

function ContextMenuContent({
	className = "",
	align = "start",
	alignOffset = 4,
	side = "right",
	sideOffset = 0,
	...props
}: ContextMenuContentProps) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Positioner
				className="isolate z-50 outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<ContextMenuPrimitive.Popup
					data-slot="context-menu-content"
					className={cn(
						"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none",
						className,
					)}
					{...props}
				/>
			</ContextMenuPrimitive.Positioner>
		</ContextMenuPrimitive.Portal>
	);
}

function ContextMenuGroup(props: ContextMenuGroupProps) {
	return (
		<ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
	);
}

function ContextMenuLabel({
	className = "",
	inset = false,
	...props
}: ContextMenuLabelProps) {
	return (
		<ContextMenuPrimitive.Group>
			<ContextMenuPrimitive.GroupLabel
				data-slot="context-menu-label"
				data-inset={inset}
				className={cn(
					"text-muted-foreground px-2 py-1.5 text-xs data-[inset]:pl-8",
					className,
				)}
				{...props}
			/>
		</ContextMenuPrimitive.Group>
	);
}

function ContextMenuItem({
	className = "",
	inset = false,
	variant = "default",
	...props
}: ContextMenuItemProps) {
	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5 group/context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

function ContextMenuSub(props: ContextMenuSubProps) {
	return (
		<ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
	);
}

function ContextMenuSubTrigger({
	className = "",
	inset = false,
	children = null,
	...props
}: ContextMenuSubTriggerProps) {
	return (
		<ContextMenuPrimitive.SubmenuTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground min-h-7 gap-2 rounded-md px-2 py-1 text-xs [&_svg:not([class*='size-'])]:size-3.5 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="ml-auto" />
		</ContextMenuPrimitive.SubmenuTrigger>
	);
}

function ContextMenuSubContent(props: ContextMenuContentProps) {
	return (
		<ContextMenuContent
			data-slot="context-menu-sub-content"
			className="shadow-lg"
			side="right"
			{...props}
		/>
	);
}

function ContextMenuCheckboxItem({
	className = "",
	children = null,
	checked = undefined,
	...props
}: ContextMenuCheckboxItemProps) {
	return (
		<ContextMenuPrimitive.CheckboxItem
			data-slot="context-menu-checkbox-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground min-h-7 gap-2 rounded-md py-1.5 pl-8 pr-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				"relative",
				className,
			)}
			checked={checked}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.CheckboxItemIndicator>
					<CheckIcon />
				</ContextMenuPrimitive.CheckboxItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.CheckboxItem>
	);
}

function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
	return (
		<ContextMenuPrimitive.RadioGroup
			data-slot="context-menu-radio-group"
			{...props}
		/>
	);
}

function ContextMenuRadioItem({
	className = "",
	children = null,
	...props
}: ContextMenuRadioItemProps) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground min-h-7 gap-2 rounded-md py-1.5 pl-8 pr-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 relative flex cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				"relative",
				className,
			)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
				<ContextMenuPrimitive.RadioItemIndicator>
					<CircleIcon className="size-2 fill-current" />
				</ContextMenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}

function ContextMenuSeparator({
	className = "",
	...props
}: Omit<
	React.ComponentProps<typeof ContextMenuPrimitive.Separator>,
	"className"
> & {
	className?: string;
}) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("bg-border/50 -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function ContextMenuShortcut({
	className = "",
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="context-menu-shortcut"
			className={cn(
				"text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto text-[0.625rem] tracking-widest",
				className,
			)}
			{...props}
		/>
	);
}

ContextMenu.displayName = "ContextMenu";
ContextMenuTrigger.displayName = "ContextMenuTrigger";
ContextMenuContent.displayName = "ContextMenuContent";
ContextMenuItem.displayName = "ContextMenuItem";
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
ContextMenuLabel.displayName = "ContextMenuLabel";
ContextMenuSeparator.displayName = "ContextMenuSeparator";
ContextMenuShortcut.displayName = "ContextMenuShortcut";
ContextMenuGroup.displayName = "ContextMenuGroup";
ContextMenuPortal.displayName = "ContextMenuPortal";
ContextMenuSub.displayName = "ContextMenuSub";
ContextMenuSubContent.displayName = "ContextMenuSubContent";
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

export {
	ContextMenu,
	ContextMenuTrigger,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuCheckboxItem,
	ContextMenuRadioItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuGroup,
	ContextMenuPortal,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuRadioGroup,
};

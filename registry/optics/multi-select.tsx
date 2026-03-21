"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Badge } from "@/registry/optics/badge";
import { Checkbox } from "@/registry/optics/checkbox";
import { buttonVariants } from "@/registry/optics/button";
import { cn } from "@/registry/optics/lib/utils";

type ButtonVariantOptions = NonNullable<Parameters<typeof buttonVariants>[0]>;
type MultiSelectValue = {
	value: string;
	checked: boolean;
};

type MultiSelectContextValue = {
	values: Record<string, boolean>;
	setValue: (value: string, checked: boolean) => void;
	itemCount: number;
	colors: Record<string, string>;
	registerItem: (value: string) => void;
	registerColor: (value: string, color?: string) => void;
};

type MultiSelectRootProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.Root>,
	"children"
> & {
	onValuesChange?: (values: MultiSelectValue[]) => void;
	children?: React.ReactNode;
};

type MultiSelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>;

type MultiSelectValueProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.Value>,
	"children"
> & {
	children?: React.ReactNode;
	placeholder?: React.ReactNode;
};

type MultiSelectTriggerProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.Trigger>,
	"className" | "children"
> & {
	className?: string;
	size?: "default" | "sm";
	variant?: ButtonVariantOptions["variant"];
	children?: React.ReactNode;
};

type MultiSelectContentProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.Popup>,
	"className" | "children"
> & {
	className?: string;
	children?: React.ReactNode;
	side?: React.ComponentProps<typeof SelectPrimitive.Positioner>["side"];
};

type MultiSelectLabelProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.GroupLabel>,
	"className"
> & {
	className?: string;
};

type MultiSelectItemProps = React.ComponentProps<"div"> & {
	value: string;
	color?: string;
	children?: React.ReactNode;
};

type MultiSelectSeparatorProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.Separator>,
	"className"
> & {
	className?: string;
};

type MultiSelectScrollArrowProps = Omit<
	React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
	"className"
> & {
	className?: string;
};

const MultiSelectContext = React.createContext<MultiSelectContextValue>({
	values: {},
	setValue: () => {},
	itemCount: 0,
	colors: {},
	registerItem: () => {},
	registerColor: () => {},
});

function Select({
	onValuesChange = undefined,
	onOpenChange = undefined,
	children = null,
	...props
}: MultiSelectRootProps) {
	const [values, setValues] = React.useState<Record<string, boolean>>({});
	const [colors, setColors] = React.useState<Record<string, string>>({});
	const [open, setOpen] = React.useState(false);
	const registeredItemsRef = React.useRef(new Set<string>());

	const registerItem = React.useCallback((value: string) => {
		if (!value || registeredItemsRef.current.has(value)) return;

		registeredItemsRef.current.add(value);
		setValues((prev) => (value in prev ? prev : { ...prev, [value]: false }));
	}, []);

	const registerColor = React.useCallback((value: string, color?: string) => {
		if (!value || !color) return;
		setColors((prev) => ({ ...prev, [value]: color }));
	}, []);

	const setValue = React.useCallback(
		(value: string, checked: boolean) => {
			setValues((prev) => {
				const nextValues = { ...prev, [value]: checked };
				onValuesChange?.(
					Object.entries(nextValues).map(([entryValue, isChecked]) => ({
						value: entryValue,
						checked: isChecked,
					})),
				);
				return nextValues;
			});
		},
		[onValuesChange],
	);

	const handleOpenChange = React.useCallback(
		(
			nextOpen: boolean,
			eventDetails: Parameters<
				NonNullable<
					React.ComponentProps<typeof SelectPrimitive.Root>["onOpenChange"]
				>
			>[1],
		) => {
			setOpen(nextOpen);
			onOpenChange?.(nextOpen, eventDetails);
		},
		[onOpenChange],
	);

	const contextValue = React.useMemo(
		() => ({
			values,
			setValue,
			registerItem,
			itemCount: registeredItemsRef.current.size,
			colors,
			registerColor,
		}),
		[colors, registerColor, registerItem, setValue, values],
	);

	return (
		<MultiSelectContext.Provider value={contextValue}>
			<SelectPrimitive.Root
				data-slot="select"
				open={open}
				onOpenChange={handleOpenChange}
				{...props}
			>
				{children}
			</SelectPrimitive.Root>
		</MultiSelectContext.Provider>
	);
}

function SelectGroup({ children = null, ...props }: MultiSelectGroupProps) {
	return (
		<SelectPrimitive.Group data-slot="select-group" {...props}>
			{children}
		</SelectPrimitive.Group>
	);
}

function SelectValue({
	children = null,
	placeholder = null,
	...props
}: MultiSelectValueProps) {
	return (
		<SelectPrimitive.Value data-slot="select-value" {...props}>
			{children ?? placeholder}
		</SelectPrimitive.Value>
	);
}

function SelectTrigger({
	className = "",
	size = "default",
	children = null,
	variant = undefined,
	...props
}: MultiSelectTriggerProps) {
	const { values, colors, itemCount } = React.useContext(MultiSelectContext);

	const selectedItems = React.useMemo(
		() =>
			Object.entries(values)
				.filter(([, checked]) => checked)
				.map(([value]) => ({
					value,
					color: colors[value] || "bg-gray-200",
				})),
		[colors, values],
	);

	const selectedCount = selectedItems.length;

	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit min-w-3xs items-center justify-between gap-2 rounded-lg border bg-transparent px-4 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
				variant &&
					buttonVariants({
						variant,
						size: "icon-lg",
						animation: "colors",
					}),
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2 flex-1 min-w-0">
				{selectedCount > 0 && (
					<div className="flex items-center -space-x-0.25 -ml-1">
						{selectedItems.map((item, index) => (
							<Badge
								key={item.value}
								className={cn(
									"rounded-full squircle-none aspect-square size-3 p-0 border border-background -ml-1 first:ml-0",
									item.color,
								)}
								style={{ zIndex: selectedItems.length - index }}
							/>
						))}
					</div>
				)}
				{children}
			</div>
			{itemCount > 0 && (
				<span className="text-xs text-muted-foreground ml-2 shrink-0">
					{selectedCount}/{itemCount}
				</span>
			)}
			<SelectPrimitive.Icon
				render={<ChevronDownIcon className="size-4 opacity-50 shrink-0" />}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className = "",
	children = null,
	side = "bottom",
	...props
}: MultiSelectContentProps) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={4}
				className="isolate z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					className={cn(
						"bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--available-height) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border shadow-md",
						className,
					)}
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List className="p-1">
						{children}
					</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({ className = "", ...props }: MultiSelectLabelProps) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn("text-muted-foreground p-1.5 text-xs", className)}
			{...props}
		/>
	);
}

function SelectItem({
	className = "",
	children = null,
	value,
	color = undefined,
	...props
}: MultiSelectItemProps) {
	const { values, setValue, registerItem, registerColor } =
		React.useContext(MultiSelectContext);
	const [isHoveringCheckbox, setIsHoveringCheckbox] = React.useState(false);
	const [isHoveringText, setIsHoveringText] = React.useState(false);

	React.useEffect(() => {
		registerItem(value);
	}, [registerItem, value]);

	React.useEffect(() => {
		registerColor(value, color);
	}, [color, registerColor, value]);

	const checked = values[value] ?? false;
	const allChecked = Object.values(values).every((entry) => entry === true);
	const someChecked = Object.values(values).some((entry) => entry === true);
	const noneChecked = !someChecked;

	const getActionText = () => {
		if (checked && isHoveringCheckbox) return "Uncheck";
		if (noneChecked && (isHoveringCheckbox || isHoveringText)) return "Check";
		if (someChecked && !checked && isHoveringCheckbox) return "Check";
		if (!checked && someChecked && isHoveringText) return "Only";
		if (checked && allChecked && isHoveringText) return "Only";
		if (checked && someChecked && !allChecked && isHoveringText)
			return "Check All";
		return "";
	};

	const handleCheckboxClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setValue(value, !checked);
	};

	const handleTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();

		if (checked && someChecked && !allChecked && isHoveringText) {
			Object.keys(values).forEach((key) => {
				setValue(key, true);
			});
			return;
		}

		if (
			isHoveringText &&
			((!checked && someChecked) || (checked && allChecked))
		) {
			Object.keys(values).forEach((key) => {
				setValue(key, key === value);
			});
			return;
		}

		setValue(value, true);
	};

	return (
		<div className="w-full min-w-0 flex items-center gap-0.5 group overflow-hidden">
			<div
				className={cn(
					buttonVariants({
						variant: "ghost",
						size: "icon",
						animation: "none",
						className: "hover:bg-accent/75",
					}),
					"aspect-square [&_svg]:!size-3.5 shrink-0",
				)}
				onClick={handleCheckboxClick}
				onMouseEnter={() => setIsHoveringCheckbox(true)}
				onMouseLeave={() => setIsHoveringCheckbox(false)}
			>
				<Checkbox checked={checked} />
			</div>

			<div
				className={cn(
					buttonVariants({
						variant: "ghost",
						animation: "none",
						className: "hover:bg-accent/75",
					}),
					"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center justify-between gap-2 flex-1 min-w-0 cursor-pointer rounded-lg py-1.5 pr-2 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 overflow-hidden",
					className,
				)}
				onClick={handleTextClick}
				onMouseEnter={() => setIsHoveringText(true)}
				onMouseLeave={() => setIsHoveringText(false)}
				{...props}
			>
				<div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
					<Badge
						className={cn(
							"rounded-full squircle-none aspect-square size-3 p-0 bg-gray-200 border border-background shrink-0",
							color,
						)}
					/>
					<span className="truncate min-w-0">{children}</span>
				</div>

				<div className="flex items-center justify-center text-xs text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-50 shrink-0 ml-1">
					{getActionText()}
				</div>
			</div>
		</div>
	);
}

function SelectSeparator({
	className = "",
	...props
}: MultiSelectSeparatorProps) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className = "",
	...props
}: MultiSelectScrollArrowProps) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownButton({
	className = "",
	...props
}: MultiSelectScrollArrowProps) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownArrow>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};

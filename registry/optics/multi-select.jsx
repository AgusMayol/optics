"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button, buttonVariants } from "@/registry/optics/button";
import { cn } from "@/registry/optics/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Checkbox } from "@/registry/optics/checkbox";

// Contexto para compartir el estado de selección entre todos los items
const MultiSelectContext = React.createContext({
	values: {},
	setValue: () => { },
	onValuesChange: () => { },
	itemCount: 0,
	colors: {},
	registerColor: () => { },
});

function Select({
	onValuesChange = undefined,
	onOpenChange = undefined,
	...props
}) {
	const [values, setValues] = React.useState({});
	const [colors, setColors] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const registeredItemsRef = React.useRef(new Set());

	// Función para registrar un item
	const registerItem = React.useCallback((value) => {
		if (value && !registeredItemsRef.current.has(value)) {
			registeredItemsRef.current.add(value);
			setValues((prev) => {
				if (!(value in prev)) {
					return { ...prev, [value]: false };
				}
				return prev;
			});
		}
	}, []);

	// Función para registrar el color de un item
	const registerColor = React.useCallback((value, color) => {
		if (value) {
			setColors((prev) => ({ ...prev, [value]: color }));
		}
	}, []);

	// Función para actualizar un valor
	const setValue = React.useCallback(
		(value, checked) => {
			setValues((prev) => {
				const newValues = { ...prev, [value]: checked };
				// Llamar al callback con el array de valores
				if (onValuesChange) {
					const valuesArray = Object.entries(newValues).map(([key, val]) => ({
						value: key,
						checked: val,
					}));
					onValuesChange(valuesArray);
				}
				return newValues;
			});
		},
		[onValuesChange],
	);

	const handleOpenChange = React.useCallback(
		(newOpen) => {
			setOpen(newOpen);
			if (onOpenChange) {
				onOpenChange(newOpen);
			}
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
		[values, setValue, registerItem, colors, registerColor],
	);

	return (
		<MultiSelectContext.Provider value={contextValue}>
			<SelectPrimitive.Root
				data-slot="select"
				open={open}
				onOpenChange={handleOpenChange}
				{...props}
			/>
		</MultiSelectContext.Provider>
	);
}

function SelectGroup({ ...props } = {}) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props } = {}) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className = "",
	size = "default",
	children = null,
	variant = undefined,
	...props
}) {
	const { values, colors, itemCount } = React.useContext(MultiSelectContext);

	// Obtener los items seleccionados con sus colores
	const selectedItems = React.useMemo(() => {
		return Object.entries(values)
			.filter(([_, checked]) => checked)
			.map(([value, _]) => ({
				value,
				color: colors[value] || "bg-gray-200",
			}));
	}, [values, colors]);

	const selectedCount = selectedItems.length;
	const totalCount = itemCount;

	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit min-w-3xs items-center justify-between gap-2 rounded-lg border bg-transparent px-4 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
				buttonVariants({
					variant: variant,
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
								style={{
									zIndex: selectedItems.length - index,
								}}
							/>
						))}
					</div>
				)}
				{children}
			</div>
			{totalCount > 0 && (
				<span className="text-xs text-muted-foreground ml-2 shrink-0">
					{selectedCount}/{totalCount}
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
}) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner side={side} sideOffset={4} className="isolate z-50">
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

function SelectLabel({ className = "", ...props }) {
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
}) {
	const { values, setValue, registerItem, registerColor } =
		React.useContext(MultiSelectContext);
	const [isHoveringCheckbox, setIsHoveringCheckbox] = React.useState(false);
	const [isHoveringText, setIsHoveringText] = React.useState(false);

	// Registrar el item cuando se monta
	React.useEffect(() => {
		if (value) {
			registerItem(value);
		}
	}, [value, registerItem]);

	// Registrar el color cuando se monta o cambia
	React.useEffect(() => {
		if (value && color) {
			registerColor(value, color);
		}
	}, [value, color, registerColor]);

	const checked = value ? (values[value] ?? false) : false;

	// Calcular estados
	const allChecked = Object.values(values).every((v) => v === true);
	const someChecked = Object.values(values).some((v) => v === true);
	const noneChecked = !someChecked;

	// Determinar qué texto mostrar según los comentarios
	const getActionText = () => {
		if (checked && isHoveringCheckbox) return "Uncheck";
		if (noneChecked && (isHoveringCheckbox || isHoveringText)) return "Check";
		if (someChecked && !checked && isHoveringCheckbox) return "Check";
		if (!checked && someChecked && isHoveringText) return "Only";
		if (checked && allChecked && isHoveringText) return "Only";
		if (checked && someChecked && !allChecked && isHoveringText) return "Check All";
		return "";
	};

	const handleCheckboxClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (value) {
			setValue(value, !checked);
		}
	};

	const handleTextClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (!value) return;

		if (checked && someChecked && !allChecked && isHoveringText) {
			Object.keys(values).forEach((key) => {
				setValue(key, true);
			});
		} else if (
			isHoveringText &&
			((!checked && someChecked) || (checked && allChecked))
		) {
			Object.keys(values).forEach((key) => {
				setValue(key, key === value);
			});
		} else {
			setValue(value, true);
		}
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
						size: "",
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

function SelectSeparator({ className, ...props }) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({ className, ...props }) {
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

function SelectScrollDownButton({ className, ...props }) {
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


Select.displayName = "MultiSelect";
SelectContent.displayName = "MultiSelectContent";
SelectGroup.displayName = "MultiSelectGroup";
SelectItem.displayName = "MultiSelectItem";
SelectLabel.displayName = "MultiSelectLabel";
SelectScrollDownButton.displayName = "MultiSelectScrollDownButton";
SelectScrollUpButton.displayName = "MultiSelectScrollUpButton";
SelectSeparator.displayName = "MultiSelectSeparator";
SelectTrigger.displayName = "MultiSelectTrigger";
SelectValue.displayName = "MultiSelectValue";

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


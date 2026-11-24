"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogPopup,
	DialogTitle,
} from "@/registry/optics/dialog";
import { ScrollArea } from "@/registry/optics/scroll-area";

interface CommandContextValue {
	search: string;
	setSearch: (value: string) => void;
	setActiveElement: (el: HTMLElement | null) => void;
	autoFocusInput: boolean;
	shouldFilter: boolean;
	filter?: (value: string, search: string, keywords?: string[]) => number;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);
const CommandDialogContext = React.createContext<boolean>(false);

function useCommandContext(): CommandContextValue {
	const context = React.useContext(CommandContext);
	if (!context) {
		throw new Error("Command components must be used within <Command />.");
	}
	return context;
}

function getNodeText(node: React.ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}
	if (Array.isArray(node)) {
		return node.map(getNodeText).join(" ");
	}
	if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
		return getNodeText(node.props.children);
	}
	return "";
}

function defaultCommandFilter(value: string, search: string, keywords?: string[]): number {
	const normalizedSearch = search.trim().toLowerCase();
	if (!normalizedSearch) {
		return 1;
	}
	const haystack = `${value} ${(keywords ?? []).join(" ")}`.toLowerCase();
	const terms = normalizedSearch.split(/\s+/).filter(Boolean);
	return terms.every((term) => haystack.includes(term)) ? 1 : 0;
}

export type CommandProps = Omit<React.ComponentProps<"div">, "onChange"> & {
	shouldFilter?: boolean;
	filter?: (value: string, search: string, keywords?: string[]) => number;
	loop?: boolean;
};

function Command({
	className = "",
	children,
	shouldFilter = true,
	filter,
	loop = true,
	onKeyDown,
	...props
}: CommandProps) {
	const [search, setSearchState] = React.useState("");
	const rootRef = React.useRef<HTMLDivElement>(null);
	const activeElementRef = React.useRef<HTMLElement | null>(null);
	const autoFocusInput = React.useContext(CommandDialogContext);

	const getEnabledItems = React.useCallback((): HTMLElement[] => {
		if (!rootRef.current) {
			return [];
		}
		return Array.from(
			rootRef.current.querySelectorAll<HTMLElement>(
				'[data-slot="command-item"]:not([data-disabled="true"])',
			),
		);
	}, []);

	const setActiveElement = React.useCallback((nextEl: HTMLElement | null) => {
		if (!rootRef.current) {
			return;
		}
		const prevSelected = rootRef.current.querySelectorAll<HTMLElement>(
			'[data-slot="command-item"][data-selected="true"]',
		);
		for (const item of prevSelected) {
			if (item !== nextEl) {
				item.removeAttribute("data-selected");
				item.setAttribute("aria-selected", "false");
			}
		}
		if (nextEl && nextEl.getAttribute("data-disabled") !== "true") {
			nextEl.setAttribute("data-selected", "true");
			nextEl.setAttribute("aria-selected", "true");
			activeElementRef.current = nextEl;
			const input = rootRef.current.querySelector<HTMLInputElement>('[data-slot="command-input"]');
			if (input && nextEl.id) {
				input.setAttribute("aria-activedescendant", nextEl.id);
			}
		} else {
			activeElementRef.current = null;
			const input = rootRef.current.querySelector<HTMLInputElement>('[data-slot="command-input"]');
			input?.removeAttribute("aria-activedescendant");
		}
	}, []);

	const setSearch = React.useCallback((value: string) => {
		setSearchState(value);
	}, []);

	React.useEffect(() => {
		const items = getEnabledItems();
		const current = activeElementRef.current;
		if (!current || !items.includes(current)) {
			setActiveElement(items[0] ?? null);
		}
	}, [search, getEnabledItems, setActiveElement]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		onKeyDown?.(event);
		if (event.defaultPrevented) {
			return;
		}
		const items = getEnabledItems();
		if (items.length === 0) {
			return;
		}
		const currentIndex = activeElementRef.current ? items.indexOf(activeElementRef.current) : -1;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			const nextIndex =
				currentIndex === -1
					? 0
					: loop
						? (currentIndex + 1) % items.length
						: Math.min(currentIndex + 1, items.length - 1);
			const nextItem = items[nextIndex] ?? null;
			setActiveElement(nextItem);
			nextItem?.scrollIntoView({ block: "nearest" });
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			const prevIndex = currentIndex <= 0 ? (loop ? items.length - 1 : 0) : currentIndex - 1;
			const prevItem = items[prevIndex] ?? null;
			setActiveElement(prevItem);
			prevItem?.scrollIntoView({ block: "nearest" });
		} else if (event.key === "Home") {
			event.preventDefault();
			const firstItem = items[0] ?? null;
			setActiveElement(firstItem);
			firstItem?.scrollIntoView({ block: "nearest" });
		} else if (event.key === "End") {
			event.preventDefault();
			const lastItem = items[items.length - 1] ?? null;
			setActiveElement(lastItem);
			lastItem?.scrollIntoView({ block: "nearest" });
		} else if (event.key === "Enter") {
			const targetItem =
				activeElementRef.current && items.includes(activeElementRef.current)
					? activeElementRef.current
					: (items[0] ?? null);
			if (targetItem) {
				event.preventDefault();
				targetItem.click();
			}
		}
	};

	const contextValue: CommandContextValue = {
		search,
		setSearch,
		setActiveElement,
		autoFocusInput,
		shouldFilter,
		filter,
	};

	return (
		<CommandContext.Provider value={contextValue}>
			<div
				ref={rootRef}
				data-slot="command"
				onKeyDown={handleKeyDown}
				className={cn(
					"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-2xl",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</CommandContext.Provider>
	);
}

export type CommandDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
	title?: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
	showCloseButton?: boolean;
};

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
				<CommandDialogContext.Provider value>
					<Command className="[&_[data-slot=command-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group]]:px-2 [&_[data-slot=command-group]:not([hidden])_~[data-slot=command-group]]:pt-0 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3 [&_[data-slot=command-item]_svg]:h-5 [&_[data-slot=command-item]_svg]:w-5">
						{children}
					</Command>
				</CommandDialogContext.Provider>
			</DialogPopup>
		</Dialog>
	);
}

export type CommandInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
	value?: string;
	onValueChange?: (search: string) => void;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function CommandInput({
	className = "",
	value: controlledValue,
	onValueChange,
	onChange,
	autoFocus,
	...props
}: CommandInputProps) {
	const { search, setSearch, autoFocusInput } = useCommandContext();
	const currentValue = controlledValue ?? search;

	React.useEffect(() => {
		if (controlledValue !== undefined && controlledValue !== search) {
			setSearch(controlledValue);
		}
	}, [controlledValue, search, setSearch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.value;
		if (controlledValue === undefined) {
			setSearch(nextValue);
		}
		onValueChange?.(nextValue);
		onChange?.(event);
	};

	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-9 items-center gap-2 border-b px-3 bg-background"
		>
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			<input
				data-slot="command-input"
				role="combobox"
				aria-expanded
				aria-autocomplete="list"
				autoComplete="off"
				autoCorrect="off"
				spellCheck={false}
				autoFocus={autoFocus ?? autoFocusInput}
				value={currentValue}
				onChange={handleChange}
				className={cn(
					"placeholder:text-muted-foreground flex h-10 w-full rounded-xl bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

export type CommandListProps = React.ComponentProps<"div">;

function CommandList({ className = "", children, ...props }: CommandListProps) {
	return (
		<ScrollArea
			className={cn(
				"max-h-[300px] [&:has([data-slot=command-item])_[data-slot=command-empty]]:hidden",
				className,
			)}
			viewportClassName="scroll-py-1"
		>
			<div data-slot="command-list" role="listbox" className="overflow-x-hidden" {...props}>
				{children}
			</div>
		</ScrollArea>
	);
}

export type CommandEmptyProps = React.ComponentProps<"div">;

function CommandEmpty({ className = "", ...props }: CommandEmptyProps) {
	return (
		<div
			data-slot="command-empty"
			role="presentation"
			className={cn("py-6 text-center text-sm", className)}
			{...props}
		/>
	);
}

export type CommandGroupProps = React.ComponentProps<"div"> & {
	heading?: React.ReactNode;
};

function CommandGroup({ className = "", heading, children, ...props }: CommandGroupProps) {
	const headingId = React.useId();

	return (
		<div
			data-slot="command-group"
			role="group"
			aria-labelledby={heading ? headingId : undefined}
			className={cn(
				"text-foreground overflow-hidden p-1 [&:not(:has([data-slot=command-item]))]:hidden",
				className,
			)}
			{...props}
		>
			{heading && (
				<div
					id={headingId}
					data-slot="command-group-heading"
					className="text-muted-foreground px-2 py-1.5 text-xs font-medium"
				>
					{heading}
				</div>
			)}
			<div data-slot="command-group-items">{children}</div>
		</div>
	);
}

export type CommandSeparatorProps = React.ComponentProps<typeof SeparatorPrimitive>;

function CommandSeparator({ className = "", ...props }: CommandSeparatorProps) {
	return (
		<SeparatorPrimitive
			data-slot="command-separator"
			className={cn(
				"bg-border -mx-1 hidden h-px [[data-slot=command-group]:has([data-slot=command-item])~&:has(~[data-slot=command-group]:has([data-slot=command-item]))]:block",
				className,
			)}
			{...props}
		/>
	);
}

export type CommandItemProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
	disabled?: boolean;
	value?: string;
	keywords?: string[];
	onSelect?: (value: string) => void;
};

function CommandItem({
	className = "",
	disabled = false,
	value,
	keywords,
	onSelect,
	onClick,
	onPointerMove,
	children,
	id,
	...props
}: CommandItemProps) {
	const { search, setActiveElement, shouldFilter, filter } = useCommandContext();
	const generatedId = React.useId();
	const itemId = id ?? generatedId;
	const resolvedValue = React.useMemo(
		() => (value ?? getNodeText(children)).trim(),
		[value, children],
	);

	const score = shouldFilter
		? (filter ?? defaultCommandFilter)(resolvedValue, search, keywords)
		: 1;

	if (score <= 0) {
		return null;
	}

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		onClick?.(event);
		if (event.defaultPrevented || disabled) {
			return;
		}
		onSelect?.(resolvedValue);
	};

	const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
		onPointerMove?.(event);
		if (!disabled) {
			setActiveElement(event.currentTarget);
		}
	};

	return (
		<div
			id={itemId}
			data-slot="command-item"
			role="option"
			aria-selected={false}
			aria-disabled={disabled || undefined}
			data-disabled={disabled ? "true" : undefined}
			data-value={resolvedValue}
			onClick={handleClick}
			onPointerMove={handlePointerMove}
			className={cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

function CommandShortcut({ className = "", ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
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

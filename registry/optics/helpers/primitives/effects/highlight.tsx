"use client";
import { AnimatePresence, motion, type Transition } from "motion/react";
import * as React from "react";

import { cn } from "@/registry/optics/lib/utils";

export type HighlightMode = "children" | "parent";

export type Bounds = {
	top: number;
	left: number;
	width: number;
	height: number;
};

type HighlightContextType<T extends string> = {
	as?: React.ElementType;
	mode: HighlightMode;
	activeValue: T | null;
	setActiveValue: (value: T | null) => void;
	setBounds: (bounds: DOMRect) => void;
	clearBounds: () => void;
	id: string;
	hover: boolean;
	click: boolean;
	className?: string;
	style?: React.CSSProperties;
	activeClassName?: string;
	setActiveClassName: (className: string) => void;
	transition?: Transition;
	disabled?: boolean;
	enabled?: boolean;
	exitDelay?: number;
	forceUpdateBounds?: boolean;
};

const HighlightContext = React.createContext<HighlightContextType<string> | undefined>(undefined);

function useHighlight<T extends string>(): HighlightContextType<T> {
	const context = React.useContext(HighlightContext);
	if (!context) {
		throw new Error("useHighlight must be used within a HighlightProvider");
	}
	return context as unknown as HighlightContextType<T>;
}

export type HighlightProps<T extends string = string> = {
	as?: React.ElementType;
	children?: React.ReactNode;
	value?: T | null;
	defaultValue?: T | null;
	onValueChange?: (value: T | null) => void;
	className?: string;
	style?: React.CSSProperties;
	transition?: Transition;
	hover?: boolean;
	click?: boolean;
	enabled?: boolean;
	controlledItems?: boolean;
	disabled?: boolean;
	exitDelay?: number;
	mode?: HighlightMode;
	boundsOffset?: Partial<Bounds>;
	containerClassName?: string;
	itemsClassName?: string;
	forceUpdateBounds?: boolean;
	ref?: React.Ref<HTMLElement | null>;
} & Record<string, unknown>;

function Highlight<T extends string = string>({ ref, ...props }: HighlightProps<T>) {
	const {
		as: Component = "div",
		children,
		value,
		defaultValue,
		onValueChange,
		className,
		style,
		transition = { type: "spring", stiffness: 350, damping: 35 },
		hover = false,
		click = true,
		enabled = true,
		controlledItems,
		disabled = false,
		exitDelay = 200,
		mode = "children",
		boundsOffset: boundsOffsetProp,
		containerClassName,
		itemsClassName,
		forceUpdateBounds,
	} = props;

	const localRef = React.useRef<HTMLElement | null>(null);
	React.useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => localRef.current);

	const [activeValue, setActiveValue] = React.useState<T | null>(value ?? defaultValue ?? null);
	const [boundsState, setBoundsState] = React.useState<Bounds | null>(null);
	const [activeClassNameState, setActiveClassNameState] = React.useState("");

	const safeSetActiveValue = React.useCallback(
		(id: T | null) => {
			setActiveValue((prev) => (prev === id ? prev : id));
			if (id !== activeValue) onValueChange?.(id);
		},
		[activeValue, onValueChange],
	);

	const safeSetBounds = React.useCallback(
		(bounds: DOMRect) => {
			if (!localRef.current) return;

			const boundsOffset = boundsOffsetProp ?? {
				top: 0,
				left: 0,
				width: 0,
				height: 0,
			};

			const containerRect = localRef.current.getBoundingClientRect();
			const newBounds: Bounds = {
				top: bounds.top - containerRect.top + (boundsOffset.top ?? 0),
				left: bounds.left - containerRect.left + (boundsOffset.left ?? 0),
				width: bounds.width + (boundsOffset.width ?? 0),
				height: bounds.height + (boundsOffset.height ?? 0),
			};

			setBoundsState((prev) => {
				if (
					prev &&
					prev.top === newBounds.top &&
					prev.left === newBounds.left &&
					prev.width === newBounds.width &&
					prev.height === newBounds.height
				) {
					return prev;
				}
				return newBounds;
			});
		},
		[boundsOffsetProp],
	);

	const clearBounds = React.useCallback(() => {
		setBoundsState((prev) => (prev === null ? prev : null));
	}, []);

	React.useEffect(() => {
		if (value !== undefined) setActiveValue(value);
		else if (defaultValue !== undefined) setActiveValue(defaultValue);
	}, [value, defaultValue]);

	const id = React.useId();

	React.useEffect(() => {
		if (mode !== "parent") return;
		const container = localRef.current;
		if (!container) return;

		const onScroll = () => {
			if (!activeValue) return;
			const activeEl = container.querySelector(
				`[data-value="${activeValue}"][data-highlight="true"]`,
			);
			if (activeEl) safeSetBounds(activeEl.getBoundingClientRect());
		};

		container.addEventListener("scroll", onScroll, { passive: true });
		return () => container.removeEventListener("scroll", onScroll);
	}, [mode, activeValue, safeSetBounds]);

	const render = React.useCallback(
		(node: React.ReactNode) => {
			if (mode === "parent") {
				return (
					<Component
						ref={localRef}
						data-slot="motion-highlight-container"
						style={{ position: "relative", zIndex: 1 }}
						className={containerClassName}
					>
						<AnimatePresence initial={false} mode="wait">
							{boundsState && (
								<motion.div
									data-slot="motion-highlight"
									animate={{
										top: boundsState.top,
										left: boundsState.left,
										width: boundsState.width,
										height: boundsState.height,
										opacity: 1,
									}}
									initial={{
										top: boundsState.top,
										left: boundsState.left,
										width: boundsState.width,
										height: boundsState.height,
										opacity: 0,
									}}
									exit={{
										opacity: 0,
										transition: {
											...transition,
											delay: (transition?.delay ?? 0) + (exitDelay ?? 0) / 1000,
										},
									}}
									transition={transition}
									style={{ position: "absolute", zIndex: 0, ...style }}
									className={cn(className, activeClassNameState)}
								/>
							)}
						</AnimatePresence>
						{node}
					</Component>
				);
			}

			return node;
		},
		[
			mode,
			Component,
			containerClassName,
			boundsState,
			transition,
			exitDelay,
			style,
			className,
			activeClassNameState,
		],
	);

	return (
		<HighlightContext.Provider
			value={{
				mode,
				activeValue,
				setActiveValue: safeSetActiveValue as (val: string | null) => void,
				id,
				hover,
				click,
				className,
				style,
				transition,
				disabled,
				enabled,
				exitDelay,
				setBounds: safeSetBounds,
				clearBounds,
				activeClassName: activeClassNameState,
				setActiveClassName: setActiveClassNameState,
				forceUpdateBounds,
			}}
		>
			{enabled
				? controlledItems
					? render(children)
					: render(
							React.Children.map(children, (child, index) => (
								<HighlightItem key={index} className={itemsClassName}>
									{child}
								</HighlightItem>
							)),
						)
				: children}
		</HighlightContext.Provider>
	);
}

function getNonOverridingDataAttributes(
	element: React.ReactElement<Record<string, unknown>>,
	dataAttributes: Record<string, unknown>,
): Record<string, unknown> {
	return Object.keys(dataAttributes).reduce<Record<string, unknown>>((acc, key) => {
		if (element.props[key] === undefined) {
			acc[key] = dataAttributes[key];
		}
		return acc;
	}, {});
}

export type HighlightItemProps = {
	ref?: React.Ref<HTMLElement | null>;
	as?: React.ElementType;
	children?: React.ReactNode;
	id?: string;
	value?: string;
	className?: string;
	style?: React.CSSProperties;
	transition?: Transition;
	disabled?: boolean;
	activeClassName?: string;
	exitDelay?: number;
	asChild?: boolean;
	forceUpdateBounds?: boolean;
} & Record<string, unknown>;

type ExtendedChildProps = React.HTMLAttributes<HTMLElement> & {
	"data-value"?: string;
	id?: string;
	ref?: React.Ref<HTMLElement | null>;
};

function HighlightItem({
	ref,
	as,
	children,
	id,
	value,
	className,
	style,
	transition,
	disabled = false,
	activeClassName,
	exitDelay,
	asChild = false,
	forceUpdateBounds,
	...props
}: HighlightItemProps) {
	const itemId = React.useId();
	const {
		activeValue,
		setActiveValue,
		mode,
		setBounds,
		clearBounds,
		hover,
		click,
		enabled,
		className: contextClassName,
		style: contextStyle,
		transition: contextTransition,
		id: contextId,
		disabled: contextDisabled,
		exitDelay: contextExitDelay,
		forceUpdateBounds: contextForceUpdateBounds,
		setActiveClassName,
	} = useHighlight();

	const Component = as ?? "div";
	const element = children as React.ReactElement<ExtendedChildProps>;
	const childValue =
		id ??
		value ??
		(React.isValidElement(element)
			? (element.props?.["data-value"] ?? element.props?.id)
			: undefined) ??
		itemId;
	const isActive = activeValue === childValue;
	const isDisabled = disabled === undefined ? contextDisabled : disabled;
	const itemTransition = transition ?? contextTransition;

	const localRef = React.useRef<HTMLElement | null>(null);
	React.useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => localRef.current);

	React.useEffect(() => {
		if (mode !== "parent") return;
		let rafId = 0;
		let previousBounds: DOMRect | null = null;
		const shouldUpdateBounds =
			forceUpdateBounds === true || (contextForceUpdateBounds && forceUpdateBounds !== false);

		const updateBounds = () => {
			if (!localRef.current) return;

			const bounds = localRef.current.getBoundingClientRect();

			if (shouldUpdateBounds) {
				if (
					previousBounds &&
					previousBounds.top === bounds.top &&
					previousBounds.left === bounds.left &&
					previousBounds.width === bounds.width &&
					previousBounds.height === bounds.height
				) {
					rafId = requestAnimationFrame(updateBounds);
					return;
				}
				previousBounds = bounds;
				rafId = requestAnimationFrame(updateBounds);
			}

			setBounds(bounds);
		};

		if (isActive) {
			updateBounds();
			setActiveClassName(activeClassName ?? "");
		} else if (!activeValue) {
			clearBounds();
		}

		if (shouldUpdateBounds) return () => cancelAnimationFrame(rafId);
	}, [
		mode,
		isActive,
		activeValue,
		setBounds,
		clearBounds,
		activeClassName,
		setActiveClassName,
		forceUpdateBounds,
		contextForceUpdateBounds,
	]);

	if (!React.isValidElement(children)) return children;

	const dataAttributes: Record<string, unknown> = {
		"data-active": isActive ? "true" : "false",
		"aria-selected": isActive,
		"data-disabled": isDisabled,
		"data-value": childValue,
		"data-highlight": true,
	};

	const commonHandlers = hover
		? {
				onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
					setActiveValue(childValue);
					element.props.onMouseEnter?.(e);
				},
				onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
					setActiveValue(null);
					element.props.onMouseLeave?.(e);
				},
			}
		: click
			? {
					onClick: (e: React.MouseEvent<HTMLElement>) => {
						setActiveValue(childValue);
						element.props.onClick?.(e);
					},
				}
			: {};

	if (asChild) {
		if (mode === "children") {
			return React.cloneElement(
				element,
				{
					key: childValue,
					ref: localRef,
					className: cn("relative", element.props.className),
					...getNonOverridingDataAttributes(
						element as React.ReactElement<Record<string, unknown>>,
						{
							...dataAttributes,
							"data-slot": "motion-highlight-item-container",
						},
					),
					...commonHandlers,
					...props,
				},
				<>
					<AnimatePresence initial={false} mode="wait">
						{isActive && !isDisabled && (
							<motion.div
								layoutId={`transition-background-${contextId}`}
								data-slot="motion-highlight"
								style={{
									position: "absolute",
									zIndex: 0,
									...contextStyle,
									...style,
								}}
								className={cn(contextClassName, activeClassName)}
								transition={itemTransition}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{
									opacity: 0,
									transition: {
										...itemTransition,
										delay:
											(itemTransition?.delay ?? 0) + (exitDelay ?? contextExitDelay ?? 0) / 1000,
									},
								}}
								{...dataAttributes}
							/>
						)}
					</AnimatePresence>

					<Component
						data-slot="motion-highlight-item"
						style={{ position: "relative", zIndex: 1 }}
						className={className}
						{...dataAttributes}
					>
						{children}
					</Component>
				</>,
			);
		}

		return React.cloneElement(element, {
			ref: localRef,
			...getNonOverridingDataAttributes(element as React.ReactElement<Record<string, unknown>>, {
				...dataAttributes,
				"data-slot": "motion-highlight-item",
			}),
			...commonHandlers,
		});
	}

	return enabled ? (
		<Component
			key={childValue}
			ref={localRef}
			data-slot="motion-highlight-item-container"
			className={cn(mode === "children" && "relative", className)}
			{...dataAttributes}
			{...props}
			{...commonHandlers}
		>
			{mode === "children" && (
				<AnimatePresence initial={false} mode="wait">
					{isActive && !isDisabled && (
						<motion.div
							layoutId={`transition-background-${contextId}`}
							data-slot="motion-highlight"
							style={{
								position: "absolute",
								zIndex: 0,
								...contextStyle,
								...style,
							}}
							className={cn(contextClassName, activeClassName)}
							transition={itemTransition}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{
								opacity: 0,
								transition: {
									...itemTransition,
									delay: (itemTransition?.delay ?? 0) + (exitDelay ?? contextExitDelay ?? 0) / 1000,
								},
							}}
							{...dataAttributes}
						/>
					)}
				</AnimatePresence>
			)}

			{React.cloneElement(element, {
				style: { position: "relative", zIndex: 1 },
				className: element.props.className,
				...getNonOverridingDataAttributes(element as React.ReactElement<Record<string, unknown>>, {
					...dataAttributes,
					"data-slot": "motion-highlight-item",
				}),
			})}
		</Component>
	) : (
		children
	);
}

export { Highlight, HighlightItem, useHighlight };

"use client";
import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/registry/optics/lib/utils";

type HighlightValue = string | number | null;
type HighlightBounds = {
	top: number;
	left: number;
	width: number;
	height: number;
};
type HighlightTransition = React.ComponentProps<
	typeof motion.div
>["transition"];
type HighlightDataAttributes = Record<string, unknown>;
type HighlightElement = React.ReactElement<Record<string, unknown>>;

type HighlightContextValue = {
	mode: "children" | "parent";
	activeValue: HighlightValue;
	setActiveValue: (value: HighlightValue) => void;
	id: string;
	hover: boolean;
	click: boolean;
	className?: string;
	style?: React.CSSProperties;
	transition?: HighlightTransition;
	disabled: boolean;
	enabled: boolean;
	exitDelay?: number;
	setBounds: (bounds: DOMRect | HighlightBounds) => void;
	clearBounds: () => void;
	activeClassName: string;
	setActiveClassName: React.Dispatch<React.SetStateAction<string>>;
	forceUpdateBounds?: boolean;
};

type HighlightProps = React.ComponentPropsWithoutRef<"div"> & {
	as?: React.ElementType;
	value?: HighlightValue;
	defaultValue?: HighlightValue;
	onValueChange?: (value: HighlightValue) => void;
	transition?: HighlightTransition;
	hover?: boolean;
	click?: boolean;
	enabled?: boolean;
	controlledItems?: boolean;
	disabled?: boolean;
	exitDelay?: number;
	mode?: "children" | "parent";
	boundsOffset?: Partial<HighlightBounds>;
	containerClassName?: string;
	itemsClassName?: string;
	forceUpdateBounds?: boolean;
};

type HighlightItemProps = React.ComponentPropsWithoutRef<"div"> & {
	as?: React.ElementType;
	children: HighlightElement;
	id?: HighlightValue;
	value?: HighlightValue;
	transition?: HighlightTransition;
	disabled?: boolean;
	activeClassName?: string;
	exitDelay?: number;
	asChild?: boolean;
	forceUpdateBounds?: boolean;
};

const HighlightContext = React.createContext<HighlightContextValue | undefined>(
	undefined,
);

function useHighlight() {
	const context = React.useContext(HighlightContext);
	if (!context) {
		throw new Error("useHighlight must be used within a HighlightProvider");
	}
	return context;
}

const Highlight = React.forwardRef<HTMLElement, HighlightProps>(
	function Highlight({ ...props }, ref) {
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
		} = props;

		const localRef = React.useRef<HTMLElement | null>(null);
		React.useImperativeHandle(ref, () => localRef.current as HTMLElement);

		const isControlled = value !== undefined;
		const [uncontrolledActiveValue, setUncontrolledActiveValue] =
			React.useState<HighlightValue>(defaultValue ?? null);
		const activeValue = isControlled ? value : uncontrolledActiveValue;
		const [boundsState, setBoundsState] =
			React.useState<HighlightBounds | null>(null);
		const [activeClassNameState, setActiveClassNameState] = React.useState("");

		const safeSetActiveValue = React.useCallback(
			(id: HighlightValue) => {
				if (!isControlled) {
					setUncontrolledActiveValue((prev) => (prev === id ? prev : id));
				}
				if (id !== activeValue) onValueChange?.(id);
			},
			[activeValue, isControlled, onValueChange],
		);

		const safeSetBounds = React.useCallback(
			(bounds: DOMRect | HighlightBounds) => {
				if (!localRef.current) return;

				const boundsOffset = props.boundsOffset ?? {
					top: 0,
					left: 0,
					width: 0,
					height: 0,
				};

				const containerRect = localRef.current.getBoundingClientRect();
				const newBounds = {
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
			[props],
		);

		const clearBounds = React.useCallback(() => {
			setBoundsState((prev) => (prev === null ? prev : null));
		}, []);

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
			(children: React.ReactNode) => {
				if (mode === "parent") {
					return (
						<Component
							ref={localRef}
							data-slot="motion-highlight-container"
							style={{ position: "relative", zIndex: 1 }}
							className={props.containerClassName}
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
												delay:
													((transition as { delay?: number } | undefined)
														?.delay ?? 0) +
													(exitDelay ?? 0) / 1000,
											},
										}}
										transition={transition}
										style={{ position: "absolute", zIndex: 0, ...style }}
										className={cn(className, activeClassNameState)}
									/>
								)}
							</AnimatePresence>
							{children}
						</Component>
					);
				}

				return children;
			},
			[
				mode,
				Component,
				props,
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
					setActiveValue: safeSetActiveValue,
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
					forceUpdateBounds: props.forceUpdateBounds,
				}}
			>
				{enabled
					? controlledItems
						? render(children)
						: render(
								React.Children.map(children, (child, index) => (
									<HighlightItem key={index} className={props?.itemsClassName}>
										{child as HighlightElement}
									</HighlightItem>
								)),
							)
					: children}
			</HighlightContext.Provider>
		);
	},
);

function getNonOverridingDataAttributes(
	element: HighlightElement,
	dataAttributes: HighlightDataAttributes,
) {
	return Object.keys(dataAttributes).reduce((acc, key) => {
		if (element.props[key] === undefined) {
			acc[key] = dataAttributes[key];
		}
		return acc;
	}, {} as HighlightDataAttributes);
}

const HighlightItem = React.forwardRef<HTMLElement, HighlightItemProps>(
	function HighlightItem(
		{
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
		},
		ref,
	) {
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
		const element = children;
		const childValue = (id ??
			value ??
			element.props["data-value"] ??
			element.props.id ??
			itemId) as HighlightValue;
		const isActive = activeValue === childValue;
		const isDisabled = disabled === undefined ? contextDisabled : disabled;
		const itemTransition = transition ?? contextTransition;

		const localRef = React.useRef<HTMLElement | null>(null);
		React.useImperativeHandle(ref, () => localRef.current as HTMLElement);

		React.useEffect(() => {
			if (mode !== "parent") return;
			let rafId = 0;
			let previousBounds: DOMRect | null = null;
			const shouldUpdateBounds =
				forceUpdateBounds === true ||
				(contextForceUpdateBounds && forceUpdateBounds !== false);

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
			} else if (!activeValue) clearBounds();

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

		const dataAttributes = {
			"data-active": isActive ? "true" : "false",
			"aria-selected": isActive,
			"data-disabled": isDisabled,
			"data-value": childValue,
			"data-highlight": true,
		};

		const commonHandlers = hover
			? {
					onMouseEnter: (e: React.MouseEvent<Element>) => {
						setActiveValue(childValue);
						(
							element.props as {
								onMouseEnter?: (event: React.MouseEvent<Element>) => void;
							}
						).onMouseEnter?.(e);
					},
					onMouseLeave: (e: React.MouseEvent<Element>) => {
						setActiveValue(null);
						(
							element.props as {
								onMouseLeave?: (event: React.MouseEvent<Element>) => void;
							}
						).onMouseLeave?.(e);
					},
				}
			: click
				? {
						onClick: (e: React.MouseEvent<Element>) => {
							setActiveValue(childValue);
							(
								element.props as {
									onClick?: (event: React.MouseEvent<Element>) => void;
								}
							).onClick?.(e);
						},
					}
				: {};

		if (asChild) {
			if (mode === "children") {
				return React.cloneElement(
					element,
					{
						key: childValue == null ? itemId : childValue,
						ref: localRef,
						className: cn(
							"relative",
							element.props.className as string | undefined,
						),
						...getNonOverridingDataAttributes(element, {
							...dataAttributes,
							"data-slot": "motion-highlight-item-container",
						}),
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
												(itemTransition?.delay ?? 0) +
												(exitDelay ?? contextExitDelay ?? 0) / 1000,
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
				...getNonOverridingDataAttributes(element, {
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
										delay:
											(itemTransition?.delay ?? 0) +
											(exitDelay ?? contextExitDelay ?? 0) / 1000,
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
					...getNonOverridingDataAttributes(element, {
						...dataAttributes,
						"data-slot": "motion-highlight-item",
					}),
				})}
			</Component>
		) : (
			children
		);
	},
);

export { Highlight, HighlightItem, useHighlight };

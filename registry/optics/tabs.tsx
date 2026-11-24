"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { motion, AnimatePresence, type HTMLMotionProps, type Transition } from "motion/react";

import {
	Highlight,
	HighlightItem,
	type HighlightProps,
	type HighlightItemProps,
} from "@/registry/optics/helpers/primitives/effects/highlight";
import {
	AutoHeight,
	type AutoHeightProps,
} from "@/registry/optics/helpers/primitives/effects/auto-height";
import { getStrictContext } from "@/registry/optics/lib/get-strict-context";
import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { cn } from "@/registry/optics/lib/utils";

type TabsContextType = {
	value: string | undefined;
	setValue: (value: string, eventDetails: BaseTabs.Root.ChangeEventDetails) => void;
};

type TabsListVariant = "default" | "outline" | "underline";

type TabsVariantContextType = {
	variant: TabsListVariant;
};

const [TabsProvider, useTabs] = getStrictContext<TabsContextType>("TabsContext");

const [TabsVariantProvider, useTabsVariant] =
	getStrictContext<TabsVariantContextType>("TabsVariantContext");

type PrimitiveTabsProps = Omit<
	React.ComponentProps<typeof BaseTabs.Root>,
	"value" | "defaultValue" | "onValueChange"
> & {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string, eventDetails: BaseTabs.Root.ChangeEventDetails) => void;
};

function PrimitiveTabs(props: PrimitiveTabsProps) {
	const [value, setValue] = useControlledState<string, [BaseTabs.Root.ChangeEventDetails]>({
		value: props.value,
		defaultValue: props.defaultValue,
		onChange: props.onValueChange,
	});

	return (
		<TabsProvider value={{ value, setValue }}>
			<BaseTabs.Root data-slot="tabs" {...props} onValueChange={setValue} />
		</TabsProvider>
	);
}

type PrimitiveTabsHighlightProps = {
	[
		K in keyof HighlightProps<string> as K extends "value" | "controlledItems" | "click" ? never : K
	]: HighlightProps<string>[K];
};

function PrimitiveTabsHighlight({
	transition = { type: "spring", stiffness: 200, damping: 25 },
	...props
}: PrimitiveTabsHighlightProps) {
	const { value } = useTabs();

	return (
		<Highlight
			data-slot="tabs-highlight"
			controlledItems
			value={value}
			transition={transition}
			click={false}
			{...props}
		/>
	);
}

function PrimitiveTabsList(props: React.ComponentProps<typeof BaseTabs.List>) {
	return <BaseTabs.List data-slot="tabs-list" {...props} />;
}

function PrimitiveTabsHighlightItem(props: HighlightItemProps) {
	return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

type PrimitiveTabsTabProps = Omit<React.ComponentProps<typeof BaseTabs.Tab>, "value"> & {
	value?: string;
};

function PrimitiveTabsTab({ value = "", ...props }: PrimitiveTabsTabProps) {
	return <BaseTabs.Tab data-slot="tabs-tab" value={value} {...props} />;
}

type PrimitiveTabsPanelProps = Omit<HTMLMotionProps<"div">, "children"> & {
	children?: React.ReactNode;
	value?: string;
	keepMounted?: boolean;
	transition?: Transition;
};

function PrimitiveTabsPanel({
	value = "",
	keepMounted = false,
	transition = { duration: 0.5, ease: "easeInOut" },
	...props
}: PrimitiveTabsPanelProps) {
	return (
		<AnimatePresence mode="wait">
			<BaseTabs.Panel
				render={
					<motion.div
						data-slot="tabs-panel"
						layout
						layoutDependency={value}
						initial={{ opacity: 0, filter: "blur(4px)" }}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, filter: "blur(4px)" }}
						transition={transition}
						{...props}
					/>
				}
				keepMounted={keepMounted}
				value={value}
			/>
		</AnimatePresence>
	);
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 200,
	damping: 30,
};

type TabsPanelsAutoProps = Omit<AutoHeightProps, "deps"> & {
	mode?: "auto-height";
	children?: React.ReactNode;
};

type TabsPanelsLayoutProps = Omit<HTMLMotionProps<"div">, "children"> & {
	mode: "layout";
	children?: React.ReactNode;
	transition?: Transition;
};

export type TabsPanelsProps = TabsPanelsAutoProps | TabsPanelsLayoutProps;

function isAutoMode(props: TabsPanelsProps): props is TabsPanelsAutoProps {
	return !props.mode || props.mode === "auto-height";
}

const PrimitiveTabsPanels: React.FC<TabsPanelsProps> = (props) => {
	const { value } = useTabs();

	if (isAutoMode(props)) {
		const { children = null, transition = defaultTransition, mode: _mode, ...autoProps } = props;

		return (
			<AutoHeight data-slot="tabs-panels" deps={[value]} transition={transition} {...autoProps}>
				<React.Fragment key={value}>{children}</React.Fragment>
			</AutoHeight>
		);
	}

	const {
		children = null,
		style = {},
		transition = defaultTransition,
		mode: _mode,
		...layoutProps
	} = props;

	return (
		<motion.div
			data-slot="tabs-panels"
			layout="size"
			layoutDependency={value}
			transition={{ layout: transition }}
			style={{ overflow: "hidden", ...style }}
			{...layoutProps}
		>
			<React.Fragment key={value}>{children}</React.Fragment>
		</motion.div>
	);
};

export type TabsProps = Omit<PrimitiveTabsProps, "className"> & {
	className?: string;
};

function Tabs({ className = "", ...props }: TabsProps) {
	return <PrimitiveTabs className={cn("flex flex-col gap-2", className)} {...props} />;
}

export type TabsListProps = Omit<React.ComponentProps<typeof PrimitiveTabsList>, "className"> & {
	className?: string;
	variant?: TabsListVariant;
};

function TabsList({ className = "", variant = "default", ...props }: TabsListProps) {
	const highlightStyles: Record<TabsListVariant, string> = {
		default:
			"absolute z-0 inset-0 border border-transparent rounded-md bg-background dark:border-input dark:bg-input/30 shadow-sm",
		outline: "absolute z-0 inset-0 border rounded-md dark:border-input dark:bg-input/30",
		underline: "absolute z-0 -bottom-0.25 left-0 right-0 h-0.5 bg-foreground",
	};

	const listStyles: Record<TabsListVariant, string> = {
		default:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		outline:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		underline: "inline-flex h-9 w-fit items-center justify-center gap-1 border-b border-border",
	};

	return (
		<TabsVariantProvider value={{ variant }}>
			<PrimitiveTabsHighlight className={highlightStyles[variant]}>
				<PrimitiveTabsList className={cn(listStyles[variant], className)} {...props} />
			</PrimitiveTabsHighlight>
		</TabsVariantProvider>
	);
}

export type TabsTabProps = Omit<PrimitiveTabsTabProps, "className"> & {
	className?: string;
};

function TabsTab({ className = "", value = "", ...props }: TabsTabProps) {
	const { variant } = useTabsVariant();

	const triggerStyles: Record<TabsListVariant, string> = {
		default:
			"data-[selected]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		outline:
			"data-[selected]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		underline:
			"data-[selected]:text-foreground text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 w-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	};

	return (
		<PrimitiveTabsHighlightItem value={value} className="flex-1">
			<PrimitiveTabsTab
				value={value}
				className={cn(triggerStyles[variant], className)}
				{...props}
			/>
		</PrimitiveTabsHighlightItem>
	);
}

const TabsTrigger = TabsTab;
const TabsPanels = PrimitiveTabsPanels;
const TabsContents = PrimitiveTabsPanels;

export type TabsPanelProps = Omit<PrimitiveTabsPanelProps, "className"> & {
	className?: string;
};

const TabsPanel = ({ className = "", ...props }: TabsPanelProps) => (
	<PrimitiveTabsPanel className={cn("flex-1 outline-none", className)} {...props} />
);
const TabsContent = TabsPanel;

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTab.displayName = "TabsTab";
TabsTrigger.displayName = "TabsTrigger";
TabsPanels.displayName = "TabsPanels";
TabsContents.displayName = "TabsContents";
TabsPanel.displayName = "TabsPanel";
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTab, TabsTrigger, TabsPanels, TabsContents, TabsPanel, TabsContent };

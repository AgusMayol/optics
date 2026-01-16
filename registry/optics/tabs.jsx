"use client";

import * as React from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { motion, AnimatePresence } from "motion/react";

import {
	Highlight,
	HighlightItem,
} from "@/registry/optics/helpers/primitives/effects/highlight";
import { AutoHeight } from "@/registry/optics/helpers/primitives/effects/auto-height";
import { getStrictContext } from "@/registry/optics/lib/get-strict-context";
import { useControlledState } from "@/registry/optics/hooks/use-controlled-state";
import { cn } from "@/registry/optics/lib/utils";

// --- Internal Primitive Logic ---

const [TabsProvider, useTabs] = getStrictContext("TabsContext");

const [TabsVariantProvider, useTabsVariant] =
	getStrictContext("TabsVariantContext");

function PrimitiveTabs(props = {}) {
	const [value, setValue] = useControlledState({
		value: props?.value,
		defaultValue: props?.defaultValue,
		onChange: props?.onValueChange,
	});

	return (
		<TabsProvider value={{ value, setValue }}>
			<BaseTabs.Root data-slot="tabs" {...props} onValueChange={setValue} />
		</TabsProvider>
	);
}

function PrimitiveTabsHighlight({
	transition = { type: "spring", stiffness: 200, damping: 25 },
	...props
} = {}) {
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

function PrimitiveTabsList(props = {}) {
	return <BaseTabs.List data-slot="tabs-list" {...props} />;
}

function PrimitiveTabsHighlightItem(props = {}) {
	return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

function PrimitiveTabsTab(props = {}) {
	return <BaseTabs.Tab data-slot="tabs-tab" {...props} />;
}

function PrimitiveTabsPanel({
	value = "",
	keepMounted = false,
	transition = { duration: 0.5, ease: "easeInOut" },
	...props
} = {}) {
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

const defaultTransition = {
	type: "spring",
	stiffness: 200,
	damping: 30,
};

function isAutoMode(props = {}) {
	return !props.mode || props.mode === "auto-height";
}

function PrimitiveTabsPanels(props = {}) {
	const { value } = useTabs();

	if (isAutoMode(props)) {
		const {
			children = null,
			transition = defaultTransition,
			...autoProps
		} = props;

		return (
			<AutoHeight
				data-slot="tabs-panels"
				deps={[value]}
				transition={transition}
				{...autoProps}
			>
				<React.Fragment key={value}>{children}</React.Fragment>
			</AutoHeight>
		);
	}

	const {
		children = null,
		style = {},
		transition = defaultTransition,
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
}

// --- User-Facing Components ---

function Tabs({ className = "", ...props } = {}) {
	return (
		<PrimitiveTabs
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function TabsList({ className = "", variant = "default", ...props } = {}) {
	const highlightStyles = {
		default:
			"absolute z-0 inset-0 border border-transparent rounded-md bg-background dark:border-input dark:bg-input/30 shadow-sm",
		outline:
			"absolute z-0 inset-0 border rounded-md dark:border-input dark:bg-input/30",
		underline: "absolute z-0 -bottom-0.25 left-0 right-0 h-0.5 bg-foreground",
	};

	const listStyles = {
		default:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		outline:
			"bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
		underline:
			"inline-flex h-9 w-fit items-center justify-center gap-1 border-b border-border",
	};

	return (
		<TabsVariantProvider value={{ variant }}>
			<PrimitiveTabsHighlight className={highlightStyles[variant]}>
				<PrimitiveTabsList
					className={cn(listStyles[variant], className)}
					{...props}
				/>
			</PrimitiveTabsHighlight>
		</TabsVariantProvider>
	);
}

function TabsTab({ className = "", value = "", ...props } = {}) {
	const { variant } = useTabsVariant();

	const triggerStyles = {
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

// Aliases for backward compatibility
const TabsTrigger = TabsTab;
const TabsPanels = PrimitiveTabsPanels; // Original name was TabsPanels in previous version, but let's keep it consistent
const TabsContents = PrimitiveTabsPanels;
const TabsPanel = ({ className = "", ...props } = {}) => (
	<PrimitiveTabsPanel
		className={cn("flex-1 outline-none", className)}
		{...props}
	/>
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

export {
	Tabs,
	TabsList,
	TabsTab,
	TabsTrigger,
	TabsPanels,
	TabsContents,
	TabsPanel,
	TabsContent,
};


import * as React from "react";

import {
	Tabs as TabsPrimitive,
	TabsList as TabsListPrimitive,
	TabsTrigger as TabsTriggerPrimitive,
	TabsContent as TabsContentPrimitive,
	TabsContents as TabsContentsPrimitive,
	TabsHighlight as TabsHighlightPrimitive,
	TabsHighlightItem as TabsHighlightItemPrimitive,
} from "@/registry/optics/helpers/primitives/radix/tabs";
import { cn } from '@/registry/optics/lib/utils';
import { getStrictContext } from '@/registry/optics/lib/get-strict-context';

const [TabsVariantProvider, useTabsVariant] =
	getStrictContext("TabsVariantContext");

function Tabs({ className, ...props }) {
	return (
		<TabsPrimitive
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function TabsList({ className, variant = "default", ...props }) {
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
			<TabsHighlightPrimitive className={highlightStyles[variant]}>
				<TabsListPrimitive
					className={cn(listStyles[variant], className)}
					{...props}
				/>
			</TabsHighlightPrimitive>
		</TabsVariantProvider>
	);
}

function TabsTrigger({ className, ...props }) {
	const { variant } = useTabsVariant();

	const triggerStyles = {
		default:
			"data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		outline:
			"data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		underline:
			"data-[state=active]:text-foreground text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 w-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	};

	return (
		<TabsHighlightItemPrimitive value={props.value} className="flex-1">
			<TabsTriggerPrimitive
				className={cn(triggerStyles[variant], className)}
				{...props}
			/>
		</TabsHighlightItemPrimitive>
	);
}

function TabsContents(props) {
	return <TabsContentsPrimitive {...props} />;
}

function TabsContent({ className, ...props }) {
	return (
		<TabsContentPrimitive
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent };

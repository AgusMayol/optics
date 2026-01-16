"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { Button } from "@/registry/optics/button";
import { ChevronDown } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/optics/collapsible";

import componentCode from "@/registry/optics/dist/collapsible.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/collapsible.jsx",
		code: componentCode,
	},
];



const propsData = [
	{
		component: "<Collapsible />",
		props: [
			{
				name: "open",
				type: "boolean",
				description:
					"The controlled open state of the collapsible. Use with onOpenChange.",
			},
			{
				name: "defaultOpen",
				type: "boolean",
				description: "The uncontrolled default open state of the collapsible.",
			},
			{
				name: "onOpenChange",
				type: "(open: boolean) => void",
				description: "Callback fired when the open state changes.",
			},
			{
				name: "disabled",
				type: "boolean",
				description:
					"When true, prevents user interaction with the collapsible.",
			},
		],
	},
	{
		component: "<CollapsibleTrigger />",
		props: [
			{
				name: "render",
				type: "React.ReactElement",
				description:
					"A React element to render as the trigger instead of the default button.",
			},
			{
				name: "disabled",
				type: "boolean",
				description: "When true, prevents user interaction with the trigger.",
			},
		],
	},
	{
		component: "<CollapsibleContent />",
		props: [
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the content.",
			},
			{
				name: "forceMount",
				type: "boolean",
				description:
					"When true, the content remains in the DOM even when closed.",
			},
		],
	},
];

const demoComponent = (
	<Collapsible
		defaultOpen={false}
		className="w-full max-w-md space-y-2"
	>
		<div className="flex items-center justify-between space-x-4 px-4">
			<h4 className="text-sm font-semibold">
				@agusmayol starred 3 repositories
			</h4>
			<CollapsibleTrigger
				render={
					<Button variant="raised" size="icon">
						<ChevronDown className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				}
			/>
		</div>
		<CollapsibleContent className="flex flex-col gap-4 px-4">
			<div className="rounded-md border px-4 py-3 font-mono text-sm">
				@base-ui/react
			</div>
			<div className="rounded-md border px-4 py-3 font-mono text-sm">
				motion
			</div>
			<div className="rounded-md border px-4 py-3 font-mono text-sm">
				lucide-react
			</div>
		</CollapsibleContent>
	</Collapsible>
);

const componentConfig = {
	header: {
		title: "Collapsible",
		description:
			"An interactive component which expands/collapses a section of content.",
		href: "https://ui.shadcn.com/docs/components/collapsible",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/optics/collapsible";
import { Button } from "@/components/optics/button";
import { ChevronDown } from "lucide-react";`,
		filename: "collapsible.jsx",
	},
	installation: {
		componentName: "collapsible",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { ManualFile } from "@/components/installation-guide";
import type { ComponentPropsGroup } from "@/components/props-table";
import { Button } from "@/registry/optics/button";
import { DirectionProvider, useDirection } from "@/registry/optics/direction";
import componentCode from "@/registry/optics/dist/direction.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/direction.tsx",
		code: componentCode,
	},
];

const propsData: ComponentPropsGroup[] = [
	{
		component: "<DirectionProvider />",
		props: [
			{
				name: "direction",
				type: '"ltr" | "rtl"',
				defaultValue: "(default: ltr)",
				required: false,
				description: "The reading direction of the text provided to descendant Base UI components.",
			},
			{
				name: "children",
				type: "React.ReactNode",
				required: false,
				description: "Child elements that receive the direction context.",
			},
		],
	},
	{
		component: "useDirection()",
		props: [
			{
				name: "returns",
				type: '"ltr" | "rtl"',
				defaultValue: "(default: ltr)",
				required: false,
				description:
					"Returns the active text direction from the nearest DirectionProvider, defaulting to 'ltr' outside a provider.",
			},
		],
	},
];

function DirectionReadout() {
	const direction = useDirection();

	return (
		<div className="flex items-center justify-between gap-4 rounded-xl border bg-background px-4 py-3 text-sm">
			<div className="flex items-center gap-2">
				<ArrowRight className="size-4 text-muted-foreground rtl:rotate-180" />
				<span className="font-medium">
					{direction === "rtl" ? "Right-to-left layout" : "Left-to-right layout"}
				</span>
			</div>
			<span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground">
				{direction}
			</span>
		</div>
	);
}

function DirectionDemo() {
	const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

	return (
		<div className="flex w-full max-w-md flex-col items-center gap-4">
			<Button
				variant="raised"
				size="sm"
				onClick={() => setDir((prev) => (prev === "ltr" ? "rtl" : "ltr"))}
			>
				Toggle direction ({dir.toUpperCase()})
			</Button>
			<div dir={dir} className="w-full">
				<DirectionProvider direction={dir}>
					<DirectionReadout />
				</DirectionProvider>
			</div>
		</div>
	);
}

const componentConfig: ComponentConfigData = {
	header: {
		title: "Direction",
		description: "Provides RTL or LTR text direction context for interactive components.",
		href: "https://ui.shadcn.com/docs/components/direction",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <DirectionDemo />,
		imports: `import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/optics/button";
import { DirectionProvider, useDirection } from "@/components/optics/direction";

function DirectionReadout() {
	const direction = useDirection();

	return (
		<div className="flex items-center justify-between gap-4 rounded-xl border bg-background px-4 py-3 text-sm">
			<div className="flex items-center gap-2">
				<ArrowRight className="size-4 text-muted-foreground rtl:rotate-180" />
				<span className="font-medium">
					{direction === "rtl" ? "Right-to-left layout" : "Left-to-right layout"}
				</span>
			</div>
			<span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground">
				{direction}
			</span>
		</div>
	);
}

function DirectionDemo() {
	const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

	return (
		<div className="flex w-full max-w-md flex-col items-center gap-4">
			<Button
				variant="raised"
				size="sm"
				onClick={() => setDir((prev) => (prev === "ltr" ? "rtl" : "ltr"))}
			>
				Toggle direction ({dir.toUpperCase()})
			</Button>
			<div dir={dir} className="w-full">
				<DirectionProvider direction={dir}>
					<DirectionReadout />
				</DirectionProvider>
			</div>
		</div>
	);
}`,
		filename: "direction.tsx",
	},
	installation: {
		componentName: "direction",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

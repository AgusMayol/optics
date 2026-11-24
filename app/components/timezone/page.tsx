"use client";
import type { ManualFile } from "@/components/installation-guide";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/timezone.json";
import componentCode from "@/registry/optics/dist/timezone.tsx.txt";
import { Timezone } from "@/registry/optics/timezone";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/timezone.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Timezone
		timestamp={Date.now() - 5 * 60 * 1000}
		render={<Button variant="raised">Open Timezone</Button>}
	/>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Timezone",
		description: "Display the current timezone and relative time from a given timestamp.",
		href: "https://ui.shadcn.com/docs/components/tooltip",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Timezone } from "@/components/optics/timezone";
import { Button } from "@/components/optics/button";`,
		filename: "timezone.tsx",
	},
	installation: {
		componentName: "timezone",
		dependencies: "@base-ui/react ms",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

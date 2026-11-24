"use client";

import type { ManualFile } from "@/components/installation-guide";
import { Calendar } from "@/registry/optics/calendar";
import generatedProps from "@/registry/optics/dist/calendar.json";
import componentCode from "@/registry/optics/dist/calendar.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/calendar.tsx",
		code: componentCode,
	},
];

const demoComponent = <Calendar mode="single" className="rounded-md border !bg-background" />;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Calendar",
		description: "A date field component that allows users to enter and edit date.",
		href: "https://ui.shadcn.com/docs/components/calendar",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Calendar } from "@/components/optics/calendar";`,
		filename: "calendar.tsx",
	},
	installation: {
		componentName: "calendar",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

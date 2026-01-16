"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { Calendar } from "@/registry/optics/calendar";

import componentCode from "@/registry/optics/dist/calendar.jsx.txt";
import generatedProps from "@/registry/optics/dist/calendar.json";

const componentFiles = [
	{
		path: "@/components/optics/calendar.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Calendar
		mode="single"
		className="rounded-md border !bg-background"
	/>
);

const componentConfig = {
	header: {
		title: "Calendar",
		description:
			"A date field component that allows users to enter and edit date.",
		href: "https://ui.shadcn.com/docs/components/calendar",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Calendar } from "@/components/optics/calendar";`,
		filename: "calendar.jsx",
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

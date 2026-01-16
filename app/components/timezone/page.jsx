"use client";
import { ComponentConfig } from "../layout";
import { Timezone } from "@/registry/optics/timezone";
import { Button } from "@/registry/optics/button";

import componentCode from "@/registry/optics/dist/timezone.jsx.txt";
import utilsCode from "@/registry/optics/dist/lib/utils.js.txt";
import generatedProps from "@/registry/optics/dist/timezone.json";

const componentFiles = [
	{
		path: "@/components/optics/timezone.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<Timezone
		timestamp={Date.now() - 5 * 60 * 1000}
		render={<Button variant="raised">Open Timezone</Button>}
	/>
);

const componentConfig = {
	header: {
		title: "Timezone",
		description:
			"Display the current timezone and relative time from a given timestamp.",
		href: "https://ui.shadcn.com/docs/components/tooltip",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		children: demoComponent,
		imports: `import { Timezone } from "@/components/optics/timezone";
import { Button } from "@/components/optics/button";`,
		filename: "timezone.jsx",
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

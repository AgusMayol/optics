"use client";
import { ComponentConfig } from "../layout";
import { Badge } from "@/registry/optics/badge";

import componentCode from "@/registry/optics/dist/badge.jsx.txt";
import generatedProps from "@/registry/optics/dist/badge.json";

const componentFiles = [
	{
		path: "@/components/optics/badge.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center justify-center gap-4">
		<Badge>Default</Badge>
		<Badge variant="raised">Raised</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="outline">Outline</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="ghost">Ghost</Badge>
	</div>
);

const componentConfig = {
	header: {
		title: "Badge",
		description: "Displays a badge or a component that looks like a badge.",
		href: "https://ui.shadcn.com/docs/components/badge",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Badge } from "@/components/optics/badge";`,
		filename: "badge.jsx",
	},
	installation: {
		componentName: "badge",
		dependencies: "@radix-ui/react-slot class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

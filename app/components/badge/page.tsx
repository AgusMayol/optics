"use client";

import type { ManualFile } from "@/components/installation-guide";
import { Badge } from "@/registry/optics/badge";
import generatedProps from "@/registry/optics/dist/badge.json";
import componentCode from "@/registry/optics/dist/badge.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/badge.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center justify-center gap-4">
		<Badge>Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="outline">Outline</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="ghost">Ghost</Badge>
		<Badge variant="link">Link</Badge>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Badge",
		description: "Displays a badge or a component that looks like a badge.",
		href: "https://ui.shadcn.com/docs/components/badge",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Badge } from "@/components/optics/badge";`,
		filename: "badge.tsx",
	},
	installation: {
		componentName: "badge",
		dependencies: "@base-ui/react class-variance-authority",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

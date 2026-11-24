"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/label.json";
import componentCode from "@/registry/optics/dist/label.tsx.txt";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/label.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-2 max-w-sm">
		<Label htmlFor="email">Email</Label>
		<Input id="email" type="email" variant="raised" placeholder="Enter your email" />
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Label",
		description: "Renders an accessible label associated with controls.",
		href: "https://ui.shadcn.com/docs/components/label",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Label } from "@/components/optics/label";
import { Input } from "@/components/optics/input";`,
		filename: "label.tsx",
	},
	installation: {
		componentName: "label",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

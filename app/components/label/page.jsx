"use client";
import { ComponentConfig } from "../layout";
import { Label } from "@/registry/optics/label";
import { Input } from "@/registry/optics/input";

import componentCode from "@/registry/optics/dist/label.jsx.txt";
import generatedProps from "@/registry/optics/dist/label.json";

const componentFiles = [
	{
		path: "@/components/optics/label.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-2 max-w-sm">
		<Label htmlFor="email">Email</Label>
		<Input
			id="email"
			type="email"
			variant="raised"
			placeholder="Enter your email"
		/>
	</div>
);

const componentConfig = {
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
		filename: "label.jsx",
	},
	installation: {
		componentName: "label",
		dependencies: "@radix-ui/react-label",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

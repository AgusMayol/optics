"use client";
import { ComponentConfig } from "../layout";
import { Label } from "@/registry/optics/label";
import { Switch } from "@/registry/optics/switch";

import componentCode from "@/registry/optics/dist/switch.jsx.txt";
import generatedProps from "@/registry/optics/dist/switch.json";

const componentFiles = [
	{
		path: "@/components/optics/switch.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<div className="flex items-center space-x-2">
		<Switch id="airplane-mode" variant="raised" />
		<Label htmlFor="airplane-mode">Airplane Mode</Label>
	</div>
);

const componentConfig = {
	header: {
		title: "Switch",
		description:
			"A control that allows the user to toggle between checked and not checked.",
		href: "https://ui.shadcn.com/docs/components/switch",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Switch } from "@/components/optics/switch";
import { Label } from "@/components/optics/label";`,
		filename: "switch.jsx",
	},
	installation: {
		componentName: "switch",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

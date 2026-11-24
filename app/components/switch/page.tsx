"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/switch.json";
import componentCode from "@/registry/optics/dist/switch.tsx.txt";
import { Label } from "@/registry/optics/label";
import { Switch } from "@/registry/optics/switch";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/switch.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center space-x-2">
		<Switch id="airplane-mode" variant="raised" />
		<Label htmlFor="airplane-mode">Airplane Mode</Label>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Switch",
		description: "A control that allows the user to toggle between checked and not checked.",
		href: "https://ui.shadcn.com/docs/components/switch",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Switch } from "@/components/optics/switch";
import { Label } from "@/components/optics/label";`,
		filename: "switch.tsx",
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

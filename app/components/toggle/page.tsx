"use client";
import { Bold, Italic, Underline } from "lucide-react";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/toggle.json";
import componentCode from "@/registry/optics/dist/toggle.tsx.txt";
import { Toggle } from "@/registry/optics/toggle";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/toggle.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex items-center justify-center flex-wrap gap-4">
		<Toggle aria-label="Toggle italic" variant="outline">
			<Italic className="h-4 w-4" />
		</Toggle>
		<Toggle aria-label="Toggle bold" variant="outline">
			<Bold className="h-4 w-4" />
		</Toggle>
		<Toggle aria-label="Toggle underline" variant="outline">
			<Underline className="h-4 w-4" />
		</Toggle>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Toggle",
		description: "A two-state button that can be either on or off.",
		href: "https://ui.shadcn.com/docs/components/toggle",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Toggle } from "@/components/optics/toggle";
import { Bold, Italic, Underline } from "lucide-react";`,
		filename: "toggle.tsx",
	},
	installation: {
		componentName: "toggle",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

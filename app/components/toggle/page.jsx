"use client";
import { ComponentConfig } from "../layout";
import { Toggle } from "@/registry/optics/toggle";
import { Bold, Italic, Underline } from "lucide-react";

import componentCode from "@/registry/optics/dist/toggle.jsx.txt";
import generatedProps from "@/registry/optics/dist/toggle.json";

const componentFiles = [
	{
		path: "@/components/optics/toggle.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<div className="flex items-center justify-center flex-wrap gap-4">
		<Toggle aria-label="Toggle italic" variant="raised">
			<Italic className="h-4 w-4" />
		</Toggle>
		<Toggle aria-label="Toggle bold" variant="raised">
			<Bold className="h-4 w-4" />
		</Toggle>
		<Toggle aria-label="Toggle underline" variant="raised">
			<Underline className="h-4 w-4" />
		</Toggle>
	</div>
);

const componentConfig = {
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
		filename: "toggle.jsx",
	},
	installation: {
		componentName: "toggle",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return (
		<ComponentConfig config={componentConfig}>
			{null}
		</ComponentConfig>
	);
}

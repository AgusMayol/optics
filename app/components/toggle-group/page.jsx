"use client";
import { ComponentConfig } from "../layout";
import { ToggleGroup, ToggleGroupItem } from "@/registry/optics/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

import componentCode from "@/registry/optics/dist/toggle-group.jsx.txt";
import generatedProps from "@/registry/optics/dist/toggle-group.json";

const componentFiles = [
	{
		path: "@/components/optics/toggle-group.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "toggle-group.jsx",
		code: `import { ToggleGroup, ToggleGroupItem } from "@/components/optics/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

<ToggleGroup type="multiple">
	<ToggleGroupItem value="bold" aria-label="Toggle bold">
		<Bold className="h-4 w-4" />
	</ToggleGroupItem>
	<ToggleGroupItem value="italic" aria-label="Toggle italic">
		<Italic className="h-4 w-4" />
	</ToggleGroupItem>
	<ToggleGroupItem value="underline" aria-label="Toggle underline">
		<Underline className="h-4 w-4" />
	</ToggleGroupItem>
</ToggleGroup>`,
	},
];

const demoComponent = (
	<ToggleGroup type="multiple">
		<ToggleGroupItem value="bold" aria-label="Toggle bold">
			<Bold className="h-4 w-4" />
		</ToggleGroupItem>
		<ToggleGroupItem value="italic" aria-label="Toggle italic">
			<Italic className="h-4 w-4" />
		</ToggleGroupItem>
		<ToggleGroupItem value="underline" aria-label="Toggle underline">
			<Underline className="h-4 w-4" />
		</ToggleGroupItem>
	</ToggleGroup>
);

const componentConfig = {
	header: {
		title: "Toggle Group",
		description: "A set of two-state buttons that can be toggled on or off.",
		href: "https://ui.shadcn.com/docs/components/toggle-group",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "toggle-group",
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

"use client";
import { ComponentConfig } from "../layout";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/registry/optics/input-group";
import { Search } from "lucide-react";

import componentCode from "@/registry/optics/dist/input-group.jsx.txt";
import generatedProps from "@/registry/optics/dist/input-group.json";

const componentFiles = [
	{
		path: "@/components/optics/input-group.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "input-group.jsx",
		code: `import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/optics/input-group";
import { Search } from "lucide-react";

<InputGroup variant="raised">
	<InputGroupInput placeholder="Search..." />
	<InputGroupAddon>
		<Search className="size-4" />
	</InputGroupAddon>
	<InputGroupAddon align="inline-end">
		<InputGroupText>12 results</InputGroupText>
	</InputGroupAddon>
</InputGroup>`,
	},
];

const demoComponent = (
	<div className="w-full max-w-sm">
		<InputGroup variant="raised">
			<InputGroupInput placeholder="Search..." />
			<InputGroupAddon>
				<Search className="size-4" />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">
				<InputGroupText>12 results</InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	</div>
);

const componentConfig = {
	header: {
		title: "Input Group",
		description:
			"Group input elements with addons, icons, and text for enhanced form controls.",
		href: "https://ui.shadcn.com/docs/components/input-group",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "input-group",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

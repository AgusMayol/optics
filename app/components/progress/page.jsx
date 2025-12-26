"use client";
import { ComponentConfig } from "../layout";
import { Progress } from "@/registry/optics/progress";

import componentCode from "@/registry/optics/dist/progress.jsx.txt";
import generatedProps from "@/registry/optics/dist/progress.json";

const componentFiles = [
	{
		path: "@/components/optics/progress.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "progress.jsx",
		code: `import { Progress } from "@/components/optics/progress";

<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`,
	},
];



const demoComponent = (
	<div className="w-full max-w-md space-y-4">
		<Progress value={33} />
		<Progress value={66} />
		<Progress value={100} />
	</div>
);

const componentConfig = {
	header: {
		title: "Progress",
		description:
			"Displays an indicator showing the completion progress of a task.",
		href: "https://ui.shadcn.com/docs/components/progress",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "progress",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

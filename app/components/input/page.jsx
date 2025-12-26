"use client";
import { ComponentConfig } from "../layout";
import { Input } from "@/registry/optics/input";
import { Label } from "@/registry/optics/label";

import componentCode from "@/registry/optics/dist/input.jsx.txt";
import generatedProps from "@/registry/optics/dist/input.json";

const componentFiles = [
	{
		path: "@/components/optics/input.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-4">
		<div className="flex flex-col gap-1.5 max-w-md">
			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="email"
				placeholder="Enter your email"
				variant="raised"
			/>
		</div>

		<div className="flex flex-col gap-1.5 max-w-md">
			<Label htmlFor="password">Password</Label>
			<Input
				id="password"
				type="password"
				placeholder="Enter your password"
				variant="raised"
			/>
		</div>

		<div className="flex flex-col gap-1.5 max-w-md">
			<Label htmlFor="disabled">Disabled</Label>
			<Input
				id="disabled"
				type="text"
				placeholder="Disabled input"
				variant="raised"
				disabled
			/>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Input",
		description:
			"Displays a form input field or a component that looks like an input field.",
		href: "https://ui.shadcn.com/docs/components/input",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Input } from "@/components/optics/input";
import { Label } from "@/components/optics/label";`,
		filename: "input.jsx",
	},
	installation: {
		componentName: "input",
		dependencies: "clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

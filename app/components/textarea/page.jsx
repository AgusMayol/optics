"use client";
import { ComponentConfig } from "../layout";
import { Label } from "@/registry/optics/label";
import { Textarea } from "@/registry/optics/textarea";

import componentCode from "@/registry/optics/dist/textarea.jsx.txt";
import generatedProps from "@/registry/optics/dist/textarea.json";

const componentFiles = [
	{
		path: "@/components/optics/textarea.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "textarea.jsx",
		code: `import { Textarea } from "@/components/optics/textarea";
import { Label } from "@/components/optics/label";

<div className="w-full flex flex-col gap-2 max-w-sm">
	<Label htmlFor="message">Your message</Label>
	<Textarea
		id="message"
		placeholder="Type your message here."
		variant="raised"
	/>
</div>

<div className="w-full flex flex-col gap-2 max-w-sm">
	<Label htmlFor="disabled">Disabled</Label>
	<Textarea
		id="disabled"
		placeholder="Disabled textarea"
		variant="raised"
		disabled
	/>
</div>`,
	},
];

const demoComponent = (
	<div className="w-full flex flex-col items-center justify-center gap-4">
		<div className="w-full flex flex-col gap-2 max-w-sm">
			<Label htmlFor="message">Your message</Label>
			<Textarea
				id="message"
				placeholder="Type your message here."
				variant="raised"
			/>
		</div>

		<div className="w-full flex flex-col gap-2 max-w-sm">
			<Label htmlFor="disabled">Disabled</Label>
			<Textarea
				id="disabled"
				placeholder="Disabled textarea"
				variant="raised"
				disabled
			/>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Textarea",
		description:
			"Displays a form textarea or a component that looks like a textarea.",
		href: "https://ui.shadcn.com/docs/components/textarea",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "textarea",
		dependencies: "clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

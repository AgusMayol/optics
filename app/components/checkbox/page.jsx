"use client";
import { ComponentConfig } from "../layout";
import { Checkbox } from "@/registry/optics/checkbox";
import { Label } from "@/registry/optics/label";

import componentCode from "@/registry/optics/dist/checkbox.jsx.txt";
import generatedProps from "@/registry/optics/dist/checkbox.json";

const componentFiles = [
	{
		path: "@/components/optics/checkbox.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<div className="w-full flex flex-col items-center justify-center gap-4">
		<div className="flex flex-col items-start gap-4">
			<div className="flex items-center space-x-2">
				<Checkbox id="terms" />
				<Label htmlFor="terms">Accept terms and conditions</Label>
			</div>

			<div className="flex items-center space-x-2">
				<Checkbox id="newsletter" />
				<Label htmlFor="newsletter">Subscribe to newsletter</Label>
			</div>

			<div className="flex items-center space-x-2">
				<Checkbox id="disabled" disabled />
				<Label htmlFor="disabled">Disabled checkbox</Label>
			</div>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Checkbox",
		description:
			"A control that allows the user to toggle between checked and not checked.",
		href: "https://ui.shadcn.com/docs/components/checkbox",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Checkbox } from "@/components/optics/checkbox";
import { Label } from "@/components/optics/label";`,
		filename: "checkbox.jsx",
	},
	installation: {
		componentName: "checkbox",
		dependencies: "@base-ui/react lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

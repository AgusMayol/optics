"use client";
import { ComponentConfig } from "../layout";
import { Label } from "@/registry/optics/label";
import { RadioGroup, RadioGroupItem } from "@/registry/optics/radio-group";

import componentCode from "@/registry/optics/dist/radio-group.jsx.txt";
import generatedProps from "@/registry/optics/dist/radio-group.json";

const componentFiles = [
	{
		path: "@/components/optics/radio-group.jsx",
		code: componentCode,
	},
];



const demoComponent = (
	<div className="w-full flex flex-col items-center justify-center gap-4">
		<div className="flex flex-col items-start gap-4">
			<RadioGroup
				defaultValue="comfortable"
				className="flex flex-col items-start justify-start"
			>
				<div className="flex items-center justify-start gap-2">
					<RadioGroupItem value="default" id="r1" />
					<Label htmlFor="r1">Default</Label>
				</div>
				<div className="flex items-center justify-start gap-2">
					<RadioGroupItem value="comfortable" id="r2" />
					<Label htmlFor="r2">Comfortable</Label>
				</div>
				<div className="flex items-center justify-start gap-2">
					<RadioGroupItem value="compact" id="r3" />
					<Label htmlFor="r3">Compact</Label>
				</div>
			</RadioGroup>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Radio Group",
		description:
			"A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
		href: "https://ui.shadcn.com/docs/components/radio-group",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { RadioGroup, RadioGroupItem } from "@/components/optics/radio-group";
import { Label } from "@/components/optics/label";`,
		filename: "radio-group.jsx",
	},
	installation: {
		componentName: "radio-group",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

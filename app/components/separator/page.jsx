"use client";
import { ComponentConfig } from "../layout";
import { Separator } from "@/registry/optics/separator";

import componentCode from "@/registry/optics/dist/separator.jsx.txt";
import generatedProps from "@/registry/optics/dist/separator.json";

const componentFiles = [
	{
		path: "@/components/optics/separator.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<>
		<div className="w-full">
			<h4 className="text-sm font-medium">Horizontal</h4>
			<Separator className="my-4" />
			<div className="flex h-5 items-center space-x-4 text-sm">
				<div>Item 1</div>
				<Separator orientation="vertical" />
				<div>Item 2</div>
				<Separator orientation="vertical" />
				<div>Item 3</div>
			</div>
		</div>

		<Separator decoration className="my-4" />

		<div className="w-full">
			<h4 className="text-sm font-medium">With Decorations</h4>
			<Separator decoration className="my-4" />
		</div>
	</>
);

const componentConfig = {
	header: {
		title: "Separator",
		description: "Visually or semantically separates content.",
		href: "https://ui.shadcn.com/docs/components/separator",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Separator } from "@/components/optics/separator";`,
		filename: "separator.jsx",
	},
	installation: {
		componentName: "separator",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

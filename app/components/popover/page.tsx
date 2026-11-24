"use client";
import type { ManualFile } from "@/components/installation-guide";
import { Button } from "@/registry/optics/button";
import generatedProps from "@/registry/optics/dist/popover.json";
import componentCode from "@/registry/optics/dist/popover.tsx.txt";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/optics/popover";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/popover.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Popover>
		<PopoverTrigger render={<Button variant="raised">Open Popover</Button>} />
		<PopoverContent>
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Dimensions</h4>
				<p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
			</div>
		</PopoverContent>
	</Popover>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Popover",
		description: "Displays rich content in a portal, triggered by a button.",
		href: "https://ui.shadcn.com/docs/components/popover",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/optics/popover";
import { Button } from "@/components/optics/button";`,
		filename: "popover.tsx",
	},
	installation: {
		componentName: "popover",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

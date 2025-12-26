"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/optics/popover";

import componentCode from "@/registry/optics/dist/popover.jsx.txt";
import generatedProps from "@/registry/optics/dist/popover.json";

const componentFiles = [
	{
		path: "@/components/optics/popover.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "popover.jsx",
		code: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/optics/popover";
import { Button } from "@/components/optics/button";

<Popover>
	<PopoverTrigger render={<Button variant="raised">Open Popover</Button>} />
	<PopoverContent>
		<div className="space-y-2">
			<h4 className="font-medium leading-none">Dimensions</h4>
			<p className="text-sm text-muted-foreground">
				Set the dimensions for the layer.
			</p>
		</div>
	</PopoverContent>
</Popover>`,
	},
];


const demoComponent = (
	<Popover>
		<PopoverTrigger
			render={
				<Button variant="raised">
					Open Popover
				</Button>
			}
		/>
		<PopoverContent>
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Dimensions</h4>
				<p className="text-sm text-muted-foreground">
					Set the dimensions for the layer.
				</p>
			</div>
		</PopoverContent>
	</Popover>
);

const componentConfig = {
	header: {
		title: "Popover",
		description: "Displays rich content in a portal, triggered by a button.",
		href: "https://ui.shadcn.com/docs/components/popover",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
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

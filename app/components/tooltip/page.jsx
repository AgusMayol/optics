"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/optics/tooltip";

import componentCode from "@/registry/optics/dist/tooltip.jsx.txt";
import generatedProps from "@/registry/optics/dist/tooltip.json";

const componentFiles = [
	{
		path: "@/components/optics/tooltip.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "tooltip.jsx",
		code: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/optics/tooltip";
import { Button } from "@/components/optics/button";

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger render={<Button variant="raised">Hover me</Button>} />
		<TooltipContent>
			<p>Add to library</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>`,
	},
];

const demoComponent = (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger render={<Button variant="raised">Hover me</Button>} />
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

const componentConfig = {
	header: {
		title: "Tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
		href: "https://ui.shadcn.com/docs/components/tooltip",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "tooltip",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

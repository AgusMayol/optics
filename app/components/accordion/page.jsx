"use client";
import { ComponentConfig } from "../layout";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";

import componentCode from "@/registry/optics/dist/accordion.jsx.txt";
import generatedProps from "@/registry/optics/dist/accordion.json";
import utilsCode from "@/registry/optics/dist/lib/utils.js.txt";
import getStrictContextCode from "@/registry/optics/dist/lib/get-strict-context.jsx.txt";
import controlledStateCode from "@/registry/optics/dist/hooks/use-controlled-state.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/accordion.jsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/hooks/use-controlled-state.jsx",
		code: controlledStateCode,
	},
	{
		path: "@/components/optics/lib/get-strict-context.jsx",
		code: getStrictContextCode,
	},
	{
		path: "@/components/optics/lib/utils.js",
		code: utilsCode,
	},
];

const demoComponent = (
	<Accordion type="single" collapsible className="w-full max-w-md">
		<AccordionItem value="item-1">
			<AccordionTrigger>Is it accessible?</AccordionTrigger>
			<AccordionContent>
				Yes. It adheres to the WAI-ARIA design pattern.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-2">
			<AccordionTrigger>Is it styled?</AccordionTrigger>
			<AccordionContent>
				Yes. It comes with default styles that matches the other components
				aesthetic.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="item-3">
			<AccordionTrigger>Is it animated?</AccordionTrigger>
			<AccordionContent>
				Yes. It's animated by default, but you can disable it if you prefer.
			</AccordionContent>
		</AccordionItem>
	</Accordion>
);

const componentConfig = {
	header: {
		title: "Accordion",
		description:
			"A vertically stacked set of interactive headings that each reveal a section of content.",
		href: "https://ui.shadcn.com/docs/components/accordion",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/optics/accordion";`,
		filename: "accordion.jsx",
		additionalCodeFiles: [
			{
				language: "javascript",
				filename: "lib/utils.js",
				code: utilsCode,
			},
		],
	},
	installation: {
		componentName: "accordion",
		dependencies: "@base-ui-components/react motion lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

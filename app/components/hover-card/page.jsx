"use client";
import { ComponentConfig } from "../layout";
import { Button } from "@/registry/optics/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/optics/hover-card";

import componentCode from "@/registry/optics/dist/hover-card.jsx.txt";
import generatedProps from "@/registry/optics/dist/hover-card.json";

const componentFiles = [
	{
		path: "@/components/optics/hover-card.jsx",
		code: componentCode,
	},
];





const demoComponent = (
	<HoverCard>
		<HoverCardTrigger
			render={
				<Button variant="raised">
					@nextjs
				</Button>
			}
		/>
		<HoverCardContent>
			<div className="flex justify-between space-x-4">
				<div className="space-y-1">
					<h4 className="text-sm font-semibold">@nextjs</h4>
					<p className="text-sm">
						The React Framework – created and maintained by @vercel.
					</p>
				</div>
			</div>
		</HoverCardContent>
	</HoverCard>
);

const componentConfig = {
	header: {
		title: "Hover Card",
		description:
			"For sighted users to preview content available behind a link.",
		href: "https://ui.shadcn.com/docs/components/hover-card",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/optics/hover-card";
import { Button } from "@/components/optics/button";`,
		filename: "hover-card.jsx",
	},
	installation: {
		componentName: "hover-card",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

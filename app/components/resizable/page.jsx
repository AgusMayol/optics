"use client";
import { ComponentConfig } from "../layout";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/optics/resizable";

import componentCode from "@/registry/optics/dist/resizable.jsx.txt";
import generatedProps from "@/registry/optics/dist/resizable.json";

const componentFiles = [
	{
		path: "@/components/optics/resizable.jsx",
		code: componentCode,
	},
];





const demoComponent = (
	<ResizablePanelGroup
		direction="horizontal"
		className="max-w-md rounded-lg border bg-background"
	>
		<ResizablePanel defaultSize={50}>
			<div className="flex h-[200px] items-center justify-center p-6">
				<span className="font-semibold">One</span>
			</div>
		</ResizablePanel>
		<ResizableHandle withHandle />
		<ResizablePanel defaultSize={50}>
			<div className="flex h-[200px] items-center justify-center p-6">
				<span className="font-semibold">Two</span>
			</div>
		</ResizablePanel>
	</ResizablePanelGroup>
);

const componentConfig = {
	header: {
		title: "Resizable",
		description:
			"Accessible resizable panel groups and layouts with keyboard support.",
		href: "https://ui.shadcn.com/docs/components/resizable",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/optics/resizable";`,
		filename: "resizable.jsx",
	},
	installation: {
		componentName: "resizable",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

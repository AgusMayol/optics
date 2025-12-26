"use client";
import { ComponentConfig } from "../layout";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/optics/empty";
import { Button } from "@/registry/optics/button";
import { FolderCode } from "lucide-react";

import componentCode from "@/registry/optics/dist/empty.jsx.txt";
import generatedProps from "@/registry/optics/dist/empty.json";

const componentFiles = [
	{
		path: "@/components/optics/empty.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<Empty>
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<FolderCode className="size-6" />
			</EmptyMedia>
			<EmptyTitle>No Projects Yet</EmptyTitle>
			<EmptyDescription>
				You haven't created any projects yet. Get started by creating your
				first project.
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<div className="flex gap-2">
				<Button>Create Project</Button>
				<Button variant="outline">Import Project</Button>
			</div>
		</EmptyContent>
	</Empty>
);

const componentConfig = {
	header: {
		title: "Empty",
		description: "Display an empty state when there's no data to show.",
		href: "https://ui.shadcn.com/docs/components/empty",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/optics/empty";
import { Button } from "@/components/optics/button";
import { FolderCode } from "lucide-react";`,
		filename: "empty.jsx",
	},
	installation: {
		componentName: "empty",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

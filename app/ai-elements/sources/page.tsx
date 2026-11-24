"use client";

import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	Source,
	Sources,
	SourcesContent,
	SourcesTrigger,
} from "@/registry/optics/ai-elements/sources";
import generatedProps from "@/registry/optics/dist/ai-elements/sources.json";
import componentCode from "@/registry/optics/dist/ai-elements/sources.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/sources.tsx",
		code: componentCode,
	},
];

interface SourceEntry {
	title: string;
	href: string;
	description: string;
}

const DEMO_SOURCES: readonly SourceEntry[] = [
	{
		title: "Next.js App Router Documentation",
		href: "https://nextjs.org/docs/app",
		description: "File-system routing, layouts, and Server and Client Component boundaries.",
	},
	{
		title: "Base UI Collapsible Primitive",
		href: "https://base-ui.com/react/components/collapsible",
		description: "Accessible collapsible root, trigger, and animated panel primitives.",
	},
	{
		title: "shadcn/ui AI Elements",
		href: "https://ui.shadcn.com/docs/ai-elements/base/sources",
		description: "Reference patterns for displaying cited external links in agent replies.",
	},
];

function SourcesDemo() {
	return (
		<div className="w-full max-w-md rounded-xl border bg-card p-4">
			<Sources defaultOpen>
				<SourcesTrigger count={DEMO_SOURCES.length} />
				<SourcesContent>
					{DEMO_SOURCES.map((source) => (
						<Source
							key={source.href}
							href={source.href}
							title={source.title}
							description={source.description}
						/>
					))}
				</SourcesContent>
			</Sources>
		</div>
	);
}

SourcesDemo.displayName = "SourcesDemo";

const demoImports = `import {
	Source,
	Sources,
	SourcesContent,
	SourcesTrigger,
} from "@/components/optics/ai-elements/sources";

interface SourceEntry {
	title: string;
	href: string;
	description: string;
}

const DEMO_SOURCES: readonly SourceEntry[] = [
	{
		title: "Next.js App Router Documentation",
		href: "https://nextjs.org/docs/app",
		description: "File-system routing, layouts, and Server and Client Component boundaries.",
	},
	{
		title: "Base UI Collapsible Primitive",
		href: "https://base-ui.com/react/components/collapsible",
		description: "Accessible collapsible root, trigger, and animated panel primitives.",
	},
	{
		title: "shadcn/ui AI Elements",
		href: "https://ui.shadcn.com/docs/ai-elements/base/sources",
		description: "Reference patterns for displaying cited external links in agent replies.",
	},
];

function SourcesDemo() {
	return (
		<div className="w-full max-w-md rounded-xl border bg-card p-4">
			<Sources defaultOpen>
				<SourcesTrigger count={DEMO_SOURCES.length} />
				<SourcesContent>
					{DEMO_SOURCES.map((source) => (
						<Source
							key={source.href}
							href={source.href}
							title={source.title}
							description={source.description}
						/>
					))}
				</SourcesContent>
			</Sources>
		</div>
	);
}`;

const componentConfig: ComponentConfigData = {
	header: {
		title: "Sources",
		description: "Collapsible reference list rendering external links cited by an agent reply.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/sources",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <SourcesDemo />,
		imports: demoImports,
		filename: "sources.tsx",
	},
	installation: {
		componentName: "ai-sources",
		dependencies: "lucide-react clsx tailwind-merge",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

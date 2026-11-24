"use client";

import type { ManualFile } from "@/components/installation-guide";
import type { ComponentPropsGroup } from "@/components/props-table";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import componentCode from "@/registry/optics/dist/code-snippet.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/code-snippet.tsx",
		code: componentCode,
	},
];

interface SnippetCommand {
	label: string;
	code: string;
}

const commandsExample: SnippetCommand[] = [
	{
		label: "npm",
		code: "npm install package",
	},
	{
		label: "yarn",
		code: "yarn add package",
	},
];

const demoComponent = (
	<Snippet defaultValue="npm" className="w-full">
		<SnippetHeader>
			<SnippetTabsList variant="outline">
				{commandsExample.map((command) => (
					<SnippetTabsTrigger key={command.label} value={command.label}>
						{command.label}
					</SnippetTabsTrigger>
				))}
			</SnippetTabsList>
		</SnippetHeader>
		<SnippetTabsContents>
			{commandsExample.map((command) => (
				<SnippetTabsContent
					key={command.label}
					value={command.label}
					className="flex items-center justify-between gap-4"
				>
					{command.code}
					<SnippetCopyButton value={command.code} />
				</SnippetTabsContent>
			))}
		</SnippetTabsContents>
	</Snippet>
);

const propsData: ComponentPropsGroup[] = [
	{
		component: "<SnippetCopyButton />",
		props: [
			{
				name: "value",
				type: "string",
				description: "The value to copy to the clipboard.",
			},
			{
				name: "timeout",
				type: "number",
				description: "The timeout in milliseconds to copy the value to the clipboard.",
			},
		],
	},
];

const componentConfig: ComponentConfigData = {
	header: {
		title: "Code Snippet",
		description:
			"A component for displaying code snippets with syntax highlighting and copy functionality.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: demoComponent,
		imports: `import { Snippet, SnippetCopyButton, SnippetHeader, SnippetTabsContent, SnippetTabsContents, SnippetTabsList, SnippetTabsTrigger } from "@/components/optics/code-snippet";

const commandsExample = [
	{
		label: "npm",
		code: "npm install package",
	},
	{
		label: "yarn",
		code: "yarn add package",
	},
];`,
		filename: "code-snippet.tsx",
	},
	installation: {
		componentName: "code-snippet",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

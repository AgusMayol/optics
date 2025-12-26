"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import * as React from "react";

import componentCode from "@/registry/optics/dist/code-snippet.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/code-snippet.jsx",
		code: componentCode,
	},
];

const commandsExample = [
	{
		label: "npm",
		code: "npm install package",
	},
	{
		label: "yarn",
		code: "yarn add package",
	},
];

const code = [
	{
		language: "jsx",
		filename: "code-snippet.jsx",
		code: `import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/components/optics/code-snippet";

<Snippet value={value} onValueChange={setValue}>
	<SnippetHeader>
		<SnippetTabsList variant="outline">
			{commands.map((cmd) => (
				<SnippetTabsTrigger key={cmd.label} value={cmd.label}>
					{cmd.label}
				</SnippetTabsTrigger>
			))}
		</SnippetTabsList>
	</SnippetHeader>
	<SnippetTabsContents>
		{commands.map((cmd) => (
			<SnippetTabsContent key={cmd.label} value={cmd.label}>
				{cmd.code}
				<SnippetCopyButton value={cmd.code} />
			</SnippetTabsContent>
		))}
	</SnippetTabsContents>
</Snippet>`,
	},
];

const propsData = [
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
				description:
					"The timeout in milliseconds to copy the value to the clipboard.",
			},
		],
	},
];

function CodeSnippetDemo() {
	const [valueExample, setValueExample] = useState(commandsExample[0].label);

	return (
		<Snippet
			value={valueExample}
			onValueChange={setValueExample}
			className="w-full"
		>
			<SnippetHeader>
				<SnippetTabsList variant="outline">
					{commandsExample.map((command) => (
						<SnippetTabsTrigger
							key={command.label}
							value={command.label}
						>
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
}

const componentConfig = {
	header: {
		title: "Code Snippet",
		description:
			"A component for displaying code snippets with syntax highlighting and copy functionality.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: <CodeSnippetDemo />,
		code: code,
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

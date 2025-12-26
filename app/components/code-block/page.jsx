"use client";
import { ComponentConfig } from "../layout";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";

import componentCode from "@/registry/optics/dist/code-block.jsx.txt";
import utilsCode from "@/registry/optics/dist/lib/utils.js.txt";

const componentFiles = [
	{
		path: "@/components/optics/code-block.jsx",
		code: componentCode,
	},
	{
		path: "@/components/optics/lib/utils.js",
		code: utilsCode,
	},
];

const code = [
	{
		language: "js",
		filename: "example.js",
		code: `console.log("Hello World!");`,
	},
];

const propsData = [
	{
		component: "<CodeBlock />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the code block container.",
			},
			{
				name: "data",
				type: "Array<{ language: string, filename: string, code: string }> (required)",
				description:
					"Array of code files to display in the code block.",
			},
			{
				name: "value",
				type: "string",
				description:
					"The controlled active filename. Use with onValueChange.",
			},
			{
				name: "defaultValue",
				type: "string",
				description: "The uncontrolled default active filename.",
			},
			{
				name: "onValueChange",
				type: "(value: string) => void",
				description:
					"Callback fired when the active filename changes.",
			},
		],
	},
	{
		component: "<CodeBlockHeader />",
		props: [
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the header.",
			},
		],
	},
	{
		component: "<CodeBlockBody />",
		props: [
			{
				name: "children",
				type: "(item: { language: string, filename: string, code: string }) => React.ReactNode",
				description:
					"Render function that receives each code file item.",
			},
		],
	},
	{
		component: "<CodeBlockContent />",
		props: [
			{
				name: "children",
				type: "string (required)",
				description: "The code content to display.",
			},
			{
				name: "language",
				type: "string",
				description:
					"The programming language for syntax highlighting.",
			},
			{
				name: "themes",
				type: "{ light: string, dark: string }",
				description:
					"Shiki theme configuration for light and dark modes.",
			},
			{
				name: "syntaxHighlighting",
				type: "boolean (default: true)",
				description: "Whether to enable syntax highlighting.",
			},
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the content.",
			},
		],
	},
	{
		component: "<CodeBlockItem />",
		props: [
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the item.",
			},
			{
				name: "value",
				type: "string (required)",
				description:
					"The filename that identifies this code block item.",
			},
			{
				name: "lineNumbers",
				type: "boolean (default: true)",
				description: "Whether to show line numbers.",
			},
			{
				name: "children",
				type: "React.ReactNode (required)",
				description:
					"The code content to display (usually CodeBlockContent).",
			},
		],
	},
	{
		component: "<CodeBlockCopyButton />",
		props: [
			{
				name: "className",
				type: "string",
				description: "Additional CSS classes to apply to the button.",
			},
			{
				name: "variant",
				type: `"default" | "outline" | "ghost" | "destructive" | "secondary" | "info" | "success" | "warning" | "muted" | "raised" | "link" (default: "outline")`,
				description: "Variant style for the button.",
			},
			{
				name: "size",
				type: `"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" (default: "icon")`,
				description: "Size of the button.",
			},
			{
				name: "render",
				type: "React.ReactElement",
				description:
					"A React element to render as the button instead of the default button.",
			},
			{
				name: "timeout",
				type: "number (default: 2000)",
				description:
					"Duration in milliseconds before the 'copied' state resets.",
			},
			{
				name: "onCopy",
				type: "() => void",
				description:
					"Callback fired when code is successfully copied.",
			},
			{
				name: "onError",
				type: "(error: Error) => void",
				description: "Callback fired when copy operation fails.",
			},
		],
	},
	{
		component: "<CodeBlockFiles />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the files container.",
			},
			{
				name: "children",
				type: "(item: { language: string, filename: string, code: string }) => React.ReactNode",
				description:
					"Render function that receives each code file item.",
			},
		],
	},
	{
		component: "<CodeBlockFilename />",
		props: [
			{
				name: "className",
				type: "string",
				description:
					"Additional CSS classes to apply to the filename.",
			},
			{
				name: "value",
				type: "string (required)",
				description: "The filename value that identifies this tab.",
			},
			{
				name: "icon",
				type: "React.ComponentType",
				description:
					"Custom icon component to display before the filename.",
			},
			{
				name: "children",
				type: "React.ReactNode (required)",
				description: "The filename text to display.",
			},
		],
	},
];

const demoComponent = (
	<div className="w-full">
		<CodeBlock data={code} defaultValue={code[0].filename}>
			<CodeBlockHeader>
				<CodeBlockFiles>
					{(item) => (
						<CodeBlockFilename
							key={item.language}
							value={item.filename}
						>
							{item.filename}
						</CodeBlockFilename>
					)}
				</CodeBlockFiles>
				<CodeBlockCopyButton />
			</CodeBlockHeader>
			<CodeBlockBody>
				{(item) => (
					<CodeBlockItem key={item.language} value={item.filename}>
						<CodeBlockContent language={item.language}>
							{item.code}
						</CodeBlockContent>
					</CodeBlockItem>
				)}
			</CodeBlockBody>
		</CodeBlock>
	</div>
);

const componentConfig = {
	header: {
		title: "Code Block",
		description:
			"A powerful code block component with syntax highlighting, file tabs, and copy functionality.",
		href: undefined,
		hrefText: undefined,
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "code-block",
		dependencies: "shiki @radix-ui/react-tabs",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

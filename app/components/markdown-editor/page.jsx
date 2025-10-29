"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
import { ArrowLeft, Sparkle, Eye, Edit3, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/registry/agusmayol/tabs";
import {
	MarkdownEditor,
	MarkdownViewer,
	MarkdownPreview,
	MarkdownSplitView,
	MarkdownEditorFloatingBar,
} from "@/registry/agusmayol/markdown";
import { useState } from "react";

const code = [
	{
		language: "jsx",
		filename: "markdown-editor.jsx",
		code: `import { 
	MarkdownEditor, 
	MarkdownViewer, 
	MarkdownPreview, 
	MarkdownSplitView 
} from "@/registry/agusmayol/markdown";

export function MyMarkdownComponent() {
	const [content, setContent] = useState("");

	return (
		<div className="space-y-4">
			{/* Editor with Toolbar */}
			<MarkdownEditor
				content={content}
				onChange={setContent}
				placeholder="Type '/' for commands..."
				showToolbar={true}
			/>
			
			{/* Preview Only */}
			<MarkdownPreview content={content} />
			
			{/* Split View */}
			<MarkdownSplitView
				content={content}
				onChange={setContent}
				placeholder="Type '/' for commands..."
			/>
		</div>
	);
}`,
	},
];

const exampleContent = `# Advanced Markdown Editor

This is a **powerful** markdown editor with *Notion-like* features.

## Features

- **Slash Commands**: Type \`/\` to see available commands
- **Bubble Menu**: Select text to format it
- **GitHub Markdown**: Full support for GitHub Flavored Markdown
- **Syntax Highlighting**: Beautiful code blocks with syntax highlighting

### Code Example

\`\`\`javascript
function greet(name) {
	return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Task List

- [x] Implement slash commands
- [x] Add bubble menu
- [x] Create GitHub-style viewer
- [ ] Add more formatting options

### Table

| Feature | Status | Description |
|---------|--------|-------------|
| Slash Commands | ✅ | Type '/' for commands |
| Bubble Menu | ✅ | Select text to format |
| Syntax Highlighting | ✅ | Beautiful code blocks |

> This is a blockquote with some important information.

---

**Try it out!** Select some text to see the bubble menu, or type \`/\` to see available commands.`;

export default function Page() {
	const [content, setContent] = useState(exampleContent);
	const [activeTab, setActiveTab] = useState("editor");

	const onChangeContent = (newContent) => {
		setContent(newContent);
	};

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">
					Advanced Markdown Editor
				</h1>
				<p className="text-muted-foreground text-xl">
					A powerful markdown editor with Notion-like features, slash commands,
					and bubble menus.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<div className="w-full max-w-6xl">
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3 mb-4">
									<TabsTrigger
										value="editor"
										className="flex items-center gap-2"
									>
										<Edit3 className="h-4 w-4" />
										Editor
									</TabsTrigger>
									<TabsTrigger
										value="preview"
										className="flex items-center gap-2"
									>
										<Eye className="h-4 w-4" />
										Preview
									</TabsTrigger>
									<TabsTrigger
										value="split"
										className="flex items-center gap-2"
									>
										<Code2 className="h-4 w-4" />
										Split View
									</TabsTrigger>
								</TabsList>

								<TabsContent value="editor" className="mt-0">
									<MarkdownEditor
										content={content}
										onChange={onChangeContent}
										placeholder="Type '/' for commands..."
										showToolbar={true}
										className="min-h-[500px]"
									/>
								</TabsContent>

								<TabsContent value="preview" className="mt-0">
									<MarkdownPreview
										content={content}
										className="min-h-[500px]"
									/>
								</TabsContent>

								<TabsContent value="split" className="mt-0">
									<MarkdownSplitView
										content={content}
										onChange={onChangeContent}
										placeholder="Type '/' for commands..."
										className="min-h-[500px]"
									/>
								</TabsContent>
							</Tabs>
						</div>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						{/* Component Code */}
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
									showArrow
								>
									Show Code
								</AccordionTrigger>
								<AccordionContent
									className="border-b-0 border-x-0 border-t pb-0 shadow-none"
									keepRendered
								>
									<CodeBlock
										data={code}
										defaultValue={code[0].filename}
										className="border-none rounded-none rounded-b-xl shadow-none group"
									>
										<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
											<CodeBlockCopyButton
												onCopy={() => console.log("Copied code to clipboard")}
												onError={() =>
													console.error("Failed to copy code to clipboard")
												}
											/>
										</CodeBlockHeader>
										<CodeBlockBody>
											{(item) => (
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent
														language={item.language}
														className="bg-sidebar"
													>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardFooter>
				</Card>
			</div>
		</main>
	);
}

"use client";
import * as React from "react";
import { Badge } from "@/registry/optics/badge";
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
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";

const domain = process.env.NEXT_PUBLIC_DOMAIN;

const componentsJsonCode = [
	{
		language: "json",
		filename: "components.json",
		code: `{
  "..."
  "registries": {
    "@optics": "https://${domain}/r/{name}.json"
  }
}`,
	},
];

const cursorCode = [
	{
		language: "json",
		filename: ".cursor/mcp.json",
		code: `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`,
	},
];

const vscodeCode = [
	{
		language: "json",
		filename: ".vscode/mcp.json",
		code: `{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`,
	},
];

const claudeCode = [
	{
		language: "json",
		filename: ".mcp.json",
		code: `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					MCP Server Connection
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Connect to the shadcn MCP server and access the Optics registry.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 p-6 lg:p-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2">
					<p className="text-muted-foreground text-sm lg:leading-7">
						The Model Context Protocol (MCP) allows AI agents to interact with
						the shadcn CLI to browse, search, and install components from the
						Optics registry. Follow the steps below to connect your agent.
					</p>
				</div>

				{/* Step 1: Configure components.json */}
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 break-words">
						<Badge variant="outline" className="tabular-nums aspect-square">
							1
						</Badge>
						Configure your registry
					</h2>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Add the Optics registry to your{" "}
						<code className="text-xs bg-muted px-1.5 py-0.5 rounded">
							components.json
						</code>{" "}
						file:
					</p>
					<CodeBlock
						data={componentsJsonCode}
						defaultValue={componentsJsonCode[0].filename}
					>
						<CodeBlockHeader>
							<CodeBlockFiles>
								{(item) => (
									<CodeBlockFilename key={item.language} value={item.filename}>
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
					<p className="text-sm text-muted-foreground">
						Replace the URL with your actual Optics registry endpoint if
						different.
					</p>
				</div>

				{/* Step 2: Connect with your agent */}
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 break-words">
						<Badge variant="outline" className="tabular-nums aspect-square">
							2
						</Badge>
						Connect with your agent
					</h2>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Add the shadcn MCP server configuration based on your development
						environment:
					</p>
					<Tabs defaultValue="cursor" className="w-full">
						<TabsList variant="underline">
							<TabsTrigger value="cursor">Cursor</TabsTrigger>
							<TabsTrigger value="vscode">VS Code</TabsTrigger>
							<TabsTrigger value="claude">Claude Code</TabsTrigger>
						</TabsList>
						<TabsContents className="w-full pt-4">
							<TabsContent value="cursor" className="w-full">
								<div className="flex flex-col gap-4">
									<CodeBlock
										data={cursorCode}
										defaultValue={cursorCode[0].filename}
									>
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
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent language={item.language}>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
									<p className="text-sm text-muted-foreground">
										Restart Cursor and enable the shadcn MCP server in Cursor
										Settings.
									</p>
								</div>
							</TabsContent>
							<TabsContent value="vscode" className="w-full">
								<div className="flex flex-col gap-4">
									<CodeBlock
										data={vscodeCode}
										defaultValue={vscodeCode[0].filename}
									>
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
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent language={item.language}>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
									<p className="text-sm text-muted-foreground">
										Install the MCP extension for VS Code, then restart VS Code
										and open the MCP panel to interact with the shadcn MCP
										server.
									</p>
								</div>
							</TabsContent>
							<TabsContent value="claude" className="w-full">
								<div className="flex flex-col gap-4">
									<CodeBlock
										data={claudeCode}
										defaultValue={claudeCode[0].filename}
									>
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
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent language={item.language}>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
									<p className="text-sm text-muted-foreground">
										Restart Claude Code and use the{" "}
										<code className="text-xs bg-muted px-1.5 py-0.5 rounded">
											/mcp
										</code>{" "}
										command to interact with the shadcn MCP server.
									</p>
								</div>
							</TabsContent>
						</TabsContents>
					</Tabs>
				</div>

				{/* Step 3: Using the MCP Server */}
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 break-words">
						<Badge variant="outline" className="tabular-nums aspect-square">
							3
						</Badge>
						Using the MCP Server
					</h2>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Once connected, you can use natural language commands to interact
						with the Optics registry:
					</p>
					<div className="flex flex-col gap-3 mt-2">
						<p className="text-sm text-muted-foreground">
							• "Show me all available components in the Optics registry"
						</p>
						<p className="text-sm text-muted-foreground">
							• "Add the button, dialog, and card components from @optics"
						</p>
						<p className="text-sm text-muted-foreground">
							• "Search for form components in the Optics registry"
						</p>
						<p className="text-sm text-muted-foreground">
							• "Install @optics/button to my project"
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

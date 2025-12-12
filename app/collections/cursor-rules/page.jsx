"use client";
import { InstallationGuide } from "@/components/installation-guide";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { Button } from "@/registry/optics/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/optics/card";
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
import backEndCode from "@/registry/optics/cursor/rules/back-end.mdc.txt";
import bulkProcessingCode from "@/registry/optics/cursor/rules/bulk-processing.mdc.txt";
import commitsConventionCode from "@/registry/optics/cursor/rules/commits-convention.mdc.txt";
import frontEndCode from "@/registry/optics/cursor/rules/front-end.mdc.txt";
import generalCode from "@/registry/optics/cursor/rules/general.mdc.txt";
import reactOptimizationCode from "@/registry/optics/cursor/rules/react-optimization.mdc.txt";
import webInterfaceGuidelinesCode from "@/registry/optics/cursor/rules/web-interface-guidelines.mdc.txt";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/registry/optics/dialog";
import { ScrollArea, ScrollBar } from "@/registry/optics/scroll-area";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const cursorRules = [
	{
		name: "cursor-rule-general",
		title: "General",
		description: "General development rules for all prompts.",
		code: generalCode,
		path: ".cursor/rules/general.mdc",
	},
	{
		name: "cursor-rule-front-end",
		title: "Front End",
		description: "Frontend development guidelines and best practices.",
		code: frontEndCode,
		path: ".cursor/rules/front-end.mdc",
	},
	{
		name: "cursor-rule-back-end",
		title: "Back End",
		description: "Backend development guidelines and best practices.",
		code: backEndCode,
		path: ".cursor/rules/back-end.mdc",
	},
	{
		name: "cursor-rule-react-optimization",
		title: "React Optimization",
		description: "React optimization rules and performance guidelines.",
		code: reactOptimizationCode,
		path: ".cursor/rules/react-optimization.mdc",
	},
	{
		name: "cursor-rule-web-interface-guidelines",
		title: "Web Interface Guidelines",
		description:
			"Guidelines for building accessible, fast, and delightful UIs.",
		code: webInterfaceGuidelinesCode,
		path: ".cursor/rules/web-interface-guidelines.mdc",
	},
	{
		name: "cursor-rule-commits-convention",
		title: "Commits Convention",
		description: "Commit message conventions and best practices.",
		code: commitsConventionCode,
		path: ".cursor/rules/commits-convention.mdc",
	},
	{
		name: "cursor-rule-bulk-processing",
		title: "Bulk Processing",
		description: "Rules for optimizing bulk processing tasks.",
		code: bulkProcessingCode,
		path: ".cursor/rules/bulk-processing.mdc",
	},
];

const mcps = [
	{
		name: "shadcn",
		title: "shadcn/ui MCP",
		description:
			"Enables interaction with the shadcn CLI to search, explore, and install components from custom registries like Optics.",
		config: {
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
		docsUrl: "https://ui.shadcn.com/docs/mcp",
	},
	{
		name: "next-devtools",
		title: "Next.js DevTools MCP",
		description:
			"Provides tools to diagnose errors, view routes, and get real-time information from your Next.js development server.",
		config: {
			filename: ".cursor/mcp.json",
			code: `{
    "mcpServers": {
        "next-devtools": {
            "command": "npx",
            "args": ["-y", "next-devtools-mcp@latest"]
        }
    }
}`,
		},
		docsUrl: "https://nextjs.org/docs/app/guides/mcp",
	},
	{
		name: "github",
		title: "GitHub MCP",
		description:
			"Integrates GitHub directly into your IDE, allowing you to search code, manage issues, create PRs, and more from Cursor.",
		config: {
			filename: ".cursor/mcp.json",
			code: `{
    "mcpServers": {
        "github": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-github"],
            "env": {
                "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
            }
        }
    }
}`,
		},
		docsUrl:
			"https://github.com/github/github-mcp-server",
	},
	{
		name: "supabase",
		title: "Supabase MCP",
		description:
			"Connects your IDE with Supabase to manage databases, run migrations, and work with Edge Functions.",
		config: {
			filename: ".cursor/mcp.json",
			code: `{
    "mcpServers": {
        "supabase": {
            "command": "npx",
            "args": [
                "-y",
                "@supabase/mcp-server-supabase@latest",
                "--project-ref=your_project_ref"
            ],
            "env": {
                "SUPABASE_ACCESS_TOKEN": "your_access_token"
            }
        }
    }
}`,
		},
		docsUrl: "https://supabase.com/mcp",
	},
];

export default function Page() {
	const {
		value: selectedPackageManager,
		setValue: setSelectedPackageManager,
		installationTab,
		handleTabChange,
	} = useCookiePreferences(cursorRules[0]?.name || "cursor-rule");

	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Cursor Rules
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					Install Cursor rules to enhance your development workflow with Optics
					guidelines.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2 px-6 lg:px-12">
					<p className="text-muted-foreground text-sm lg:leading-7">
						Cursor rules are configuration files that guide AI assistants in
						your development workflow. Optics provides a collection of curated
						rules covering general development, frontend, backend, React
						optimization, and more. These rules are installed directly into your
						project's `.cursor/rules/` directory.
					</p>
				</div>

				{/* Available Rules */}
				<div className="flex flex-col gap-8 w-full">
					<div className="grid grid-cols-2 items-start justify-center gap-12 px-6">
						{cursorRules.map((rule, index) => {
							const manualFiles = [
								{
									path: rule.path,
									code: rule.code,
								},
							];

							return (
								<Dialog key={rule.name}>
									<DialogTrigger className="w-auto! h-full flex items-center justify-center cursor-pointer">
										<Card className="w-[350px] h-full">
											<CardHeader className="flex flex-col items-start justify-start">
												<CardTitle>{rule.title}</CardTitle>
												<CardDescription className="text-start text-pretty">{rule.description}</CardDescription>
											</CardHeader>
										</Card>
									</DialogTrigger>
									<DialogContent className="max-w-5xl! w-full! max-h-[65vh] overflow-hidden" containerClassName="max-w-5xl! w-full! max-h-[65vh] flex flex-col min-h-0 overflow-hidden">
										<DialogHeader className="shrink-0">
											<DialogTitle>{rule.title}</DialogTitle>
											<DialogDescription>
												{rule.description}
											</DialogDescription>
										</DialogHeader>
										<ScrollArea className="flex-1 min-h-0 w-full overflow-x-hidden" maskColor="from-background" viewportClassName="overflow-x-hidden">
											<div className="pr-0 min-w-0">
												<InstallationGuide
													value={selectedPackageManager}
													setValue={setSelectedPackageManager}
													componentName={rule.name}
													installDeps={[]}
													manualFiles={manualFiles}
													installationTab={installationTab}
													handleTabChange={handleTabChange}
													className="px-0! py-2! w-full min-w-0"
													showUpdateImportPaths={false}
												/>
											</div>
											<ScrollBar orientation="vertical" />
										</ScrollArea>
									</DialogContent>
								</Dialog>
							);
						})}
					</div>
				</div>

				{/* MCP Servers Guide */}
				<Separator decoration />
				<div className="flex flex-col gap-8 w-full pt-4 pb-12">
				<div className="grid grid-cols-2 items-start justify-center gap-12 px-6">
						{mcps.map((mcp, index) => (
							<Dialog key={mcp.name}>
							<DialogTrigger className="w-auto! h-full flex items-center justify-center cursor-pointer">
								<Card className="w-[350px] h-full">
									<CardHeader className="flex flex-col items-start justify-start">
										<CardTitle>{mcp.title}</CardTitle>
										<CardDescription className="text-start text-pretty">{mcp.description}</CardDescription>
									</CardHeader>
								</Card>
							</DialogTrigger>
							<DialogContent className="max-w-5xl! w-full! max-h-[65vh] overflow-hidden" containerClassName="max-w-5xl! w-full! max-h-[65vh] flex flex-col min-h-0 overflow-hidden">
								<DialogHeader className="shrink-0">
									<DialogTitle>{mcp.title}</DialogTitle>
									<DialogDescription>
									{mcp.description}
									</DialogDescription>
								</DialogHeader>
								<ScrollArea className="flex-1 min-h-0 w-full overflow-x-hidden" maskColor="from-background" viewportClassName="overflow-x-hidden">
								

									<div className="pr-0 min-w-0 flex flex-col items-end justify-end gap-4">
									<Button variant="outline" size="sm" asChild>
												<Link
													href={mcp.docsUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													Documentation
													<ArrowUpRight className="ml-2 h-4 w-4" />
												</Link>
											</Button>
									<CodeBlock
											data={[mcp.config]}
											defaultValue={mcp.config.filename}
										>
											<CodeBlockHeader>
												<CodeBlockFiles>
													{(item) => (
														<CodeBlockFilename
															key={item.filename}
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
														key={item.filename}
														value={item.filename}
													>
														<CodeBlockContent language="json">
															{item.code}
														</CodeBlockContent>
													</CodeBlockItem>
												)}
											</CodeBlockBody>
										</CodeBlock>
									</div>
									<ScrollBar orientation="vertical" />
								</ScrollArea>
							</DialogContent>
						</Dialog>

							
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

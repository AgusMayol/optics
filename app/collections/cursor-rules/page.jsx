"use client";
import * as React from "react";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Separator } from "@/registry/optics/separator";
import { InstallationGuide } from "@/components/installation-guide";
import { FFResolver } from "@/components/ff-resolver";
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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import generalCode from "@/registry/optics/cursor/rules/general.mdc.txt";
import frontEndCode from "@/registry/optics/cursor/rules/front-end.mdc.txt";
import backEndCode from "@/registry/optics/cursor/rules/back-end.mdc.txt";
import reactOptimizationCode from "@/registry/optics/cursor/rules/react-optimization.mdc.txt";
import webInterfaceGuidelinesCode from "@/registry/optics/cursor/rules/web-interface-guidelines.mdc.txt";
import commitsConventionCode from "@/registry/optics/cursor/rules/commits-convention.mdc.txt";
import bulkProcessingCode from "@/registry/optics/cursor/rules/bulk-processing.mdc.txt";

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
		docsUrl: "https://www.shadcn.io/mcp/cursor",
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
			"https://github.com/modelcontextprotocol/servers/tree/main/src/github",
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
		docsUrl: "https://www.mcp.pizza/mcp-server/NEav/Supabase-MCP",
	},
];

export default function Page() {
	const [registryPrefixState, setRegistryPrefixState] = React.useState(false);
	const [selectedPackageManager, setSelectedPackageManager] =
		React.useState("bun");
	const [installationTab, setInstallationTab] = React.useState("tab1");

	React.useEffect(() => {
		async function fetchRegistryPrefix() {
			const registryPrefixValue = await FFResolver();
			setRegistryPrefixState(registryPrefixValue);
		}
		fetchRegistryPrefix();
	}, []);

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
					<div className="flex flex-col gap-12">
						{cursorRules.map((rule, index) => {
							const manualFiles = [
								{
									path: rule.path,
									code: rule.code,
								},
							];

							return (
								<div key={rule.name} className="flex flex-col gap-4">
									{index > 0 && <Separator decoration />}
									<div className="flex flex-col gap-0 px-6 py-4 lg:py-8 lg:px-12">
										<div className="flex flex-col gap-2">
											<h3 className="text-2xl lg:text-3xl font-bold tracking-tight truncate">
												{rule.title}
											</h3>
											<p className="text-sm lg:text-lg text-muted-foreground">
												{rule.description}
											</p>
										</div>
										<InstallationGuide
											value={selectedPackageManager}
											setValue={setSelectedPackageManager}
											componentName={rule.name}
											installDeps={[]}
											manualFiles={manualFiles}
											installationTab={installationTab}
											handleTabChange={setInstallationTab}
											className="px-0!"
											showUpdateImportPaths={false}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* MCP Servers Guide */}
				<Separator decoration />
				<div className="flex flex-col gap-8 w-full pt-4">
					<div className="flex flex-col gap-12">
						{mcps.map((mcp, index) => (
							<div key={mcp.name} className="flex flex-col gap-4">
								{index > 0 && <Separator decoration />}
								<div className="flex flex-col gap-0 px-6 py-4 lg:py-8 lg:px-12">
									<div className="flex flex-col gap-2">
										<div className="flex items-start justify-between gap-4">
											<div className="flex flex-col gap-2 flex-1">
												<h3 className="text-2xl lg:text-3xl font-bold tracking-tight truncate">
													{mcp.title}
												</h3>
												<p className="text-sm lg:text-lg text-muted-foreground">
													{mcp.description}
												</p>
											</div>
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
										</div>
									</div>
									<div className="mt-4">
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
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

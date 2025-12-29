"use client";
import { InstallationGuide } from "@/components/installation-guide";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { Button } from "@/registry/optics/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/optics/card";
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
import backEndCode from "@/registry/optics/dist/cursor/rules/back-end.mdc.txt";
import bulkProcessingCode from "@/registry/optics/dist/cursor/rules/bulk-processing.mdc.txt";
import commitsConventionCode from "@/registry/optics/dist/cursor/rules/commits-convention.mdc.txt";
import frontEndCode from "@/registry/optics/dist/cursor/rules/front-end.mdc.txt";
import generalCode from "@/registry/optics/dist/cursor/rules/general.mdc.txt";
import reactOptimizationCode from "@/registry/optics/dist/cursor/rules/react-optimization.mdc.txt";
import webInterfaceGuidelinesCode from "@/registry/optics/dist/cursor/rules/web-interface-guidelines.mdc.txt";
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/registry/optics/dialog";
import { ScrollArea, ScrollBar } from "@/registry/optics/scroll-area";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/registry/optics/alert";

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
		docsUrl: "https://github.com/github/github-mcp-server",
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
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">Cursor Rules</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					Install Cursor rules to enhance your development workflow with Optics
					guidelines.
				</p>
				<Alert variant="destructive">
					<AlertCircle />
					<AlertTitle>CLI Installation Not Recommended</AlertTitle>
					<AlertDescription>
						Due to an error during the installation of the rules via the CLI, it
						is recommended to install the rules manually until the problem is
						resolved.
					</AlertDescription>
				</Alert>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 pt-4">
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
												<CardTitle className="text-20 font-medium!">
													{rule.title}
												</CardTitle>
												<CardDescription className="text-start text-16 font-normal! text-muted-foreground text-pretty">
													{rule.description}
												</CardDescription>
											</CardHeader>
										</Card>
									</DialogTrigger>
									<DialogPopup
										className="max-w-5xl! w-full! max-h-[65vh] overflow-hidden"
										containerClassName="max-w-5xl! w-full! max-h-[65vh] flex flex-col min-h-0 overflow-hidden pb-6"
									>
										<DialogHeader className="shrink-0">
											<DialogTitle className="text-24">
												{rule.title}
											</DialogTitle>
											<DialogDescription>{rule.description}</DialogDescription>
										</DialogHeader>
										<ScrollArea
											className="flex-1 min-h-0 w-full overflow-x-hidden"
											maskColor="from-background"
											viewportClassName="overflow-x-hidden"
										>
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
									</DialogPopup>
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
											<CardTitle className="text-20 font-medium!">
												{mcp.title}
											</CardTitle>
											<CardDescription className="text-start text-16 font-normal! text-muted-foreground text-pretty">
												{mcp.description}
											</CardDescription>
										</CardHeader>
									</Card>
								</DialogTrigger>
								<DialogPopup
									className="max-w-5xl! w-full! max-h-[65vh] overflow-hidden"
									containerClassName="max-w-5xl! w-full! max-h-[65vh] flex flex-col min-h-0 overflow-hidden pb-6"
								>
									<DialogHeader className="shrink-0">
										<DialogTitle className="text-24">{mcp.title}</DialogTitle>
										<DialogDescription>{mcp.description}</DialogDescription>
									</DialogHeader>
									<ScrollArea
										className="flex-1 min-h-0 w-full overflow-x-hidden"
										maskColor="from-background"
										viewportClassName="overflow-x-hidden"
									>
										<div className="pr-0 min-w-0 flex flex-col items-end justify-end gap-4">
											<Button
												variant="outline"
												size="sm"
												nativeButton={false}
												render={
													<Link
														href={mcp.docsUrl}
														target="_blank"
														rel="noopener noreferrer"
													>
														Documentation
														<ArrowUpRight className="ml-2 h-4 w-4" />
													</Link>
												}
											/>
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
								</DialogPopup>
							</Dialog>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

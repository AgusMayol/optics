"use client";
import { useMemo } from "react";
import type { PackageManagerCommand } from "@/lib/use-cookie-preferences";
import { cn } from "@/lib/utils";
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
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import { ShowMore } from "@/registry/optics/show-more";
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from "@/registry/optics/tabs";

export interface ManualFile {
	path: string;
	code: string;
	filename?: string;
	language?: string;
}

export interface InstallationGuideProps {
	value: string;
	setValue: (value: string) => void;
	componentName: string;
	installDeps?: PackageManagerCommand[];
	manualFiles?: ManualFile[];
	installationTab: string;
	handleTabChange: (tab: string) => void;
	className?: string;
	showUpdateImportPaths?: boolean;
}

export function InstallationGuide({
	value,
	setValue,
	componentName,
	installDeps = [],
	manualFiles = [],
	installationTab,
	handleTabChange,
	className = "",
	showUpdateImportPaths = true,
}: InstallationGuideProps) {
	const commands = useMemo(() => {
		const registryPrefix = "@optics";

		return [
			{
				label: "pnpm",
				code: `pnpm dlx shadcn@latest add ${registryPrefix}/${componentName}`,
			},
			{
				label: "npm",
				code: `npx shadcn@latest add ${registryPrefix}/${componentName}`,
			},
			{
				label: "yarn",
				code: `yarn shadcn@latest add ${registryPrefix}/${componentName}`,
			},
			{
				label: "bun",
				code: `bunx --bun shadcn@latest add ${registryPrefix}/${componentName}`,
			},
		];
	}, [componentName]);

	return (
		<div
			className={cn(
				"flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0 w-full min-w-0",
				className,
			)}
		>
			<h2 className="text-20 shrink-0">Installation</h2>
			<Tabs
				value={installationTab}
				onValueChange={(nextTab) => {
					if (typeof nextTab === "string") {
						handleTabChange(nextTab);
					}
				}}
				className="w-full min-w-0"
			>
				<TabsList variant="underline" className="shrink-0">
					<TabsTrigger value="tab1">CLI</TabsTrigger>
					<TabsTrigger value="tab2">Manual</TabsTrigger>
				</TabsList>
				<TabsContents mode="layout" className="w-full pt-2 min-w-0">
					<TabsContent value="tab1" className="w-full pt-4 min-w-0">
						<Snippet
							onValueChange={(nextValue) => {
								if (typeof nextValue === "string") {
									setValue(nextValue);
								}
							}}
							value={value}
							className="w-full"
						>
							<SnippetHeader>
								<SnippetTabsList variant="outline">
									{commands.map((command) => (
										<SnippetTabsTrigger key={command.label} value={command.label}>
											<span>{command.label}</span>
										</SnippetTabsTrigger>
									))}
								</SnippetTabsList>
							</SnippetHeader>
							<SnippetTabsContents>
								{commands.map((command) => (
									<SnippetTabsContent
										key={command.label}
										value={command.label}
										className="w-full flex items-center justify-between gap-8 py-2 pr-2"
										textClassName="text-[13px]"
									>
										{command.code}
										{command.label === value && <SnippetCopyButton value={command.code} />}
									</SnippetTabsContent>
								))}
							</SnippetTabsContents>
						</Snippet>
					</TabsContent>

					<TabsContent value="tab2" className="w-full pt-4 flex flex-col gap-12 min-w-0">
						{installDeps.length > 0 && (
							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Install the following dependencies:
								</p>

								<Snippet
									onValueChange={(nextValue) => {
										if (typeof nextValue === "string") {
											setValue(nextValue);
										}
									}}
									value={value}
									className="w-full"
								>
									<SnippetHeader>
										<SnippetTabsList variant="outline">
											{installDeps.map((command) => (
												<SnippetTabsTrigger key={command.label} value={command.label}>
													<span>{command.label}</span>
												</SnippetTabsTrigger>
											))}
										</SnippetTabsList>
									</SnippetHeader>
									<SnippetTabsContents>
										{installDeps.map((command) => (
											<SnippetTabsContent
												key={command.label}
												value={command.label}
												className="w-full flex items-center justify-between gap-8 py-2 pr-2"
												textClassName="text-[13px]"
											>
												{command.code}
												{command.label === value && <SnippetCopyButton value={command.code} />}
											</SnippetTabsContent>
										))}
									</SnippetTabsContents>
								</Snippet>
							</div>
						)}

						{manualFiles.length > 0 && (
							<div className="w-full flex flex-col gap-8">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								{(() => {
									const getLanguageFromPath = (path: string): string => {
										if (path.endsWith(".mdc")) return "markdown";
										if (path.endsWith(".jsx")) return "jsx";
										if (path.endsWith(".tsx")) return "tsx";
										if (path.endsWith(".js")) return "javascript";
										if (path.endsWith(".ts")) return "typescript";
										if (path.endsWith(".css")) return "css";
										if (path.endsWith(".json")) return "json";
										return "tsx";
									};

									const renderCodeBlock = (file: ManualFile, index: number) => {
										const language = file.language || getLanguageFromPath(file.path);
										const filename = file.filename || file.path;
										const codeBlockFile = {
											...file,
											filename,
											language,
										};
										return (
											<div key={file.path || index} className="w-full flex flex-col gap-2 min-w-0">
												<CodeBlock
													data={[codeBlockFile]}
													defaultValue={codeBlockFile.filename}
													className="w-full min-w-0"
												>
													<CodeBlockHeader>
														<CodeBlockFiles>
															{(item) => (
																<CodeBlockFilename key={item.filename} value={item.filename}>
																	{item.filename}
																</CodeBlockFilename>
															)}
														</CodeBlockFiles>

														<CodeBlockCopyButton variant="ghost" />
													</CodeBlockHeader>
													<CodeBlockBody>
														{(item) => (
															<CodeBlockItem key={item.filename} value={item.filename}>
																<CodeBlockContent
																	language={language}
																	className="bg-sidebar text-[13px]"
																>
																	{item.code}
																</CodeBlockContent>
															</CodeBlockItem>
														)}
													</CodeBlockBody>
												</CodeBlock>
											</div>
										);
									};

									if (manualFiles.length === 1) {
										return renderCodeBlock(manualFiles[0], 0);
									}

									const firstFile = manualFiles[0];
									const remainingFiles = manualFiles.slice(1);

									return (
										<ShowMore
											moreContent={
												<div className="flex flex-col gap-8 mt-12">
													{remainingFiles.map((file, index) => renderCodeBlock(file, index + 1))}
												</div>
											}
											showSeparator={false}
										>
											{renderCodeBlock(firstFile, 0)}
										</ShowMore>
									);
								})()}
							</div>
						)}

						{manualFiles.length > 0 && showUpdateImportPaths && (
							<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
								Update the import paths to match your project setup.
							</p>
						)}
					</TabsContent>
				</TabsContents>
			</Tabs>
		</div>
	);
}

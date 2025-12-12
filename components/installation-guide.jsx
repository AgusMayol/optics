"use client";
import { useEffect, useState, useMemo } from "react";
import { FFResolver } from "@/components/ff-resolver";
import { cn } from "@/lib/utils";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFiles,
	CodeBlockFilename,
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
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ShowMore } from "@/registry/optics/show-more";

/**
 * Generates CLI commands for a component based on the registry prefix
 * @param {string} componentName - Name of the component (e.g., "button", "card")
 * @returns {Array} Array of command objects with label and code
 */

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
}) {
	const [registryPrefixState, setRegistryPrefixState] = useState(false);
	useEffect(() => {
		async function fetchRegistryPrefix() {
			const registryPrefixValue = await FFResolver();
			setRegistryPrefixState(registryPrefixValue);
		}
		fetchRegistryPrefix();
	}, []);

	const commands = useMemo(() => {
		const registryPrefix = registryPrefixState
			? "@optics"
			: `https://${process.env.NEXT_PUBLIC_DOMAIN}/r`;
		const finalComponentName = registryPrefixState
			? componentName
			: `${componentName}.json`;

		return [
			{
				label: "pnpm",
				code: `pnpm dlx shadcn@latest add ${registryPrefix}/${finalComponentName}`,
			},
			{
				label: "npm",
				code: `npx shadcn@latest add ${registryPrefix}/${finalComponentName}`,
			},
			{
				label: "yarn",
				code: `yarn shadcn@latest add ${registryPrefix}/${finalComponentName}`,
			},
			{
				label: "bun",
				code: `bunx --bun shadcn@latest add ${registryPrefix}/${finalComponentName}`,
			},
		];
	}, [registryPrefixState, componentName]);

	// Calculate activeCommand and activeDepsCommand based on current value and commands
	const activeCommand = useMemo(() => {
		return commands.find((command) => command.label === value);
	}, [commands, value]);

	const activeDepsCommand = useMemo(() => {
		return installDeps.find((command) => command.label === value);
	}, [installDeps, value]);
	return (
		<div
			className={cn(
				"flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0 w-full min-w-0",
				className,
			)}
		>
			<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold shrink-0">
				Installation
			</h2>
			<Tabs
				value={installationTab}
				onValueChange={handleTabChange}
				className="w-full min-w-0"
			>
				<TabsList variant="underline" className="shrink-0">
					<TabsTrigger value="tab1">CLI</TabsTrigger>
					<TabsTrigger value="tab2">Manual</TabsTrigger>
				</TabsList>
				<TabsContents mode="layout" className="w-full pt-2 min-w-0">
					{/* Tab CLI */}
					<TabsContent value="tab1" className="w-full pt-4 min-w-0">
						<Snippet onValueChange={setValue} value={value} className="w-full">
							<SnippetHeader>
								<SnippetTabsList variant="outline">
									{commands.map((command) => (
										<SnippetTabsTrigger
											key={command.label}
											value={command.label}
										>
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
									>
										{command.code}
										{command.label === value && (
											<SnippetCopyButton value={command.code} />
										)}
									</SnippetTabsContent>
								))}
							</SnippetTabsContents>
						</Snippet>
					</TabsContent>

					{/* Tab Manual */}
					<TabsContent
						value="tab2"
						className="w-full pt-4 flex flex-col gap-12 min-w-0"
					>
						{/* Sección de dependencias */}
						{installDeps.length > 0 && (
							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Install the following dependencies:
								</p>

								<Snippet
									onValueChange={setValue}
									value={value}
									className="w-full"
								>
									<SnippetHeader>
										<SnippetTabsList variant="outline">
											{installDeps.map((command) => (
												<SnippetTabsTrigger
													key={command.label}
													value={command.label}
												>
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
											>
												{command.code}
												{command.label === value && (
													<SnippetCopyButton value={command.code} />
												)}
											</SnippetTabsContent>
										))}
									</SnippetTabsContents>
								</Snippet>
							</div>
						)}

						{/* Sección de archivos */}
						{manualFiles.length > 0 && (
							<div className="w-full flex flex-col gap-8">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								{(() => {
									const getLanguageFromPath = (path) => {
										if (path.endsWith(".mdc")) return "markdown";
										if (path.endsWith(".jsx")) return "jsx";
										if (path.endsWith(".tsx")) return "tsx";
										if (path.endsWith(".js")) return "javascript";
										if (path.endsWith(".ts")) return "typescript";
										if (path.endsWith(".css")) return "css";
										if (path.endsWith(".json")) return "json";
										return "jsx";
									};

									const renderCodeBlock = (file, index) => {
										const language =
											file.language || getLanguageFromPath(file.path);
										// Transform file to match CodeBlock expected format
										const codeBlockFile = {
											...file,
											filename: file.filename || file.path,
										};
										return (
											<div
												key={file.path || index}
												className="w-full flex flex-col gap-2 min-w-0"
											>
												<CodeBlock
													data={[codeBlockFile]}
													defaultValue={codeBlockFile.filename}
													className="w-full min-w-0"
												>
													<CodeBlockHeader>
														<CodeBlockFiles>
															{(item) => (
																<CodeBlockFilename
																	key={item.filename || item.path}
																	value={item.filename || item.path}
																>
																	{item.filename || item.path}
																</CodeBlockFilename>
															)}
														</CodeBlockFiles>

														<CodeBlockCopyButton variant="ghost" />
													</CodeBlockHeader>
													<CodeBlockBody>
														{(item) => (
															<CodeBlockItem
																key={item.filename || item.path}
																value={item.filename || item.path}
															>
																<CodeBlockContent
																	language={language}
																	className="bg-sidebar"
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

									// If there's only one file, render it normally
									if (manualFiles.length === 1) {
										return renderCodeBlock(manualFiles[0], 0);
									}

									// If there are multiple files, use ShowMore
									const firstFile = manualFiles[0];
									const remainingFiles = manualFiles.slice(1);

									return (
										<ShowMore
											moreContent={
												<div className="flex flex-col gap-8 mt-12">
													{remainingFiles.map((file, index) =>
														renderCodeBlock(file, index + 1),
													)}
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

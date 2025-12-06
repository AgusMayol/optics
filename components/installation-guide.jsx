"use client";
import { useEffect, useState } from "react";
import { FFResolver } from "@/components/ff-resolver";
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
	activeCommand,
	activeDepsCommand,
	componentName,
	installDeps = [],
	manualFiles = [],
	installationTab,
	handleTabChange,
}) {
    const [registryPrefixState, setRegistryPrefixState] = useState(false);
    useEffect(() => {
        async function fetchRegistryPrefix() {
            const registryPrefixValue = await FFResolver();
            setRegistryPrefixState(registryPrefixValue);
        }
        fetchRegistryPrefix();
    }, []);

    
	const commands = generateCommands(componentName);
    function generateCommands(componentName) {
        
        const registryPrefix = registryPrefixState ? "@optics" : `https://${process.env.NEXT_PUBLIC_DOMAIN}/r`;
        componentName = registryPrefixState ? componentName : `${componentName}.json`;
    
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
    }
	return (
		<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
			<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
				Installation
			</h2>
			<Tabs
				value={installationTab}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList variant="underline">
					<TabsTrigger value="tab1">CLI</TabsTrigger>
					<TabsTrigger value="tab2">Manual</TabsTrigger>
				</TabsList>
				<TabsContents className="w-full pt-2">
					{/* Tab CLI */}
					<TabsContent value="tab1" className="w-full pt-4">
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
										{activeCommand && (
											<SnippetCopyButton value={activeCommand.code} />
										)}
									</SnippetTabsContent>
								))}
							</SnippetTabsContents>
						</Snippet>
					</TabsContent>

					{/* Tab Manual */}
					<TabsContent
						value="tab2"
						className="w-full pt-4 flex flex-col gap-12"
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
												{activeDepsCommand && (
													<SnippetCopyButton value={activeDepsCommand.code} />
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
								const renderCodeBlock = (file, index) => (
									<div key={file.path || index} className="w-full flex flex-col gap-2">
										<CodeBlock
											data={[file]}
											defaultValue={file.path}
										>
											<CodeBlockHeader>
												<CodeBlockFiles>
													{(item) => (
														<CodeBlockFilename
															key={item.path}
															value={item.path}
														>
															{item.path}
														</CodeBlockFilename>
													)}
												</CodeBlockFiles>

												<CodeBlockCopyButton variant="ghost" />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem key={item.path} value={item.path}>
														<CodeBlockContent
															language="jsx"
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
													renderCodeBlock(file, index + 1)
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

						{manualFiles.length > 0 && (
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

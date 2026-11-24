"use client";
import { ArrowUpRight } from "lucide-react";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { ComponentNavigation } from "@/components/component-navigation";
import { InstallationGuide, type ManualFile } from "@/components/installation-guide";
import { type ComponentPropsGroup, PropsTable } from "@/components/props-table";
import { ForesightLink as Link } from "@/components/link";
import { type PackageManagerCommand, useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	type CodeBlockData,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Separator } from "@/registry/optics/separator";

export interface ComponentConfigHeader {
	title: string;
	description?: string;
	href?: string;
	hrefText?: string;
}

export interface ComponentConfigContent {
	children: ReactNode;
	imports?: string;
	filename?: string;
	code?: string;
	additionalCodeFiles?: CodeBlockData[];
}

export interface ComponentConfigInstallation {
	componentName: string;
	dependencies?: string;
	installDeps?: PackageManagerCommand[];
	manualFiles?: ManualFile[];
}

export interface ComponentConfigData {
	header?: ComponentConfigHeader;
	content?: ComponentConfigContent;
	installation?: ComponentConfigInstallation;
	props?: ComponentPropsGroup[] | string;
}

const ComponentConfigContext = createContext<ComponentConfigData | null>(null);

export function ComponentConfig({
	config,
	children,
}: {
	config: ComponentConfigData;
	children?: ReactNode;
}) {
	return (
		<ComponentConfigContext.Provider value={config}>
			{children}
			<ConfigReader />
		</ComponentConfigContext.Provider>
	);
}

function getElementDisplayName(type: unknown): string {
	if (typeof type === "string") return type;
	if (typeof type === "function" || (typeof type === "object" && type !== null)) {
		const typed = type as {
			displayName?: string;
			name?: string;
			render?: { displayName?: string; name?: string };
		};
		return (
			typed.displayName ||
			typed.name ||
			typed.render?.displayName ||
			typed.render?.name ||
			"UnknownElementType"
		);
	}
	return "UnknownElementType";
}

function LayoutContent({ config }: { config: ComponentConfigData }) {
	const headerData = config?.header || null;
	const contentData = config?.content || null;
	const installationData = config?.installation || null;
	const propsData = config?.props || null;

	const processedInstallationData = useMemo(
		() =>
			installationData
				? {
						...installationData,
						installDeps:
							installationData.installDeps ||
							(installationData.dependencies && typeof installationData.dependencies === "string"
								? generateInstallDeps(installationData.dependencies)
								: []),
					}
				: null,
		[installationData],
	);

	if (contentData?.code) {
		throw new Error(
			"The 'code' prop in content configuration is deprecated. Please remove it and allow the layout to generate code from 'children' automatically.",
		);
	}

	const generatedCode = useMemo<CodeBlockData[] | null>(() => {
		if (!contentData?.children) return null;

		const childrenJSX = reactElementToJSXString(contentData.children, {
			showDefaultProps: false,
			showFunctions: true,
			functionValue: (fn: { name?: string; toString: () => string }) =>
				fn.name ? fn.name : fn.toString(),
			displayName: (element) => {
				if (typeof element === "object" && element !== null && "type" in element) {
					return getElementDisplayName(element.type);
				}
				return "UnknownElementType";
			},
		});
		const imports = contentData.imports || "";

		return [
			{
				filename: contentData.filename || "component.tsx",
				language: "tsx",
				code: `${imports ? `${imports}\n\n` : ""}${childrenJSX}`.trim(),
			},
			...(contentData.additionalCodeFiles || []),
		];
	}, [contentData]);

	const codeToDisplay = generatedCode;
	const activeCodeFile = codeToDisplay?.[0]?.filename || undefined;
	const [currentActiveCodeFile, setCurrentActiveCodeFile] = useState<string | undefined>(
		activeCodeFile,
	);

	return (
		<>
			{headerData && (
				<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
					<div className="w-full flex items-center justify-between">
						<h1 className="text-32 tracking-tight! truncate">{headerData.title}</h1>
						{headerData.href && (
							<Button
								variant="link"
								size="sm"
								nativeButton={false}
								render={
									<Link href={headerData.href} target="_blank" rel="noopener noreferrer">
										{headerData.hrefText}
										<ArrowUpRight className="-ml-1" />
									</Link>
								}
							/>
						)}
					</div>
					{headerData.description && (
						<p className="text-muted-foreground text-20 font-normal! text-pretty">
							{headerData.description}
						</p>
					)}
				</div>
			)}

			<Separator decoration />

			{contentData && codeToDisplay && (
				<div className="flex flex-col flex-1 gap-2 p-6 lg:p-12 pt-4">
					<span className="text-xs font-semibold text-muted-foreground px-2">
						{headerData?.title}
					</span>
					<Card className="pb-0 ring-0 py-0 gap-0 rounded-t-xl border-0">
						<CardContent className="px-8 py-8 bg-sidebar flex flex-col items-center border border-dashed border-b-0 rounded-none rounded-t-xl">
							{contentData.children}
						</CardContent>

						<CardFooter className="border px-0 py-0 bg-background rounded-b-xl pt-0! -mb-0!">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Show Code
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={codeToDisplay}
											defaultValue={codeToDisplay[0]?.filename}
											value={currentActiveCodeFile}
											onValueChange={setCurrentActiveCodeFile}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem key={item.filename} value={item.filename}>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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
			)}

			{processedInstallationData && (
				<InstallationGuideWrapper
					componentName={processedInstallationData.componentName}
					installDeps={processedInstallationData.installDeps || []}
					manualFiles={processedInstallationData.manualFiles || []}
				/>
			)}

			{propsData && propsData.length > 0 && (
				<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
					<h2 className="text-20">Props</h2>
					<PropsTable data={propsData} />
				</div>
			)}

			<ComponentNavigation />
		</>
	);
}

function generateInstallDeps(depsString: string): PackageManagerCommand[] {
	if (!depsString) return [];

	const deps = depsString.trim().split(/\s+/);
	const depsList = deps.join(" ");

	return [
		{
			label: "pnpm",
			code: `pnpm add ${depsList}`,
		},
		{
			label: "npm",
			code: `npm install ${depsList}`,
		},
		{
			label: "yarn",
			code: `yarn add ${depsList}`,
		},
		{
			label: "bun",
			code: `bun add ${depsList}`,
		},
	];
}

function ConfigReader() {
	const config = useContext(ComponentConfigContext);
	return config ? <LayoutContent config={config} /> : null;
}

export default function ComponentsLayout({ children }: { children: ReactNode }) {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background">
			{children}
		</main>
	);
}

function InstallationGuideWrapper({
	componentName,
	installDeps,
	manualFiles,
}: {
	componentName: string;
	installDeps: PackageManagerCommand[];
	manualFiles: ManualFile[];
}) {
	const { value, setValue, installationTab, handleTabChange } = useCookiePreferences(
		componentName,
		installDeps,
	);

	return (
		<InstallationGuide
			value={value}
			setValue={setValue}
			componentName={componentName}
			installDeps={installDeps}
			manualFiles={manualFiles}
			installationTab={installationTab}
			handleTabChange={handleTabChange}
		/>
	);
}

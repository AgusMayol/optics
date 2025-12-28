"use client";
import { useState, createContext, useContext, useMemo } from "react";
import { ComponentNavigation } from "@/components/component-navigation";
import { InstallationGuide } from "@/components/installation-guide";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { Separator } from "@/registry/optics/separator";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import { Button } from "@/registry/optics/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import reactElementToJSXString from "react-element-to-jsx-string";

// Context para pasar la configuración de forma síncrona
const ComponentConfigContext = createContext(null);

export function ComponentConfig({ config, children }) {
	return (
		<ComponentConfigContext.Provider value={config}>
			{children}
			<ConfigReader />
		</ComponentConfigContext.Provider>
	);
}

function LayoutContent({ config }) {
	const headerData = config?.header || null;
	const contentData = config?.content || null;
	const installationData = config?.installation || null;
	const propsData = config?.props || null;

	// Generar installDeps si se pasa un string de dependencias
	const processedInstallationData = useMemo(
		() =>
			installationData
				? {
						...installationData,
						installDeps:
							installationData.installDeps ||
							(installationData.dependencies &&
							typeof installationData.dependencies === "string"
								? generateInstallDeps(installationData.dependencies)
								: []),
					}
				: null,
		[installationData],
	);

	// Generar código automáticamente desde children si no se proporciona
	const generatedCode = useMemo(() => {
		if (!contentData?.children || contentData?.code) return null;

		const childrenJSX = reactElementToJSXString(contentData.children);
		const imports = contentData.imports || "";

		return [
			{
				filename: contentData.filename || "component.jsx",
				language: "jsx",
				code: `${imports ? `${imports}\n\n` : ""}${childrenJSX}`.trim(),
			},
			...(contentData.additionalCodeFiles || []),
		];
	}, [contentData]);

	const codeToDisplay = contentData?.code || generatedCode;
	const activeCodeFile = codeToDisplay?.[0]?.filename || null;
	const [currentActiveCodeFile, setCurrentActiveCodeFile] =
		useState(activeCodeFile);

	return (
		<>
			{/* Header */}
			{headerData && (
				<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
					<div className="w-full flex items-center justify-between">
						<h1 className="text-32 tracking-tight! truncate">
							{headerData.title}
						</h1>
						{headerData.href && (
							<Button
								variant="link"
								size="sm"
								nativeButton={false}
								render={
									<Link
										href={headerData.href}
										target="_blank"
										rel="noopener noreferrer"
									>
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

			{/* Content */}
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
							<Accordion type={"single"} collapsible className="w-full">
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
													<CodeBlockItem
														key={item.filename}
														value={item.filename}
													>
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

			{/* Installation Guide */}
			{processedInstallationData && (
				<InstallationGuideWrapper
					componentName={processedInstallationData.componentName}
					installDeps={processedInstallationData.installDeps || []}
					manualFiles={processedInstallationData.manualFiles || []}
				/>
			)}

			{/* Props Table */}
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

/**
 * Genera el array de installDeps desde un string de dependencias
 * @param {string} depsString - String con las dependencias separadas por espacios (ej: "@base-ui/react lucide-react")
 * @returns {Array} Array de objetos con label y code para cada package manager
 */
function generateInstallDeps(depsString) {
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

/**
 * Extrae el string de dependencias desde un array de installDeps
 * @param {Array} installDeps - Array de objetos con label y code
 * @returns {string} String con las dependencias separadas por espacios
 */
function extractDependenciesFromInstallDeps(installDeps) {
	if (!installDeps || installDeps.length === 0) return "";

	// Tomar el primer código (pnpm) y extraer las dependencias después de "add" o "install"
	const firstCode = installDeps[0]?.code || "";
	const match = firstCode.match(
		/(?:pnpm add|npm install|yarn add|bun add)\s+(.+)/,
	);
	return match ? match[1].trim() : "";
}

function ConfigReader() {
	const config = useContext(ComponentConfigContext);
	return config ? <LayoutContent config={config} /> : null;
}

export default function ComponentsLayout({ children }) {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background">
			{children}
		</main>
	);
}

// Componente wrapper para manejar useCookiePreferences internamente
function InstallationGuideWrapper({ componentName, installDeps, manualFiles }) {
	const { value, setValue, installationTab, handleTabChange } =
		useCookiePreferences(componentName, installDeps);

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

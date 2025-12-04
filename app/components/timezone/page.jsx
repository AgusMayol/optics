"use client";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
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
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { Timezone } from "@/registry/optics/timezone";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const code = [
	{
		language: "jsx",
		filename: "timezone.jsx",
		code: `import { Timezone } from "@/registry/optics/timezone";
import { Button } from "@/registry/optics/button";

<Timezone 
	timestamp={Date.now() - 5 * 60 * 1000} 
	asChild
	side="top"
	sideOffset={4}
>
	<Button variant="raised">Open Timezone</Button>
</Timezone>`,
	},
];

const timezoneComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/timezone.jsx",
		code: `"use client";

import * as React from "react";
import ms from "ms";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/registry/optics/tooltip";

// Constantes de tiempo calculadas una vez para evitar recálculos
const ONE_SECOND = ms("1s");
const ONE_MINUTE = ms("1m");
const ONE_HOUR = ms("1h");
const ONE_DAY = ms("1d");

function Timezone({
	timestamp,
	asChild = false,
	children,
	className,
	side,
	sideOffset,
	...props
}) {
	const [userTimezone, setUserTimezone] = React.useState(null);
	const [formattedUserTime, setFormattedUserTime] = React.useState("");
	const [formattedUtcTime, setFormattedUtcTime] = React.useState("");
	const [relativeTime, setRelativeTime] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);

	// Memoizar los formatters para evitar recrearlos en cada render
	const utcFormatter = React.useMemo(
		() =>
			new Intl.DateTimeFormat("en-US", {
				timeZone: "UTC",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}),
		[],
	);

	const userFormatter = React.useMemo(
		() =>
			userTimezone
				? new Intl.DateTimeFormat("en-US", {
						timeZone: userTimezone,
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "numeric",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					})
				: null,
		[userTimezone],
	);

	React.useEffect(() => {
		// Obtener el huso horario del usuario de manera no invasiva
		if (typeof window !== "undefined") {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			setUserTimezone(timeZone);
		}
	}, []);

	// Función para actualizar los valores de tiempo
	const updateTimeValues = React.useCallback(() => {
		if (!timestamp || !userTimezone || !userFormatter) return;

		// Convertir timestamp a Date
		// Acepta: string ISO (timestampz), número en milisegundos, o número en segundos
		let date;
		if (typeof timestamp === "string") {
			// String ISO (timestampz) o timestamp en string
			date = new Date(timestamp);
		} else if (typeof timestamp === "number") {
			// Si es menor a 1e12, asumimos que está en segundos y lo convertimos a milisegundos
			// Si es mayor o igual, asumimos que ya está en milisegundos
			date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
		} else {
			date = new Date(timestamp);
		}

		// Validar que la fecha sea válida
		if (isNaN(date.getTime())) {
			setFormattedUserTime("Invalid date");
			setFormattedUtcTime("Invalid date");
			setRelativeTime("Invalid date");
			return;
		}

		// Formatear fecha en UTC
		setFormattedUtcTime(utcFormatter.format(date));

		// Formatear fecha en la zona horaria del usuario
		setFormattedUserTime(userFormatter.format(date));

		// Calcular tiempo relativo usando constantes precalculadas
		const now = new Date();
		const diffInMs = date.getTime() - now.getTime();
		const absDiffInMs = Math.abs(diffInMs);
		const isPast = diffInMs < 0;
		const direction = isPast ? "ago" : "in";

		let relative;

		// Si está dentro de los minutos (< 1 hora), mostrar minutos y segundos
		if (absDiffInMs < ONE_HOUR) {
			const minutes = Math.floor(absDiffInMs / ONE_MINUTE);
			const remainingMs = absDiffInMs % ONE_MINUTE;
			const seconds = Math.floor(remainingMs / ONE_SECOND);

			if (seconds > 0 && minutes > 0) {
				// Mostrar minutos y segundos
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				const secondsStr = ms(seconds * ONE_SECOND, { long: true });
				relative = \`\${minutesStr} \${secondsStr} \${direction}\`;
			} else if (minutes > 0) {
				// Solo minutos
				relative = \`\${ms(minutes * ONE_MINUTE, { long: true })} \${direction}\`;
			} else {
				// Solo segundos
				relative = \`\${ms(absDiffInMs, { long: true })} \${direction}\`;
			}
		}
		// Si está dentro de las horas (< 24 horas), mostrar horas y minutos
		else if (absDiffInMs < ONE_DAY) {
			const hours = Math.floor(absDiffInMs / ONE_HOUR);
			const remainingMs = absDiffInMs % ONE_HOUR;
			const minutes = Math.floor(remainingMs / ONE_MINUTE);

			if (minutes > 0) {
				// Mostrar horas y minutos
				const hoursStr = ms(hours * ONE_HOUR, { long: true });
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				relative = \`\${hoursStr} \${minutesStr} \${direction}\`;
			} else {
				// Solo horas
				relative = \`\${ms(hours * ONE_HOUR, { long: true })} \${direction}\`;
			}
		}
		// Para otros casos, usar el string completo de ms
		else {
			relative = \`\${ms(absDiffInMs, { long: true })} \${direction}\`;
		}

		setRelativeTime(relative);
	}, [timestamp, userTimezone, userFormatter, utcFormatter]);

	// Actualizar cuando cambian timestamp o userTimezone
	React.useEffect(() => {
		updateTimeValues();
	}, [updateTimeValues]);

	// Actualizar en tiempo real mientras el tooltip esté abierto
	React.useEffect(() => {
		if (!isOpen) return;

		// Actualizar inmediatamente
		updateTimeValues();

		// Configurar intervalo para actualizar cada segundo
		const interval = setInterval(() => {
			updateTimeValues();
		}, 1000);

		// Limpiar intervalo cuando el tooltip se cierre
		return () => {
			clearInterval(interval);
		};
	}, [isOpen, updateTimeValues]);

	return (
		<TooltipProvider>
			<Tooltip open={isOpen} onOpenChange={setIsOpen}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className={className}
					side={side}
				sideOffset={sideOffset}
				{...props}
				>
					<div className="w-full flex flex-col gap-2 p-1">
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">
								{userTimezone || "Loading..."}
							</div>
							<p className="tabular-nums font-mono">
								{formattedUserTime || "—"}
							</p>
						</div>
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">UTC</div>
							<p className="tabular-nums font-mono">
								{formattedUtcTime || "—"}
							</p>
						</div>
						<div className="w-full flex text-center justify-start gap-2 text-xs">
							<div className="text-start text-muted-foreground w-40">
								Relative
							</div>
							<p className="tabular-nums font-mono">{relativeTime || "—"}</p>
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export { Timezone };`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/timezone",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/timezone",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/timezone",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/timezone",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-tooltip ms",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-tooltip ms",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-tooltip ms",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-tooltip ms",
	},
];

export default function Page() {
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences(commands, installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Timezone
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/tooltip"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Display the current timezone and relative time from a given timestamp.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Timezone timestamp={Date.now() - 5 * 60 * 1000} asChild>
							<Button variant="raised">Open Timezone</Button>
						</Timezone>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
											<CodeBlockCopyButton />
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
						<TabsContent value="tab1" className="w-full pt-4">
							<Snippet
								onValueChange={setValue}
								value={value}
								className="w-full"
							>
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
						<TabsContent
							value="tab2"
							className="w-full pt-4 flex flex-col gap-12"
						>
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

							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								<CodeBlock
									data={timezoneComponentCode}
									defaultValue={timezoneComponentCode[0].filename}
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

										<CodeBlockCopyButton variant="ghost" />
									</CodeBlockHeader>
									<CodeBlockBody>
										{(item) => (
											<CodeBlockItem key={item.language} value={item.filename}>
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
							</div>

							<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
								Update the import paths to match your project setup.
							</p>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<PropsTable
					data={[
						{
							component: "<Timezone />",
							props: [
								{
									name: "timestamp",
									type: "string | number (required)",
									description: "The timestamp to display.",
								},
								{
									name: "asChild",
									type: "boolean (default: false)",
									description:
										"Render as a child element instead of the default element.",
								},
								{
									name: "children",
									type: "ReactNode (required)",
									description: "The trigger element for the timezone tooltip.",
								},
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes.",
								},
								{
									name: "side",
									type: '"top" | "right" | "bottom" | "left"',
									description: "Side of the trigger where the tooltip appears.",
								},
								{
									name: "sideOffset",
									type: "number (default: 0)",
									description: "Distance in pixels from the trigger.",
								},
								{
									name: "...props",
									type: "TooltipContentProps (align, alignOffset, etc.)",
									description: "Additional tooltip content props.",
								},
							],
						},
					]}
				/>
			</div>

			<ComponentNavigation />
		</main>
	);
}

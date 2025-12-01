"use client";
import * as React from "react";
import { ThemeSwitcher } from "@/registry/optics/theme-switcher";
import { useTheme } from "next-themes";
import {
	useModeAnimation,
	ThemeAnimationType,
} from "react-theme-switch-animation";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";
import { usePathname } from "next/navigation";
import {
	ALargeSmall,
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Binary,
} from "lucide-react";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
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
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
	SnippetTabsContents,
} from "@/registry/optics/code-snippet";

const code = [
	{
		language: "jsx",
		filename: "theme-switcher.jsx",
		code: `import { ThemeSwitcher } from "@/registry/optics/theme-switcher";
import { useTheme } from "next-themes";
import {
	useModeAnimation,
	ThemeAnimationType,
} from "react-theme-switch-animation";
import * as React from "react";

export function MyComponent() {
	const [themeSwitch, setThemeSwitch] = React.useState("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

	const checkTheme = () => {
		let tema = resolvedTheme;
		if (tema === "system") {
			tema = systemTheme;
		}
		return tema === "light" ? false : true;
	};

	const handleSetTheme = (newTheme) => {
		let temaActual = localStorage.getItem("theme2");
		setThemeSwitch(newTheme);

		if (newTheme === "system") {
			if (systemTheme === localStorage.getItem("theme"))
				return setTimeout(() => {
					localStorage.setItem("theme2", newTheme);
				}, 200);

			toggleSwitchTheme({
				animationType: ThemeAnimationType.BLUR_CIRCLE,
				isDarkMode: checkTheme(),
				onDarkModeChange: null,
			});

			return setTimeout(() => {
				localStorage.setItem("theme2", newTheme);
			}, 200);
		}

		if (
			newTheme === localStorage.getItem("theme") ||
			(temaActual === "system" &&
				systemTheme === newTheme &&
				temaActual !== newTheme)
		)
			return setTimeout(() => {
				localStorage.setItem("theme2", newTheme);
			}, 200);

		toggleSwitchTheme({
			animationType: ThemeAnimationType.BLUR_CIRCLE,
			isDarkMode: checkTheme(),
			onDarkModeChange: null,
		});

		setTimeout(() => {
			localStorage.setItem("theme2", newTheme);
		}, 200);
	};

	React.useEffect(() => {
		let tema = localStorage.getItem("theme2") || "system";
		setThemeSwitch(tema);
		localStorage.setItem("theme", tema === "system" ? resolvedTheme : tema);
	}, [resolvedTheme]);

	React.useEffect(() => {
		if (
			systemTheme !== localStorage.getItem("theme") &&
			localStorage.getItem("theme2") === "system"
		) {
			toggleSwitchTheme({
				animationType: ThemeAnimationType.BLUR_CIRCLE,
				isDarkMode: localStorage.getItem("theme") === "light" ? false : true,
				onDarkModeChange: null,
			});
		}
	}, [systemTheme, toggleSwitchTheme]);
	
	return (
		<ThemeSwitcher
			ref={ref}
			defaultValue={themeSwitch}
			onChange={handleSetTheme}
			value={themeSwitch}
		/>
	);
}`,
	},
];

const themeSwitcherComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/theme-switcher.jsx",
		code: `"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const themes = [
	{
		key: "system",
		icon: Monitor,
		label: "System theme",
	},
	{
		key: "light",
		icon: Sun,
		label: "Light theme",
	},
	{
		key: "dark",
		icon: Moon,
		label: "Dark theme",
	},
];

export const ThemeSwitcher = ({
	value,
	onChange,
	defaultValue = "system",
	className,
	...props
}) => {
	const [theme, setTheme] = useControllableState({
		defaultProp: defaultValue,
		prop: value,
		onChange,
	});
	const [mounted, setMounted] = useState(false);

	const handleThemeClick = useCallback(
		(themeKey) => {
			setTheme(themeKey);
		},
		[setTheme],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			className={cn(
				"relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
				className,
			)}
			{...props}
		>
			{themes.map(({ key, icon: Icon, label }) => {
				const isActive = theme === key;

				return (
					<button
						aria-label={label}
						className="relative h-6 w-6 rounded-full"
						key={key}
						onClick={() => handleThemeClick(key)}
						type="button"
					>
						{isActive && (
							<motion.div
								className="absolute inset-0 rounded-full bg-secondary"
								layoutId="activeTheme"
								transition={{ type: "spring", duration: 0.5 }}
							/>
						)}
						<Icon
							className={cn(
								"relative z-10 m-auto h-4 w-4",
								isActive ? "text-foreground" : "text-muted-foreground",
							)}
						/>
					</button>
				);
			})}
		</div>
	);
};`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/theme-switcher",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/theme-switcher",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/theme-switcher",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/theme-switcher",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-use-controllable-state motion lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-use-controllable-state motion lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-use-controllable-state motion lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-use-controllable-state motion lucide-react",
	},
];

function getCookie(name) {
	if (typeof document === "undefined") return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
	return null;
}

function setCookie(name, value, days = 365) {
	if (typeof document === "undefined") return;
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
}

export default function Page() {
	const pathname = usePathname();
	const [mounted, setMounted] = React.useState(false);
	const [value, setValue] = React.useState(commands[0].label);
	const [installationTab, setInstallationTab] = React.useState("tab1");
	const [themeSwitch, setThemeSwitch] = React.useState("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

	const activeCommand = commands.find((command) => command.label === value);
	const activeDepsCommand = installDeps.find(
		(command) => command.label === value,
	);

	const checkTheme = () => {
		let tema = resolvedTheme;

		if (tema === "system") {
			tema = systemTheme;
		}
		return tema === "light" ? false : true;
	};

	const handleSetTheme = (newTheme) => {
		let temaActual = localStorage.getItem("theme2");
		setThemeSwitch(newTheme);

		if (newTheme === "system") {
			if (systemTheme === localStorage.getItem("theme"))
				return setTimeout(() => {
					localStorage.setItem("theme2", newTheme);
				}, 200);

			toggleSwitchTheme({
				animationType: ThemeAnimationType.BLUR_CIRCLE,
				isDarkMode: checkTheme(),
				onDarkModeChange: null,
			});

			return setTimeout(() => {
				localStorage.setItem("theme2", newTheme);
			}, 200);
		}

		if (
			newTheme === localStorage.getItem("theme") ||
			(temaActual === "system" &&
				systemTheme === newTheme &&
				temaActual !== newTheme)
		)
			return setTimeout(() => {
				localStorage.setItem("theme2", newTheme);
			}, 200);

		toggleSwitchTheme({
			animationType: ThemeAnimationType.BLUR_CIRCLE,
			isDarkMode: checkTheme(),
			onDarkModeChange: null,
		});

		setTimeout(() => {
			localStorage.setItem("theme2", newTheme);
		}, 200);
		//setTheme(newTheme);
	};

	React.useEffect(() => {
		if (!mounted) {
			let tema = localStorage.getItem("theme2") || "system";
			setThemeSwitch(tema);
			localStorage.setItem("theme", tema === "system" ? resolvedTheme : tema);
			setMounted(true);
		}
		if (
			systemTheme !== localStorage.getItem("theme") &&
			localStorage.getItem("theme2") === "system"
		) {
			toggleSwitchTheme({
				animationType: ThemeAnimationType.BLUR_CIRCLE,
				isDarkMode: localStorage.getItem("theme") === "light" ? false : true,
				onDarkModeChange: null,
			});
		}
	}, [systemTheme]);

	React.useEffect(() => {
		if (mounted) {
			const savedPackageManager = getCookie("preferred-package-manager");
			if (
				savedPackageManager &&
				commands.find((c) => c.label === savedPackageManager)
			) {
				setValue(savedPackageManager);
			} else {
				setCookie("preferred-package-manager", commands[0].label);
			}

			const savedInstallationTab = getCookie("preferred-installation-tab");
			if (savedInstallationTab === "tab1" || savedInstallationTab === "tab2") {
				setInstallationTab(savedInstallationTab);
			} else {
				setCookie("preferred-installation-tab", "tab1");
			}
		}
	}, [mounted]);

	React.useEffect(() => {
		if (mounted) {
			setCookie("preferred-package-manager", value);
		}
	}, [value, mounted]);

	const handleTabChange = React.useCallback(
		(newTab) => {
			setInstallationTab(newTab);
			if (mounted) {
				setCookie("preferred-installation-tab", newTab);
			}
		},
		[mounted],
	);

	function getSiblingComponent(pathname, direction = "previous") {
		const componentsSection = links.find(
			(section) =>
				section.name && section.name.toLowerCase().includes("component"),
		);

		if (!componentsSection || !Array.isArray(componentsSection.items))
			return null;

		const items = componentsSection.items;
		const currentIdx = items.findIndex((item) => item.href === pathname);

		if (currentIdx === -1) return null;
		if (direction === "previous" && currentIdx === 0) return null;
		if (direction === "next" && currentIdx === items.length - 1) return null;

		let siblingIdx = direction === "previous" ? currentIdx - 1 : currentIdx + 1;
		if (siblingIdx < 0 || siblingIdx >= items.length) return null;

		return items[siblingIdx];
	}

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Theme Switcher
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://21st.dev/community/components/ncdai/theme-switcher-1/default"
							target="_blank"
							rel="noopener noreferrer"
						>
							21st.dev
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					A theme switcher component with smooth animations between light, dark,
					and system modes.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex flex-col items-center justify-center gap-2">
						<ThemeSwitcher
							ref={ref}
							defaultValue={themeSwitch}
							onChange={handleSetTheme}
							value={themeSwitch}
						/>
						<p className="text-sm text-muted-foreground">
							Current:{" "}
							<span className="font-medium text-foreground">{themeSwitch}</span>
						</p>
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
									data={themeSwitcherComponentCode}
									defaultValue={themeSwitcherComponentCode[0].filename}
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

				<div className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{"<ThemeSwitcher />"}
					</Badge>

					<GridContainer
						cols={12}
						border={false}
						rows={4}
						className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-xl [&>*:last-child]:rounded-b-xl shadow border rounded-xl [&>*:nth-child(even)]:bg-muted`}
					>
						<GridRow>
							<GridItem
								span={4}
								className="text-xs font-semibold justify-start gap-1"
							>
								<ALargeSmall />
								Name
							</GridItem>
							<GridItem
								span={8}
								className="text-xs font-semibold gap-1 mr-auto"
							>
								<Binary size={16} />
								Type
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									value
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								"system" | "light" | "dark"
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									onChange
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								(theme: string) =&gt; void
							</GridItem>
						</GridRow>
						<GridRow>
							<GridItem
								span={4}
								className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
							>
								<Badge
									variant="outline"
									className="font-mono text-blue-600 dark:text-blue-400 bg-background"
								>
									defaultValue
								</Badge>
							</GridItem>
							<GridItem span={8} className="text-xs font-mono justify-start">
								"system" | "light" | "dark" (default: "system")
							</GridItem>
						</GridRow>
					</GridContainer>
				</div>
			</div>

			{(() => {
				const previous = getSiblingComponent(pathname, "previous");
				const next = getSiblingComponent(pathname, "next");
				const hasBoth = previous && next;
				const onlyPrevious = previous && !next;
				const onlyNext = next && !previous;

				return (
					<div
						className={cn(
							"w-full flex items-center gap-4 p-4 pt-8 pb-4",
							hasBoth && "justify-between",
							onlyPrevious && "justify-start",
							onlyNext && "justify-end",
						)}
					>
						{previous && (
							<Button variant="muted" size="sm" asChild>
								<Link href={previous.href || "#"}>
									<ArrowLeft />
									{previous.name || "Previous"}
								</Link>
							</Button>
						)}

						{next && (
							<Button variant="muted" size="sm" asChild>
								<Link href={next.href || "#"}>
									{next.name || "Next"}
									<ArrowRight />
								</Link>
							</Button>
						)}
					</div>
				);
			})()}
		</main>
	);
}

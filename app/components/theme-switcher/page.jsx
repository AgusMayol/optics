"use client";
import { InstallationGuide } from "@/components/installation-guide";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
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
import { ThemeSwitcher } from "@/registry/optics/theme-switcher";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";

import componentCode from "@/registry/optics/theme-switcher.jsx.txt";
import {
	ThemeAnimationType,
	useModeAnimation,
} from "react-theme-switch-animation";

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

const componentFiles = [
	{
		path: "@/components/optics/theme-switcher.jsx",
		code: componentCode,
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

export default function Page() {
	const [mounted, setMounted] = React.useState(false);
	const [themeSwitch, setThemeSwitch] = React.useState("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences("theme-switcher", installDeps);

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

			<InstallationGuide
				value={value}
				setValue={setValue}
				activeCommand={activeCommand}
				activeDepsCommand={activeDepsCommand}
				componentName="theme-switcher"
				installDeps={installDeps}
				manualFiles={componentFiles}
				installationTab={installationTab}
				handleTabChange={handleTabChange}
			/>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<PropsTable
					data={[
						{
							component: "<ThemeSwitcher />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the theme switcher.",
								},
								{
									name: "value",
									type: `"system" | "light" | "dark"`,
									description: "Current theme value (controlled). Use with onChange.",
								},
								{
									name: "onChange",
									type: "(theme: string) => void",
									description: "Callback function called when theme changes.",
								},
								{
									name: "defaultValue",
									type: `"system" | "light" | "dark" (default: "system")`,
									description: "Default theme value (uncontrolled).",
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

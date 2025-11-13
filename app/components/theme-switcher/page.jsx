"use client";
import { ThemeSwitcher } from "@/registry/agusmayol/theme-switcher";
import * as React from "react";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import { useTheme } from "next-themes";
import {
	useModeAnimation,
	ThemeAnimationType,
} from "react-theme-switch-animation";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/registry/agusmayol/alert";

const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { 
	AlertCircleIcon, 
	CheckCircle2Icon, 
	PopcornIcon 
} from "lucide-react"

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/registry/agusmayol/alert"


<Alert>
    <CheckCircle2Icon />
    <AlertTitle>Success! Your changes have been saved</AlertTitle>
    <AlertDescription>
    	This is an alert with icon, title and description.
    </AlertDescription>
</Alert>

<Alert>
	<PopcornIcon />
	<AlertTitle>
		This Alert has a title and an icon. No description.
	</AlertTitle>
</Alert>

<Alert variant="destructive">
	<AlertCircleIcon />
	<AlertTitle>Unable to process your payment.</AlertTitle>
	<AlertDescription>
		<p>Please verify your billing information and try again.</p>
		<ul className="list-inside list-disc text-sm">
		    <li>Check your card details</li>
		    <li>Ensure sufficient funds</li>
		    <li>Verify billing address</li>
		</ul>
	</AlertDescription>
</Alert>`,
	},
];
export default function Page() {
	const [themeSwitch, setThemeSwitch] = React.useState("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();
	const [mounted, setMounted] = React.useState(false);

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
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Theme Switcher</h1>
				<p className="text-muted-foreground text-xl">
					Displays a theme switcher with system, light, and dark themes.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<ThemeSwitcher
							ref={ref}
							defaultValue={themeSwitch}
							onChange={handleSetTheme}
							value={themeSwitch}
						/>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						{/* Component Code */}
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
											<CodeBlockCopyButton
												onCopy={() => console.log("Copied code to clipboard")}
												onError={() =>
													console.error("Failed to copy code to clipboard")
												}
											/>
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
		</main>
	);
}

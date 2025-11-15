"use client";
import { ThemeSwitcher } from "@/registry/agusmayol/theme-switcher";
import { useTheme } from "next-themes";
import {
	useModeAnimation,
	ThemeAnimationType,
} from "react-theme-switch-animation";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CommandDialogComponent } from "./command-dialog";
import { Button } from "@/registry/agusmayol/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/registry/agusmayol/context-menu";

export function Header({ links }) {
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
		<div className="w-full h-16 flex items-center justify-between gap-4 lg:rounded-t-xl border-b lg:rounded-tl-none p-4">
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<Link
						href="/"
						className="w-full h-16 lg:hidden flex flex-row items-center justify-start lg:justify-center gap-2 rounded-tl-xl"
					>
						<Image
							src="/images/new_logo.svg"
							alt="AgusMayol's Optics logo"
							className="size-8 ml-1.5"
							width={100}
							height={100}
						/>
						{/* <Image
							src="/images/new_logo_white.svg"
							alt="AgusMayol's Optics logo"
							className="size-8 hidden dark:block ml-1.5"
							width={100}
							height={100}
						/> */}
						<span className="text-base font-bold w-full hidden lg:block">
							AgusMayol's Optics
						</span>
					</Link>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Copy Logo as SVG</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>

			<CommandDialogComponent className="hidden lg:block" links={links} />

			<div className="w-full h-full flex items-center justify-end gap-1.5">
				<Button variant="ghost" size="icon">
					<Link
						href="https://github.com/agusmayol/optics"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/images/GitHub_Invertocat_Dark.svg"
							alt="AgusMayol's Optics logo"
							className="size-4.5"
							width={100}
							height={100}
						/>
					</Link>
				</Button>

				<ThemeSwitcher
					ref={ref}
					defaultValue={themeSwitch}
					onChange={handleSetTheme}
					value={themeSwitch}
				/>
			</div>
		</div>
	);
}

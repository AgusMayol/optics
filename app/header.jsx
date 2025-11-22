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
import { ListItems } from "./sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Sheet,
	SheetPortal,
	SheetOverlay,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetVariants,
	SheetPrimitive,
} from "@/registry/agusmayol/sheet";
import { Separator } from "@/registry/agusmayol/separator";

export function Header({ links }) {
	const [themeSwitch, setThemeSwitch] = React.useState("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();
	const [mounted, setMounted] = React.useState(false);
	const [sheetOpen, setSheetOpen] = React.useState(false);
	const isMobile = useIsMobile();

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
		<div className="w-full h-16 flex items-center justify-between gap-4 lg:rounded-t-3xl border-b lg:rounded-tl-none p-4">
			{isMobile && (
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							animation="none"
							className="w-full flex items-center justify-start gap-2"
						>
							<MenuIcon />
							Menu
						</Button>
					</SheetTrigger>
					<SheetPortal>
						<SheetOverlay className="fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-[16px] h-[200svh] bg-gradient-to-b from-background via-transparent to-transparent via-[50%] [mask-image:linear-gradient(to_bottom,white_0%_50%,transparent_50%_100%)]" />
						<SheetPrimitive.Content
							className={cn(
								SheetVariants({ side: "popIn" }),
								"py-3 !max-w-none w-full h-full bg-transparent border-none rounded-none shadow-none",
							)}
						>
							<SheetHeader className="-ml-6.5">
								<SheetClose asChild>
									<Button
										variant="ghost"
										animation="none"
										className="w-full items-center justify-start px-6.5"
									>
										<XIcon className="!size-5.5" />
										<SheetTitle className="">Close</SheetTitle>
									</Button>
								</SheetClose>
							</SheetHeader>
							<ListItems
								links={links}
								sidebarMaxHeight="100%"
								isMobile={isMobile}
								onLinkClick={() => setSheetOpen(false)}
							/>
						</SheetPrimitive.Content>
					</SheetPortal>
				</Sheet>
			)}

			<CommandDialogComponent className="hidden lg:block" links={links} />

			<div className="w-full h-full flex items-center justify-end gap-1.5">
				<Button variant="ghost" size="icon" animation="none">
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

"use client";
import { useTheme } from "next-themes";
import * as React from "react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import type { ManualFile } from "@/components/installation-guide";
import type { ComponentPropsGroup } from "@/components/props-table";
import componentCode from "@/registry/optics/dist/theme-switcher.tsx.txt";
import { ThemeSwitcher, type ThemeSwitcherValue } from "@/registry/optics/theme-switcher";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/theme-switcher.tsx",
		code: componentCode,
	},
];

const propsData: ComponentPropsGroup[] = [
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
				type: '"system" | "light" | "dark"',
				description: "Current theme value (controlled). Use with onChange.",
			},
			{
				name: "onChange",
				type: "(theme: string) => void",
				description: "Callback function called when theme changes.",
			},
			{
				name: "defaultValue",
				type: '"system" | "light" | "dark" (default: "system")',
				description: "Default theme value (uncontrolled).",
			},
		],
	},
];

function isThemeSwitcherValue(value: string): value is ThemeSwitcherValue {
	return value === "system" || value === "light" || value === "dark";
}

function ThemeSwitcherDemo() {
	const [mounted, setMounted] = React.useState(false);
	const [themeSwitch, setThemeSwitch] = React.useState<ThemeSwitcherValue>("system");
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

	const checkTheme = () => {
		let currentTheme = resolvedTheme;

		if (currentTheme === "system") {
			currentTheme = systemTheme;
		}
		return currentTheme !== "light";
	};
	const isCurrentlyDark = checkTheme();
	const { ref, toggleSwitchTheme } = useModeAnimation({
		animationType: ThemeAnimationType.BLUR_CIRCLE,
		isDarkMode: isCurrentlyDark,
		onDarkModeChange: () => {},
	});

	const handleSetTheme = (newTheme: ThemeSwitcherValue) => {
		setThemeSwitch(newTheme);

		const notifyThemeChange = () => {
			if (typeof window !== "undefined") {
				window.dispatchEvent(new Event("theme2-change"));
				document.cookie = `theme-preference=${newTheme}; path=/; max-age=31536000`;
			}
		};

		const willBeDark = newTheme === "system" ? systemTheme === "dark" : newTheme === "dark";

		if (isCurrentlyDark !== willBeDark) {
			toggleSwitchTheme();
		}

		setTheme(newTheme);

		setTimeout(() => {
			localStorage.setItem("theme2", newTheme);
			notifyThemeChange();
		}, 200);
	};

	React.useEffect(() => {
		if (!mounted) {
			const storedTheme = localStorage.getItem("theme2") || "system";
			setThemeSwitch(isThemeSwitcherValue(storedTheme) ? storedTheme : "system");
			setMounted(true);
		}
	}, [mounted]);

	React.useEffect(() => {
		if (mounted && themeSwitch === "system") {
			if (theme !== "system") {
				setTheme("system");
			}
		}
	}, [mounted, themeSwitch, theme, setTheme]);

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<ThemeSwitcher
				ref={(node) => {
					ref.current = node as unknown as HTMLButtonElement | null;
				}}
				defaultValue={themeSwitch}
				onChange={handleSetTheme}
				value={themeSwitch}
			/>
			<p className="text-sm text-muted-foreground">
				Current: <span className="font-medium text-foreground">{themeSwitch}</span>
			</p>
		</div>
	);
}

const componentConfig: ComponentConfigData = {
	header: {
		title: "Theme Switcher",
		description:
			"A theme switcher component with smooth animations between light, dark, and system modes.",
		href: "https://21st.dev/community/components/ncdai/theme-switcher-1/default",
		hrefText: "21st.dev",
	},
	content: {
		children: <ThemeSwitcherDemo />,
		imports: `import { ThemeSwitcher } from "@/components/optics/theme-switcher";
import { useTheme } from "next-themes";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";
import * as React from "react";`,
		filename: "theme-switcher.tsx",
	},
	installation: {
		componentName: "theme-switcher",
		dependencies: "motion lucide-react",
		manualFiles: componentFiles,
	},
	props: propsData,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

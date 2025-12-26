"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { ThemeSwitcher } from "@/registry/optics/theme-switcher";
import { useTheme } from "next-themes";
import * as React from "react";
import {
	ThemeAnimationType,
	useModeAnimation,
} from "react-theme-switch-animation";

import componentCode from "@/registry/optics/dist/theme-switcher.jsx.txt";

const componentFiles = [
	{
		path: "@/components/optics/theme-switcher.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "theme-switcher.jsx",
		code: `import { ThemeSwitcher } from "@/components/optics/theme-switcher";
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

const propsData = [
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
];

function ThemeSwitcherDemo() {
	const [mounted, setMounted] = useState(false);
	const [themeSwitch, setThemeSwitch] = useState("system");
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
		<div className="flex flex-col items-center justify-center gap-2">
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
		</div>
	);
}

const componentConfig = {
	header: {
		title: "Theme Switcher",
		description:
			"A theme switcher component with smooth animations between light, dark, and system modes.",
		href: "https://21st.dev/community/components/ncdai/theme-switcher-1/default",
		hrefText: "21st.dev",
	},
	content: {
		children: <ThemeSwitcherDemo />,
		code: code,
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

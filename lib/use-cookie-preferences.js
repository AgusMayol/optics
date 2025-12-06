import { useState, useEffect, useCallback, useMemo } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

/**
 * Generates CLI commands for a component based on the registry prefix
 * @param {string} componentName - Name of the component (e.g., "button", "card")
 * @returns {Array} Array of command objects with label and code
 */
function generateCommands(componentName) {
	const registryPrefix = process.env.NEXT_PUBLIC_REGISTRY_PREFIX || "@optics";

	return [
		{
			label: "pnpm",
			code: `pnpm dlx shadcn@latest add ${registryPrefix}/${componentName}`,
		},
		{
			label: "npm",
			code: `npx shadcn@latest add ${registryPrefix}/${componentName}`,
		},
		{
			label: "yarn",
			code: `yarn shadcn@latest add ${registryPrefix}/${componentName}`,
		},
		{
			label: "bun",
			code: `bunx --bun shadcn@latest add ${registryPrefix}/${componentName}`,
		},
	];
}

/**
 * Custom hook to manage cookie preferences for package manager and installation tab
 * @param {string} componentName - Name of the component (e.g., "button", "card")
 * @param {Array} installDeps - Optional array of dependency command objects
 * @returns {Object} Object containing mounted state, value, installationTab, activeCommand, activeDepsCommand, and handleTabChange
 */
export function useCookiePreferences(componentName, installDeps = []) {
	const commands = useMemo(
		() => generateCommands(componentName),
		[componentName],
	);

	const [mounted, setMounted] = useState(false);
	const [value, setValue] = useState(commands[0]?.label || "");
	const [installationTab, setInstallationTab] = useState("tab1");

	const activeCommand = commands.find((command) => command.label === value);
	const activeDepsCommand = installDeps.find(
		(command) => command.label === value,
	);

	useEffect(() => {
		setMounted(true);
		const savedPackageManager = getCookie("preferred-package-manager");
		if (
			savedPackageManager &&
			commands.find((c) => c.label === savedPackageManager)
		) {
			setValue(savedPackageManager);
		} else {
			setCookie("preferred-package-manager", commands[0]?.label || "");
		}

		const savedInstallationTab = getCookie("preferred-installation-tab");
		if (savedInstallationTab === "tab1" || savedInstallationTab === "tab2") {
			setInstallationTab(savedInstallationTab);
		} else {
			setCookie("preferred-installation-tab", "tab1");
		}
	}, [commands]);

	useEffect(() => {
		if (mounted) {
			setCookie("preferred-package-manager", value);
		}
	}, [value, mounted]);

	const handleTabChange = useCallback(
		(newTab) => {
			setInstallationTab(newTab);
			if (mounted) {
				setCookie("preferred-installation-tab", newTab);
			}
		},
		[mounted],
	);

	return {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	};
}

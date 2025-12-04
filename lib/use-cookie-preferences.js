import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

/**
 * Custom hook to manage cookie preferences for package manager and installation tab
 * @param {Array} commands - Array of command objects with label property
 * @param {Array} installDeps - Optional array of dependency command objects
 * @returns {Object} Object containing mounted state, value, installationTab, activeCommand, activeDepsCommand, and handleTabChange
 */
export function useCookiePreferences(commands, installDeps = []) {
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


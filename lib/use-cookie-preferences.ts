import { useCallback, useEffect, useMemo, useState } from "react";
import { getCookie, setCookie } from "@/lib/cookies";

export interface PackageManagerCommand {
	label: string;
	code: string;
}

function generateCommands(componentName: string): PackageManagerCommand[] {
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

export function useCookiePreferences(
	componentName: string,
	_installDeps: PackageManagerCommand[] = [],
) {
	const commands = useMemo(() => generateCommands(componentName), [componentName]);

	const [mounted, setMounted] = useState(false);
	const [value, setValue] = useState(commands[0]?.label || "");
	const [installationTab, setInstallationTab] = useState("tab1");

	useEffect(() => {
		setMounted(true);
		const savedPackageManager = getCookie("preferred-package-manager");
		if (savedPackageManager && commands.find((c) => c.label === savedPackageManager)) {
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
		(newTab: string) => {
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
	};
}

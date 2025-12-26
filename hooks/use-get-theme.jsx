"use client";

import React from "react";
import { useTheme } from "next-themes";

function resolveActiveTheme(resolvedTheme, systemTheme) {
	if (!resolvedTheme) return null;
	if (resolvedTheme === "system") {
		return systemTheme || null;
	}
	return resolvedTheme;
}

function useActiveTheme() {
	const { resolvedTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);
	const [storedTheme, setStoredTheme] = React.useState(null);

	const readStoredTheme = React.useCallback(() => {
		if (typeof window === "undefined") return null;
		return window.localStorage.getItem("theme2");
	}, []);

	React.useEffect(() => {
		setMounted(true);
		setStoredTheme(readStoredTheme());
	}, [readStoredTheme]);

	React.useEffect(() => {
		if (typeof window === "undefined") return undefined;

		const handleStorage = () => {
			setStoredTheme(readStoredTheme());
		};

		window.addEventListener("storage", handleStorage);
		window.addEventListener("theme2-change", handleStorage);

		return () => {
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener("theme2-change", handleStorage);
		};
	}, [readStoredTheme]);

	return React.useMemo(() => {
		if (!mounted) return null;
		const persistedTheme =
			storedTheme ||
			(typeof window !== "undefined"
				? window.localStorage.getItem("theme2")
				: null);
		if (persistedTheme === "light" || persistedTheme === "dark") {
			return persistedTheme;
		}
		if (storedTheme === "light" || storedTheme === "dark") {
			return storedTheme;
		}

		return resolveActiveTheme(resolvedTheme, systemTheme);
	}, [mounted, resolvedTheme, systemTheme, storedTheme]);
}

export function useIsLight() {
	const activeTheme = useActiveTheme();
	return activeTheme === "light";
}

export function useIsDark() {
	const activeTheme = useActiveTheme();
	return activeTheme === "dark";
}

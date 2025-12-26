"use client";

import React from "react";
import { useTheme } from "next-themes";

/**
 * Hook to get the currently active theme (light or dark).
 * Uses next-themes resolvedTheme which correctly handles 'system' preference
 * and stays reactive to both manual changes and system preference changes.
 */
function useActiveTheme() {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// Ensure we only return a theme after mounting to avoid hydration mismatches
	React.useEffect(() => {
		setMounted(true);
	}, []);

	return React.useMemo(() => {
		if (!mounted) return null;
		return resolvedTheme || null;
	}, [mounted, resolvedTheme]);
}

/**
 * Returns true if the current active theme is light.
 */
export function useIsLight() {
	const activeTheme = useActiveTheme();
	return activeTheme === "light";
}

/**
 * Returns true if the current active theme is dark.
 */
export function useIsDark() {
	const activeTheme = useActiveTheme();
	return activeTheme === "dark";
}

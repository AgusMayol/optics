"use client";

import { useTheme } from "next-themes";
import React from "react";

function useActiveTheme(): string | null {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return React.useMemo(() => {
		if (!mounted) return null;
		return resolvedTheme || null;
	}, [mounted, resolvedTheme]);
}

export function useIsLight(): boolean {
	const activeTheme = useActiveTheme();
	return activeTheme === "light";
}

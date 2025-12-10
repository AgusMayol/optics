"use client";
import * as React from "react";

const MOBILE_BREAKPOINT = 1024; // 768

function getSnapshot() {
	if (typeof window === "undefined") return false;
	return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot() {
	return false; // Default to desktop for SSR
}

function subscribe(callback) {
	if (typeof window === "undefined") return () => {};
	const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

	// Modern browsers support addEventListener on MediaQueryList
	if (mql.addEventListener) {
		mql.addEventListener("change", callback);
		return () => mql.removeEventListener("change", callback);
	} else {
		// Fallback for older browsers
		mql.addListener(callback);
		return () => mql.removeListener(callback);
	}
}

export function useIsMobile() {
	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

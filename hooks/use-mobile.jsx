"use client";
import * as React from "react";

const MOBILE_BREAKPOINT = 1024; // 768

function getSnapshot() {
	if (typeof window === "undefined") return null;
	return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot() {
	return null; // avoid mismatched guess during SSR
}

function subscribe(callback) {
	if (typeof window === "undefined") return () => {};

	// Use matchMedia with the exact breakpoint
	const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

	// Throttled resize handler to ensure we catch all changes
	let resizeTimeout;

	const notify = () => {
		callback();
	};

	const resizeHandler = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(notify, 50);
	};

	// Handler for matchMedia changes - this should fire when crossing the breakpoint
	const mediaHandler = () => {
		notify();
	};

	// Modern browsers support addEventListener on MediaQueryList
	if (mql.addEventListener) {
		mql.addEventListener("change", mediaHandler);
		// Also listen to resize as a fallback to catch edge cases where matchMedia might miss
		window.addEventListener("resize", resizeHandler);
		return () => {
			mql.removeEventListener("change", mediaHandler);
			window.removeEventListener("resize", resizeHandler);
			clearTimeout(resizeTimeout);
		};
	} else {
		// Fallback for older browsers
		mql.addListener(mediaHandler);
		window.addEventListener("resize", resizeHandler);
		return () => {
			mql.removeListener(mediaHandler);
			window.removeEventListener("resize", resizeHandler);
			clearTimeout(resizeTimeout);
		};
	}
}

export function useIsMobile() {
	const isMobile = React.useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	// Defer initial render until we know the real value on the client
	const [hydrated, setHydrated] = React.useState(typeof window !== "undefined");

	React.useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated ? isMobile : null;
}

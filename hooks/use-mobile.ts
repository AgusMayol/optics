"use client";
import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

function getSnapshot(): boolean | null {
	if (typeof window === "undefined") return null;
	return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot(): boolean | null {
	return null;
}

function subscribe(callback: () => void): () => void {
	if (typeof window === "undefined") return () => {};

	const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
	let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

	const notify = () => {
		callback();
	};

	const resizeHandler = () => {
		if (resizeTimeout) clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(notify, 50);
	};

	const mediaHandler = () => {
		notify();
	};

	if (mql.addEventListener) {
		mql.addEventListener("change", mediaHandler);
		window.addEventListener("resize", resizeHandler);
		return () => {
			mql.removeEventListener("change", mediaHandler);
			window.removeEventListener("resize", resizeHandler);
			if (resizeTimeout) clearTimeout(resizeTimeout);
		};
	}

	mql.addListener(mediaHandler);
	window.addEventListener("resize", resizeHandler);
	return () => {
		mql.removeListener(mediaHandler);
		window.removeEventListener("resize", resizeHandler);
		if (resizeTimeout) clearTimeout(resizeTimeout);
	};
}

export function useIsMobile(): boolean | null {
	const isMobile = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const [hydrated, setHydrated] = React.useState(false);

	React.useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated ? isMobile : null;
}

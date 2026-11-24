"use client";
import { type RefObject, useEffect, useRef, useState } from "react";

export function useElementHeight<T extends HTMLElement = HTMLDivElement>(): readonly [
	RefObject<T | null>,
	number,
] {
	const [height, setHeight] = useState(0);
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current) {
				setHeight(ref.current.getBoundingClientRect().height);
			}
		};

		updateHeight();

		const resizeObserver = new ResizeObserver(updateHeight);
		if (ref.current) {
			resizeObserver.observe(ref.current);
		}

		window.addEventListener("resize", updateHeight);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	return [ref, height] as const;
}

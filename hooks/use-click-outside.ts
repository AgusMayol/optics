import { type RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T | null>,
	callback: () => void,
): void => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
				callback();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, callback]);
};

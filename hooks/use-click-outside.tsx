import { useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
	ref: React.RefObject<T | null>,
	callback: () => void,
) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent | TouchEvent) {
			if (ref.current && !ref.current.contains(event.target as Node | null)) {
				callback();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [callback, ref]);
};

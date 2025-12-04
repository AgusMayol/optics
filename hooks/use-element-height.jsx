"use client";
import { useState, useEffect, useRef } from "react";

export function useElementHeight() {
	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current) {
				setHeight(ref.current.getBoundingClientRect().height);
			}
		};

		// Medir altura inicial
		updateHeight();

		// Crear observer para cambios de tamaño
		const resizeObserver = new ResizeObserver(updateHeight);
		if (ref.current) {
			resizeObserver.observe(ref.current);
		}

		// También escuchar cambios de ventana
		window.addEventListener("resize", updateHeight);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	return [ref, height];
}

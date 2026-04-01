import {
	ForesightManager,
	type ForesightRegisterOptionsWithoutElement,
	type ForesightRegisterResult,
} from "js.foresight";
import { useEffect, useRef } from "react";

export default function useForesight<T extends HTMLElement = HTMLElement>(
	options: ForesightRegisterOptionsWithoutElement,
) {
	const elementRef = useRef<T>(null);
	const registerResults = useRef<ForesightRegisterResult | null>(null);
	useEffect(() => {
		if (!elementRef.current) return;

		registerResults.current = ForesightManager.instance.register({
			element: elementRef.current,
			...options,
		});
	}, [options]);

	return { elementRef, registerResults };
}

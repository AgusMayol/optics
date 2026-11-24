"use client";

import type { ForesightRegisterOptions } from "js.foresight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type * as React from "react";
import { useCallback } from "react";
import useForesight from "@/hooks/use-foresight";

interface ForesightLinkProps
	extends
		Omit<React.ComponentProps<typeof Link>, "prefetch">,
		Omit<ForesightRegisterOptions, "element" | "callback"> {
	children: React.ReactNode;
}

export function ForesightLink({
	children,
	className,
	hitSlop,
	name,
	meta,
	reactivateAfter,
	unregisterOnCallback,
	ref: forwardedRef,
	...props
}: ForesightLinkProps) {
	const router = useRouter();

	const { elementRef } = useForesight<HTMLAnchorElement>({
		callback: () => {
			router.prefetch(props.href.toString());
		},
		hitSlop,
		name,
		meta,
		reactivateAfter,
	});

	const mergedRef = useCallback(
		(node: HTMLAnchorElement | null) => {
			(elementRef as { current: HTMLAnchorElement | null }).current = node;
			if (typeof forwardedRef === "function") {
				forwardedRef(node);
			} else if (forwardedRef) {
				(forwardedRef as { current: HTMLAnchorElement | null }).current = node;
			}
		},
		[forwardedRef, elementRef],
	);

	return (
		<Link {...props} ref={mergedRef} className={className} prefetch={false}>
			{children}
		</Link>
	);
}

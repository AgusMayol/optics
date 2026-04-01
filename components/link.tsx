"use client";

import type { ForesightRegisterOptions } from "js.foresight";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type Ref } from "react";
import useForesight from "@/hooks/use-foresight";

interface ForesightLinkProps
	extends Omit<LinkProps, "prefetch">,
		Omit<ForesightRegisterOptions, "element" | "callback"> {
	children: React.ReactNode;
	className?: string;
	ref?: Ref<HTMLAnchorElement>;
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

"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { links, type NavLinkItem } from "@/app/layout-content";
import { ForesightLink as Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";

export function ComponentNavigation() {
	const pathname = usePathname();

	function getSiblingComponent(
		currentPathname: string,
		direction: "previous" | "next" = "previous",
	): NavLinkItem | null {
		const currentSection = links.find(
			(section) =>
				Array.isArray(section.items) && section.items.some((item) => item.href === currentPathname),
		);

		if (!currentSection || !Array.isArray(currentSection.items)) {
			return null;
		}

		const items = currentSection.items.filter((item) => !item.disabled);
		const currentIdx = items.findIndex((item) => item.href === currentPathname);

		if (currentIdx === -1) return null;
		if (direction === "previous" && currentIdx === 0) return null;
		if (direction === "next" && currentIdx === items.length - 1) return null;

		const siblingIdx = direction === "previous" ? currentIdx - 1 : currentIdx + 1;
		if (siblingIdx < 0 || siblingIdx >= items.length) return null;

		return items[siblingIdx] ?? null;
	}

	const previous = getSiblingComponent(pathname, "previous");
	const next = getSiblingComponent(pathname, "next");
	const hasBoth = Boolean(previous && next);
	const onlyPrevious = Boolean(previous && !next);
	const onlyNext = Boolean(next && !previous);

	return (
		<div
			className={cn(
				"w-full flex items-center gap-4 p-4 pt-8 pb-4",
				hasBoth && "justify-between",
				onlyPrevious && "justify-start",
				onlyNext && "justify-end",
			)}
		>
			{previous && (
				<Button
					variant="muted"
					size="lg"
					nativeButton={false}
					render={
						<Link href={previous.href || "#"}>
							<ArrowLeft />
							{previous.name || "Previous"}
						</Link>
					}
				/>
			)}

			{next && (
				<Button
					variant="muted"
					size="lg"
					nativeButton={false}
					render={
						<Link href={next.href || "#"}>
							{next.name || "Next"}
							<ArrowRight />
						</Link>
					}
				/>
			)}
		</div>
	);
}

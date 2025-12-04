"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/registry/optics/button";
import { cn } from "@/lib/utils";
import { links } from "@/app/layout-content";

/**
 * ComponentNavigation - Componente reutilizable para navegación entre componentes
 * 
 * Este componente automáticamente:
 * - Obtiene la ruta actual usando usePathname()
 * - Calcula el componente anterior y siguiente en la sección "Components"
 * - Renderiza botones de navegación con el estilo y lógica apropiados
 */
export function ComponentNavigation() {
	const pathname = usePathname();

	function getSiblingComponent(pathname, direction = "previous") {
		const componentsSection = links.find(
			(section) =>
				section.name && section.name.toLowerCase().includes("component"),
		);

		if (!componentsSection || !Array.isArray(componentsSection.items))
			return null;

		const items = componentsSection.items;
		const currentIdx = items.findIndex((item) => item.href === pathname);

		if (currentIdx === -1) return null;
		if (direction === "previous" && currentIdx === 0) return null;
		if (direction === "next" && currentIdx === items.length - 1) return null;

		let siblingIdx = direction === "previous" ? currentIdx - 1 : currentIdx + 1;
		if (siblingIdx < 0 || siblingIdx >= items.length) return null;

		return items[siblingIdx];
	}

	const previous = getSiblingComponent(pathname, "previous");
	const next = getSiblingComponent(pathname, "next");
	const hasBoth = previous && next;
	const onlyPrevious = previous && !next;
	const onlyNext = next && !previous;

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
				<Button variant="muted" size="sm" asChild>
					<Link href={previous.href || "#"}>
						<ArrowLeft />
						{previous.name || "Previous"}
					</Link>
				</Button>
			)}

			{next && (
				<Button variant="muted" size="sm" asChild>
					<Link href={next.href || "#"}>
						{next.name || "Next"}
						<ArrowRight />
					</Link>
				</Button>
			)}
		</div>
	);
}


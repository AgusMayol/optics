"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function Sidebar({ links, maxHeight = 0, width = "17.5rem" }) {
	const scrollHeight =
		maxHeight > 0
			? `min(${maxHeight}px, calc(100vh - 4rem))`
			: "calc(100vh - 4rem)";

	return (
		<aside
			className="hidden lg:block col-span-3 border-r h-full fixed top-16 max-h-[calc(100vh-4rem)]"
			style={{ width: width }}
		>
			<ListItems links={links} scrollHeight={scrollHeight} />
		</aside>
	);
}

export function ListItems({ links, scrollHeight, isMobile, onLinkClick }) {
	const pathname = usePathname();
	const scrollAreaRef = useRef(null);
	const itemRefs = useRef({});

	// Función para hacer scroll al elemento activo
	const scrollToActiveItem = useCallback(() => {
		const activeItemRef = itemRefs.current[pathname];
		if (!activeItemRef || !scrollAreaRef.current) return;

		// Buscar el viewport del ScrollArea
		const scrollElement =
			scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]') ||
			scrollAreaRef.current;

		if (!scrollElement) return;

		// Obtener las posiciones relativas
		const activeElementRect = activeItemRef.getBoundingClientRect();
		const scrollElementRect = scrollElement.getBoundingClientRect();

		// Calcular la posición de scroll para centrar el elemento activo
		const scrollTop =
			activeElementRect.top -
			scrollElementRect.top +
			scrollElement.scrollTop -
			scrollElementRect.height / 2 +
			activeElementRect.height / 2;

		// Hacer scroll suave al elemento activo
		scrollElement.scrollTo({
			top: Math.max(0, scrollTop),
			behavior: "smooth",
		});
	}, [pathname]);

	// Efecto para hacer scroll cuando cambie el pathname
	useEffect(() => {
		// Usar requestAnimationFrame para asegurar que el DOM esté completamente renderizado
		let timeoutId;
		const rafId = requestAnimationFrame(() => {
			// Pequeño delay adicional para asegurar que las referencias estén actualizadas
			timeoutId = setTimeout(scrollToActiveItem, 50);
		});
		return () => {
			cancelAnimationFrame(rafId);
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [pathname, scrollToActiveItem]);

	return (
		<ScrollArea
			ref={scrollAreaRef}
			className="w-full"
			style={{ height: scrollHeight }}
			maskColor={isMobile ? "from-transparent" : "from-background"}
		>
			<div className="w-full h-full flex flex-col gap-10 py-8 lg:p-4 max-w-xs lg:max-w-none">
				{links.map((item) => (
					<div key={item.name} className={cn("flex flex-col gap-2")}>
						<h2 className="font-semibold px-2 text-base lg:text-sm">
							{item.name}
						</h2>
						{item.items.map((item) => (
							<Button
								key={item.name}
								ref={(el) => {
									if (el) {
										itemRefs.current[item.href] = el;
									}
								}}
								size="lg"
								variant="ghost"
								nativeButton={false}
								className={cn(
									"group w-full text-sm lg:text-xs pr-2 justify-between font-medium data-[active=true]:bg-sidebar-accent/80 data-[active=true]:lg:bg-sidebar-accent text-foreground lg:text-muted-foreground data-[active=true]:text-foreground transition-none transition-transform",
									item.disabled && "cursor-not-allowed",
								)}
								data-active={item.href === pathname}
								render={
									<Link
										href={item.href}
										rel="noopener noreferrer"
										target={item.href.includes("https://") ? "_blank" : "_self"}
										onClick={(e) => {
											item.disabled
												? e.preventDefault()
												: isMobile && onLinkClick
													? onLinkClick
													: undefined;
										}}
										className={cn(item.disabled && "cursor-not-allowed")}
									>
										<div className="flex flex-row items-center justify-start gap-2">
											{item.name}
											{item.href.includes("https://") && (
												<ArrowUpRight className="-ml-1" />
											)}
										</div>
										{item.disabled && (
											<Badge
												variant="outline"
												className="squircle-none !text-[10px] group-hover:bg-muted group-hover:border-muted-foreground/25 transition-none!"
											>
												Soon
											</Badge>
										)}
										{item.logo && (
											<Image
												src={item.logo}
												alt={item.name}
												className={cn(
													"size-4 mr-0.5",
													item.logoDark && "dark:hidden",
												)}
												width={16}
												height={16}
											/>
										)}
										{item.logoDark && (
											<Image
												src={item.logoDark}
												alt={item.name}
												className="size-4 mr-0.5 hidden dark:block"
												width={16}
												height={16}
											/>
										)}
									</Link>
								}
							/>
						))}
					</div>
				))}
			</div>
		</ScrollArea>
	);
}

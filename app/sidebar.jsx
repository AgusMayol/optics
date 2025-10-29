"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/registry/agusmayol/button";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/registry/agusmayol/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export function Sidebar({ links, maxHeight = 0 }) {
	const pathname = usePathname();
	const scrollAreaRef = useRef(null);
	const itemRefs = useRef({});

	// Calcular la altura máxima del sidebar basada en el contenido principal
	const sidebarMaxHeight =
		maxHeight > 0 ? `calc(${maxHeight}px + 0.875rem)` : "min-h-dvh";

	// Función para hacer scroll al elemento activo
	const scrollToActiveItem = () => {
		const activeItemRef = itemRefs.current[pathname];
		if (activeItemRef && scrollAreaRef.current) {
			// Obtener el elemento del ScrollArea
			const scrollElement = scrollAreaRef.current.querySelector(
				"[data-radix-scroll-area-viewport]",
			);
			if (scrollElement) {
				// Calcular la posición del elemento activo
				const activeElementRect = activeItemRef.getBoundingClientRect();
				const scrollElementRect = scrollElement.getBoundingClientRect();

				// Calcular el offset necesario para centrar el elemento
				const scrollTop =
					activeElementRect.top -
					scrollElementRect.top +
					scrollElement.scrollTop -
					scrollElementRect.height / 2 +
					activeElementRect.height / 2;

				// Hacer scroll suave
				scrollElement.scrollTo({
					top: Math.max(0, scrollTop),
					behavior: "smooth",
				});
			}
		}
	};

	// Efecto para hacer scroll cuando cambie el pathname
	useEffect(() => {
		// Pequeño delay para asegurar que el DOM esté actualizado
		const timeoutId = setTimeout(scrollToActiveItem, 100);
		return () => clearTimeout(timeoutId);
	}, [pathname]);

	return (
		<aside
			className="hidden lg:block col-span-3 rounded-r-none border rounded-xl bg-sidebar"
			style={{ maxHeight: sidebarMaxHeight }}
		>
			<Link
				href="/"
				className="w-full h-16 flex flex-row items-center justify-start gap-0 p-4 rounded-tl-xl border-b"
			>
				<Image
					src="/images/new_logo.svg"
					alt="AgusMayol's Optics logo"
					className="size-8 dark:hidden ml-1.5"
					width={100}
					height={100}
				/>
				<Image
					src="/images/new_logo_white.svg"
					alt="AgusMayol's Optics logo"
					className="size-8 hidden dark:block ml-1.5"
					width={100}
					height={100}
				/>
				<span className="text-lg font-bold w-full text-center truncate">
					AgusMayol's Optics
				</span>
			</Link>
			<ScrollArea
				ref={scrollAreaRef}
				className="w-full rounded-bl-xl bg-background"
				style={{ height: `calc(${sidebarMaxHeight} - 5rem)` }}
			>
				<div className="w-full h-full flex flex-col gap-10 p-4 bg-background rounded-bl-xl">
					{links.map((item) => (
						<div key={item.name} className="flex flex-col gap-2">
							<h2 className="font-semibold px-4 text-sm">{item.name}</h2>
							{item.items.map((item) => (
								<Button
									key={item.name}
									ref={(el) => {
										if (el) {
											itemRefs.current[item.href] = el;
										}
									}}
									variant="ghost"
									className="w-full text-xs pr-2 justify-between font-medium data-[active=true]:bg-sidebar-accent text-muted-foreground data-[active=true]:text-foreground"
									data-active={item.href === pathname}
									asChild
								>
									<Link
										href={item.href}
										rel="noopener noreferrer"
										target={item.href.includes("https://") ? "_blank" : "_self"}
									>
										<div className="flex flex-row items-center justify-start gap-2">
											{item.name}
											{item.href.includes("https://") && (
												<ArrowUpRight className="-ml-1" />
											)}
										</div>

										{item.own && (
											<Badge className="bg-sky-700 text-xs shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] [text-shadow:0_1px_0_var(--color-sky-900)] text-white size-1.5 p-0"></Badge>
										)}

										{item.custom && (
											<Badge className="bg-emerald-700 text-xs shadow-[inset_-8px_-8px_12px_rgba(0,0,0,0.2)] [text-shadow:0_1px_0_var(--color-emerald-900)] text-white size-1.5 p-0"></Badge>
										)}
									</Link>
								</Button>
							))}
						</div>
					))}
				</div>
			</ScrollArea>
		</aside>
	);
}

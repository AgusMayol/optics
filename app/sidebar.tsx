"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { NavLinkGroup } from "@/app/layout-content";
import { ForesightLink as Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { ScrollArea } from "@/registry/optics/scroll-area";
import { SheetClose } from "@/registry/optics/sheet";

export interface SidebarProps {
	links: NavLinkGroup[];
	maxHeight?: number;
	width?: string;
}

export function Sidebar({ links, maxHeight = 0, width = "17.5rem" }: SidebarProps) {
	const scrollHeight =
		maxHeight > 0 ? `min(${maxHeight}px, calc(100vh - 4rem))` : "calc(100vh - 4rem)";

	return (
		<aside
			className="hidden lg:block col-span-3 border-r h-full fixed top-16 max-h-[calc(100vh-4rem)]"
			style={{ width }}
		>
			<ListItems links={links} scrollHeight={scrollHeight} />
		</aside>
	);
}

export interface ListItemsProps {
	links: NavLinkGroup[];
	scrollHeight?: string;
	sidebarMaxHeight?: string;
	isMobile?: boolean | null;
	onLinkClick?: () => void;
}

export function ListItems({ links, scrollHeight, isMobile, onLinkClick }: ListItemsProps) {
	const pathname = usePathname();
	const scrollAreaRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<Record<string, HTMLElement | null>>({});

	const scrollToActiveItem = useCallback(() => {
		const activeItemRef = itemRefs.current[pathname];
		if (!activeItemRef || !scrollAreaRef.current) return;

		const scrollElement =
			scrollAreaRef.current.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ||
			scrollAreaRef.current;

		if (!scrollElement) return;

		const activeElementRect = activeItemRef.getBoundingClientRect();
		const scrollElementRect = scrollElement.getBoundingClientRect();

		const scrollTop =
			activeElementRect.top -
			scrollElementRect.top +
			scrollElement.scrollTop -
			scrollElementRect.height / 2 +
			activeElementRect.height / 2;

		scrollElement.scrollTo({
			top: Math.max(0, scrollTop),
			behavior: "smooth",
		});
	}, [pathname]);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		const rafId = requestAnimationFrame(() => {
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
			style={scrollHeight ? { height: scrollHeight } : undefined}
			maskColor="from-background"
		>
			<div className="w-full h-full flex flex-col gap-10 py-8 lg:p-4 max-w-xs lg:max-w-none">
				{links.map((group) => (
					<div key={group.name} className={cn("flex flex-col gap-2")}>
						<h2 className="font-semibold px-2 text-base lg:text-sm">{group.name}</h2>
						{group.items.map((item) => {
							const itemButton = (
								<Button
									key={item.name}
									ref={(el: HTMLElement | null) => {
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
												if (item.disabled) {
													e.preventDefault();
												} else if (isMobile && onLinkClick) {
													onLinkClick();
												}
											}}
											className={cn(item.disabled && "cursor-not-allowed")}
										>
											<div className="flex flex-row items-center justify-start gap-2">
												{item.name}
												{item.href.includes("https://") && <ArrowUpRight className="-ml-1" />}
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
													className={cn("size-4 mr-0.5", item.logoDark && "dark:hidden")}
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
							);

							return isMobile ? (
								<SheetClose key={item.name} nativeButton={false} render={itemButton} />
							) : (
								itemButton
							);
						})}
					</div>
				))}
			</div>
		</ScrollArea>
	);
}

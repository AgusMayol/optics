"use client";
import { links } from "@/app/layout-content";
import { Button } from "@/registry/optics/button";
import { Separator } from "@/registry/optics/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function Page() {
	const components = useMemo(() => {
		const componentsSection = links.find(
			(section) => section.name === "Components",
		);
		return componentsSection?.items || [];
	}, []);

	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">Components</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					A comprehensive collection of reusable components for building modern
					web applications. Each component is designed with accessibility,
					customization, and performance in mind.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col gap-4 p-6 lg:p-12 pt-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
					{components.map((component) => (
						<div
							key={component.href}
							className="flex items-center justify-between gap-2 py-1"
						>
							<Button
								variant="ghost"
								size="lg"
								className="group"
								nativeButton={false}
								render={
									<Link href={component.href}>
										{component.name}
										<ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
									</Link>
								}
							/>
						</div>
					))}
				</div>

				<div className="mt-4 text-center text-sm text-muted-foreground">
					<p>
						Showing {components.length} component
						{components.length !== 1 ? "s" : ""}
					</p>
				</div>
			</div>
		</main>
	);
}

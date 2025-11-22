"use client";
import * as React from "react";
import { Button } from "@/registry/agusmayol/button";
import { Badge } from "@/registry/agusmayol/badge";
import { Terminal, ArrowUpRight, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/registry/agusmayol/card";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
} from "@/registry/agusmayol/code-snippet";
import { Separator } from "@/registry/agusmayol/separator";

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Installation
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					How to install Optics components in your project.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 p-6 lg:p-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2">
					<p className="text-muted-foreground text-sm lg:leading-7">
						Optics is a collection of re-usable components built with Radix UI
						and Tailwind CSS. It follows the same philosophy as shadcn/ui -
						components are not installed as dependencies, but copied directly
						into your project so you have full control over them.
					</p>
				</div>

				{/* Step 1: Install shadcn CLI */}
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 break-words">
						<Badge variant="outline" className="tabular-nums aspect-square">
							1
						</Badge>
						Install the shadcn CLI
					</h2>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Optics uses the official shadcn CLI to add components to your
						project.
					</p>
					<Snippet>
						<SnippetHeader className="pl-4 flex gap-4 bg-transparent border-0">
							<span className="text-xs font-mono">
								bunx --bun shadcn@latest init
							</span>
							<SnippetCopyButton value="bunx --bun shadcn@latest init" />
						</SnippetHeader>
						<SnippetTabsContent>
							bunx --bun shadcn@latest init
						</SnippetTabsContent>
					</Snippet>
				</div>

				{/* Step 2: Add components */}
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 break-words">
						<Badge variant="outline" className="tabular-nums aspect-square">
							2
						</Badge>
						Add components
					</h2>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Now you can add any component from the Optics registry:
					</p>
					<Snippet>
						<SnippetHeader className="pl-4 flex gap-4 bg-transparent border-0">
							<span className="text-xs font-mono">
								bunx --bun shadcn@latest add @optics/accordion
							</span>
							<SnippetCopyButton value="bunx --bun shadcn@latest add @optics/accordion" />
						</SnippetHeader>
						<SnippetTabsContent>
							bunx --bun shadcn@latest add @optics/accordion
						</SnippetTabsContent>
					</Snippet>
					<p className="text-sm text-muted-foreground">
						This will copy the button component and its dependencies into your
						project.
					</p>
				</div>
			</div>
		</main>
	);
}

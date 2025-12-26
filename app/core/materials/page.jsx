"use client";
import { Button } from "@/registry/optics/button";
import { cn } from "@/lib/utils";

import { ALargeSmall, ArrowLeft, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/optics/grid";
import { toast } from "@/registry/optics/sonner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/select";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/registry/optics/tooltip";
import { Separator } from "@/registry/optics/separator";

// Helper function to copy text to clipboard
const copyToClipboard = async (text) => {
	if (
		typeof navigator !== "undefined" &&
		navigator.clipboard &&
		typeof navigator.clipboard.writeText === "function"
	) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fallback to execCommand
		}
	}

	// Fallback: use execCommand
	try {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		return true;
	} catch {
		return false;
	}
};

export default function Page() {
	const handleCopy = async (text) => {
		const cleanText = text.replace(/\u2011/g, "-");
		await copyToClipboard(cleanText);
		toast({
			toastId: "success-copy-material-to-clipboard",
			type: "success",
			title: "Copied to clipboard!",
		});
	};

	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">Materials</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					Materials are the building blocks of the system.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-4">
				<div className="flex flex-col gap-2 -mb-24">
					<h2 className="text-20">Surface</h2>
				</div>
				<GridContainer
					cols={12}
					rows={5}
					border={false}
					gap={0}
					className="[&>*:not(:first-child)]:!border-t [&>*:not(:first-child)]:hover:bg-muted [&>*:not(:first-child)]:py-1"
				>
					<GridRow className="items-end pb-8">
						<GridItem
							span={4}
							className="text-xs font-semibold justify-start gap-1"
						>
							<ALargeSmall />
							Example
						</GridItem>
						<GridItem span={2} />
						<GridItem
							span={2}
							className="text-xs font-semibold gap-1 mr-auto text-balance"
						>
							<svg
								className="size-4"
								fill="none"
								viewBox="0 0 54 33"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#prefix__clip0)">
									<path
										clipRule="evenodd"
										d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
										fill="#38bdf8"
										fillRule="evenodd"
									></path>
								</g>
							</svg>
							ClassName
						</GridItem>
						<GridItem span={2} />
						<GridItem
							span={2}
							className="text-xs font-semibold gap-1 mr-auto text-balance"
						>
							<Info size={16} />
							Usage
						</GridItem>
					</GridRow>
					{[
						{
							className: "border bg-background rounded-md",
							usage: "Everyday use. Radius 4px.",
							preview: "border bg-background rounded-md aspect-video p-18",
						},
						{
							className: "border bg-background rounded-md shadow-xs",
							usage: "Slightly raised. Radius 4px.",
							preview:
								"border bg-background rounded-md aspect-video p-18 shadow-xs",
						},
						{
							className: "border bg-background rounded-lg shadow-md",
							usage: "Further raised. Radius 8px.",
							preview:
								"border bg-background rounded-lg aspect-video p-18 shadow-md",
						},
						{
							className: "border bg-background rounded-2xl shadow-xl",
							usage: "Highly raised. Radius 16px.",
							preview:
								"border bg-background rounded-2xl aspect-video p-18 shadow-xl",
						},
					].map((item, index) => (
						<GridRow
							key={index}
							onClick={() => handleCopy(item.className)}
							className="group"
						>
							<GridItem
								span={4}
								className="flex justify-start py-4 pl-2 group-last:pb-9"
							>
								<div className={item.preview}></div>
							</GridItem>
							<GridItem span={2} />
							<GridItem span={2} className="text-xs font-mono text-balance">
								{item.className.replace(/-/g, "\u2011")}
							</GridItem>
							<GridItem span={2} />
							<GridItem span={2} className="text-xs text-balance">
								{item.usage}
							</GridItem>
						</GridRow>
					))}
				</GridContainer>
			</div>
		</main>
	);
}

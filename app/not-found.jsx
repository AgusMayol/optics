"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";

export default function Custom404() {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col flex-1 gap-8 p-12">
				<GridContainer cols={12} rows={6}>
					<GridRow>
						<GridItem decorationTopLeft />
						<GridItem span={10} />
						<GridItem />
					</GridRow>
					<GridRow>
						<GridItem />
						<GridItem span={10} />
						<GridItem />
					</GridRow>
					<GridRow className="border-t-0">
						<GridItem />
						<GridItem span={10}>
							<h1 className="text-7xl font-bold italic font-serif">
								Page Not Found
							</h1>
						</GridItem>
						<GridItem />
					</GridRow>
					<GridRow className="border-t-0">
						<GridItem />
						<GridItem span={10} className="items-end">
							<span className="text-4xl font-semibold font-mono text-muted-foreground">
								404
							</span>
						</GridItem>
						<GridItem />
					</GridRow>
					<GridRow className="border-t-0">
						<GridItem />
						<GridItem span={10} />
						<GridItem />
					</GridRow>
					<GridRow className="-mt-[1px]">
						<GridItem />
						<GridItem span={10} />
						<GridItem decorationBottomRight />
					</GridRow>
				</GridContainer>

				<div className="flex flex-col gap-18 pb-8">
					<p className="text-muted-foreground text-xl text-pretty">
						We apologize, but the page you're looking for doesn't exist or may
						have been moved. Please check the URL and try again, or return to
						the homepage to continue exploring.
					</p>

					<div className="w-full flex items-center justify-center">
						<Button variant="default" size="lg" asChild>
							<Link href="/">
								<ArrowLeft />
								Go back to the homepage
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}

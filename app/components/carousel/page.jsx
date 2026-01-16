"use client";
import { ComponentConfig } from "../layout";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/optics/carousel";
import { Card, CardContent } from "@/registry/optics/card";

import componentCode from "@/registry/optics/dist/carousel.jsx.txt";
import generatedProps from "@/registry/optics/dist/carousel.json";

const componentFiles = [
	{
		path: "@/components/optics/carousel.jsx",
		code: componentCode,
	},
];





const demoComponent = (
	<Carousel className="w-full max-w-xs">
		<CarouselContent>
			{Array.from({ length: 5 }).map((_, index) => (
				<CarouselItem key={index}>
					<div className="p-1">
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">
									{index + 1}
								</span>
							</CardContent>
						</Card>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious />
		<CarouselNext />
	</Carousel>
);

const componentConfig = {
	header: {
		title: "Carousel",
		description: "A carousel with motion and swipe built using Embla.",
		href: "https://ui.shadcn.com/docs/components/carousel",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/optics/carousel";
import { Card, CardContent } from "@/components/optics/card";`,
		filename: "carousel.jsx",
	},
	installation: {
		componentName: "carousel",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

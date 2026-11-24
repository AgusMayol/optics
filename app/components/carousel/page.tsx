"use client";

import type { ManualFile } from "@/components/installation-guide";
import { Card, CardContent } from "@/registry/optics/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/optics/carousel";
import generatedProps from "@/registry/optics/dist/carousel.json";
import componentCode from "@/registry/optics/dist/carousel.tsx.txt";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/carousel.tsx",
		code: componentCode,
	},
];

const slides = [1, 2, 3, 4, 5];

const demoComponent = (
	<Carousel className="w-full max-w-xs">
		<CarouselContent>
			{slides.map((slide) => (
				<CarouselItem key={slide}>
					<div className="p-1">
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">{slide}</span>
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

const componentConfig: ComponentConfigData = {
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
		filename: "carousel.tsx",
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

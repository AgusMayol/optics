"use client";
import { ComponentConfig } from "../layout";
import { useState } from "react";
import { Slider } from "@/registry/optics/slider";

import componentCode from "@/registry/optics/dist/slider.jsx.txt";
import generatedProps from "@/registry/optics/dist/slider.json";

const componentFiles = [
	{
		path: "@/components/optics/slider.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "slider.jsx",
		code: `import { Slider } from "@/components/optics/slider";

<Slider defaultValue={[50]} max={100} step={1} />
<Slider defaultValue={[25, 75]} max={100} step={1} />`,
	},
];



function SliderDemo() {
	const [sliderValue, setSliderValue] = useState([50]);
	const [rangeValue, setRangeValue] = useState([25, 75]);

	return (
		<div className="w-full flex flex-col items-center gap-8">
			<div className="w-full max-w-md flex flex-col gap-2">
				<Slider
					value={sliderValue}
					onValueChange={setSliderValue}
					max={100}
					step={1}
				/>
				<p className="text-sm text-muted-foreground">
					Value: {sliderValue[0]}
				</p>
			</div>

			<div className="w-full max-w-md flex flex-col gap-2">
				<Slider
					value={rangeValue}
					onValueChange={setRangeValue}
					max={100}
					step={1}
				/>
				<p className="text-sm text-muted-foreground">
					Range: {rangeValue[0]} - {rangeValue[1]}
				</p>
			</div>
		</div>
	);
}

const componentConfig = {
	header: {
		title: "Slider",
		description:
			"An input where the user selects a value from within a given range.",
		href: "https://ui.shadcn.com/docs/components/slider",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <SliderDemo />,
		code: code,
	},
	installation: {
		componentName: "slider",
		dependencies: "@radix-ui/react-slider",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return (
		<>
			<ComponentConfig config={componentConfig}>{null}</ComponentConfig>
		</>
	);
}

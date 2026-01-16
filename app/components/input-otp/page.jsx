"use client";
import { ComponentConfig } from "../layout";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/registry/optics/input-otp";

import componentCode from "@/registry/optics/dist/input-otp.jsx.txt";
import generatedProps from "@/registry/optics/dist/input-otp.json";

const componentFiles = [
	{
		path: "@/components/optics/input-otp.jsx",
		code: componentCode,
	},
];





const demoComponent = (
	<InputOTP maxLength={6} variant="raised">
		<InputOTPGroup>
			<InputOTPSlot variant="raised" index={0} />
			<InputOTPSlot variant="raised" index={1} />
			<InputOTPSlot variant="raised" index={2} />
			<InputOTPSlot variant="raised" index={3} />
			<InputOTPSlot variant="raised" index={4} />
			<InputOTPSlot variant="raised" index={5} />
		</InputOTPGroup>
	</InputOTP>
);

const componentConfig = {
	header: {
		title: "Input OTP",
		description:
			"Accessible one-time password component with copy paste functionality.",
		href: "https://ui.shadcn.com/docs/components/input-otp",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/optics/input-otp";`,
		filename: "input-otp.jsx",
	},
	installation: {
		componentName: "input-otp",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

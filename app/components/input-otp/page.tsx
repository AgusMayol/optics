"use client";
import type { ManualFile } from "@/components/installation-guide";
import generatedProps from "@/registry/optics/dist/input-otp.json";
import componentCode from "@/registry/optics/dist/input-otp.tsx.txt";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/optics/input-otp";
import { ComponentConfig, type ComponentConfigData } from "../layout";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/input-otp.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<InputOTP maxLength={6}>
		<InputOTPGroup>
			<InputOTPSlot index={0} />
			<InputOTPSlot index={1} />
			<InputOTPSlot index={2} />
			<InputOTPSlot index={3} />
			<InputOTPSlot index={4} />
			<InputOTPSlot index={5} />
		</InputOTPGroup>
	</InputOTP>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Input OTP",
		description: "Accessible one-time password component with copy paste functionality.",
		href: "https://ui.shadcn.com/docs/components/input-otp",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/optics/input-otp";`,
		filename: "input-otp.tsx",
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

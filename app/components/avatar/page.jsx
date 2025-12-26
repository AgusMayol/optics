"use client";
import { ComponentConfig } from "../layout";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
	AvatarStack,
} from "@/registry/optics/avatar";

import componentCode from "@/registry/optics/dist/avatar.jsx.txt";
import generatedProps from "@/registry/optics/dist/avatar.json";

const componentFiles = [
	{
		path: "@/components/optics/avatar.jsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex flex-col gap-6">
		<div className="flex items-center gap-4">
			<Avatar title="Optics">
				<AvatarImage src="/images/logo.svg" alt="optics" />
				<AvatarFallback>OP</AvatarFallback>
			</Avatar>

			<AvatarStack
				data={[
					{
						image: "https://github.com/agusmayol.png",
						fallback: "AM",
						title: "Agus Mayol",
					},
					{
						image: "https://github.com/clcautomation.png",
						fallback: "CLC",
						title: "CLC Automation",
					},
				]}
			/>
		</div>

		<div className="flex items-center gap-2">
			<AvatarGroup>
				<Avatar title="Agus Mayol">
					<AvatarImage
						src="https://github.com/agusmayol.png"
						alt="Agus Mayol"
					/>
					<AvatarFallback>AM</AvatarFallback>
					<AvatarBadge aria-label="Online" />
				</Avatar>
				<Avatar title="CLC Automation">
					<AvatarImage
						src="https://github.com/clcautomation.png"
						alt="CLC Automation"
					/>
					<AvatarFallback>CLC</AvatarFallback>
				</Avatar>
				<Avatar title="Optics">
					<AvatarImage src="/images/logo.svg" alt="Optics" />
					<AvatarFallback>OP</AvatarFallback>
					<AvatarBadge aria-label="Do not disturb" />
				</Avatar>
			</AvatarGroup>
			<AvatarGroupCount aria-label="Three more people">+3</AvatarGroupCount>
		</div>
	</div>
);

const componentConfig = {
	header: {
		title: "Avatar",
		description:
			"An image element with a fallback for representing the user.",
		href: "https://ui.shadcn.com/docs/components/avatar",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import { Avatar, AvatarBadge, AvatarGroup, AvatarGroupCount, AvatarImage, AvatarFallback, AvatarStack } from "@/components/optics/avatar";`,
		filename: "avatar.jsx",
	},
	installation: {
		componentName: "avatar",
		dependencies: "@base-ui/react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

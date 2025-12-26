"use client";
import { ComponentConfig } from "../layout";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/registry/optics/field";
import { Input } from "@/registry/optics/input";

import componentCode from "@/registry/optics/dist/field.jsx.txt";
import generatedProps from "@/registry/optics/dist/field.json";

const componentFiles = [
	{
		path: "@/components/optics/field.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "field.jsx",
		code: `import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/optics/field";
import { Input } from "@/components/optics/input";

<FieldGroup>
	<FieldSet>
		<FieldLegend>Payment Method</FieldLegend>
		<FieldDescription>
			All transactions are secure and encrypted
		</FieldDescription>
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor="card-name">Name on Card</FieldLabel>
				<Input id="card-name" placeholder="John Doe" required />
			</Field>
			<Field>
				<FieldLabel htmlFor="card-number">Card Number</FieldLabel>
				<Input id="card-number" placeholder="1234 5678 9012 3456" required />
				<FieldDescription>
					Enter your 16-digit card number
				</FieldDescription>
			</Field>
		</FieldGroup>
	</FieldSet>
</FieldGroup>`,
	},
];



const demoComponent = (
	<div className="w-full max-w-md">
		<FieldGroup>
			<FieldSet>
				<FieldLegend>Payment Method</FieldLegend>
				<FieldDescription>
					All transactions are secure and encrypted
				</FieldDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="demo-card-name">
							Name on Card
						</FieldLabel>
						<Input
							id="demo-card-name"
							placeholder="John Doe"
							variant="raised"
							required
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="demo-card-number">
							Card Number
						</FieldLabel>
						<Input
							id="demo-card-number"
							placeholder="1234 5678 9012 3456"
							variant="raised"
							required
						/>
						<FieldDescription>
							Enter your 16-digit card number
						</FieldDescription>
					</Field>
				</FieldGroup>
			</FieldSet>
		</FieldGroup>
	</div>
);

const componentConfig = {
	header: {
		title: "Field",
		description:
			"Composable form field components for building accessible forms.",
		href: "https://ui.shadcn.com/docs/components/field",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		code: code,
	},
	installation: {
		componentName: "field",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

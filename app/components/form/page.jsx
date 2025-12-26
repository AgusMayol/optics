"use client";
import { ComponentConfig } from "../layout";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/optics/form";
import { Input } from "@/registry/optics/input";
import { Button } from "@/registry/optics/button";

import componentCode from "@/registry/optics/dist/form.jsx.txt";
import generatedProps from "@/registry/optics/dist/form.json";

const componentFiles = [
	{
		path: "@/components/optics/form.jsx",
		code: componentCode,
	},
];

const code = [
	{
		language: "jsx",
		filename: "form.jsx",
		code: `import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/optics/form";
import { Input } from "@/components/optics/input";
import { Button } from "@/components/optics/button";

const form = useForm({
	defaultValues: {
		username: "",
	},
});

function onSubmit(data) {
	console.log(data);
}

<Form {...form}>
	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
		<FormField
			control={form.control}
			name="username"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Username</FormLabel>
					<FormControl>
						<Input placeholder="John Doe" variant="raised" {...field} />
					</FormControl>
					<FormDescription>
						This is your public display name.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
		<Button type="submit" variant="default">Submit</Button>
	</form>
</Form>`,
	},
];


function FormDemo() {
	const form = useForm({
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full max-w-md"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="John Doe"
									variant="raised"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="default">
					Submit
				</Button>
			</form>
		</Form>
	);
}

const componentConfig = {
	header: {
		title: "Form",
		description: "Building forms with React Hook Form and Zod.",
		href: "https://ui.shadcn.com/docs/components/form",
		hrefText: "shadcn/ui",
	},
	content: {
		children: <FormDemo />,
		code: code,
	},
	installation: {
		componentName: "form",
		dependencies: "",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

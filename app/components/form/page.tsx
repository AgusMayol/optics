"use client";
import { ComponentConfig } from "../layout";
import { useForm, type ControllerRenderProps } from "react-hook-form";
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

import componentCode from "@/registry/optics/dist/form.tsx.txt";
import generatedProps from "@/registry/optics/dist/form.json";

const componentFiles = [
	{
		path: "@/components/optics/form.tsx",
		code: componentCode,
	},
];

export default function Page() {
	const form = useForm<{ username: string }>({
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data: { username: string }) {
		console.log(data);
	}

	const demoComponent = (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full max-w-md"
			>
				<FormField
					control={form.control}
					name="username"
					render={({
						field,
					}: {
						field: ControllerRenderProps<{ username: string }, "username">;
					}) => (
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
				<Button type="submit" variant="default">
					Submit
				</Button>
			</form>
		</Form>
	);

	const componentConfig = {
		header: {
			title: "Form",
			description: "Building forms with React Hook Form and Zod.",
			href: "https://ui.shadcn.com/docs/components/form",
			hrefText: "shadcn/ui",
		},
		content: {
			children: demoComponent,
			imports: `import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/optics/form";
import { Input } from "@/components/optics/input";
import { Button } from "@/components/optics/button";

const form = useForm({
	defaultValues: {
		username: "",
	},
});

function onSubmit(data) {
	console.log(data);
}`,
			filename: "form.tsx",
		},
		installation: {
			componentName: "form",
			dependencies: "react-hook-form zod @hookform/resolvers",
			manualFiles: componentFiles,
		},
		props: generatedProps,
	};

	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

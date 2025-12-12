"use client";
import { InstallationGuide } from "@/components/installation-guide";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/registry/optics/input-otp";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import componentCode from "@/registry/optics/input-otp.jsx.txt";

const code = [
	{
		language: "jsx",
		filename: "input-otp.jsx",
		code: `import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/optics/input-otp";

<InputOTP maxLength={6}>
	<InputOTPGroup>
		<InputOTPSlot index={0} />
		<InputOTPSlot index={1} />
		<InputOTPSlot index={2} />
		<InputOTPSlot index={3} />
		<InputOTPSlot index={4} />
		<InputOTPSlot index={5} />
	</InputOTPGroup>
</InputOTP>`,
	},
];

const installDeps = [];

const componentFiles = [
	{
		path: "@/components/optics/input-otp.jsx",
		code: componentCode,
	},
];

export default function Page() {
	const {
		value,
		setValue,
		installationTab,
		handleTabChange,
	} = useCookiePreferences("input-otp", installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Input OTP
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/input-otp"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Accessible one-time password component with copy paste functionality.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
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
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
									showArrow
								>
									Show Code
								</AccordionTrigger>
								<AccordionContent
									className="border-b-0 border-x-0 border-t pb-0 shadow-none"
									keepRendered
								>
									<CodeBlock
										data={code}
										defaultValue={code[0].filename}
										className="border-none rounded-none rounded-b-xl shadow-none group"
									>
										<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
											<CodeBlockCopyButton
												onCopy={() => console.log("Copied code to clipboard")}
												onError={() =>
													console.error("Failed to copy code to clipboard")
												}
											/>
										</CodeBlockHeader>
										<CodeBlockBody>
											{(item) => (
												<CodeBlockItem
													key={item.language}
													value={item.filename}
												>
													<CodeBlockContent
														language={item.language}
														className="bg-sidebar"
													>
														{item.code}
													</CodeBlockContent>
												</CodeBlockItem>
											)}
										</CodeBlockBody>
									</CodeBlock>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</CardFooter>
				</Card>
			</div>

			<InstallationGuide
				value={value}
				setValue={setValue}
				componentName="input-otp"
				installDeps={installDeps}
				manualFiles={componentFiles}
				installationTab={installationTab}
				handleTabChange={handleTabChange}
			/>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<PropsTable
					data={[
						{
							component: "<InputOTP />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the OTP input.",
								},
								{
									name: "containerClassName",
									type: "string",
									description: "CSS classes for the container element.",
								},
								{
									name: "variant",
									type: 'string (default: "outline")',
									description: "Variant style for the OTP input slots.",
								},
								{
									name: "maxLength",
									type: "number (required)",
									description:
										"Maximum number of characters allowed in the OTP.",
								},
								{
									name: "value",
									type: "string",
									description:
										"The controlled value of the OTP input. Use with onChange.",
								},
								{
									name: "defaultValue",
									type: "string",
									description:
										"The uncontrolled default value of the OTP input.",
								},
								{
									name: "onChange",
									type: "(value: string) => void",
									description: "Callback fired when the OTP value changes.",
								},
								{
									name: "disabled",
									type: "boolean",
									description:
										"When true, prevents user interaction with the OTP input.",
								},
								{
									name: "pattern",
									type: "RegExp",
									description:
										"Regular expression pattern to validate each character.",
								},
								{
									name: "type",
									type: `"text" | "password" | "number" | "tel"`,
									description: "The type of input. Defaults to 'text'.",
								},
							],
						},
						{
							component: "<InputOTPGroup />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the group.",
								},
							],
						},
						{
							component: "<InputOTPSlot />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the slot.",
								},
								{
									name: "index",
									type: "number (required)",
									description: "The index of the slot in the OTP input.",
								},
								{
									name: "variant",
									type: 'string (default: "outline")',
									description: "Variant style for the slot.",
								},
							],
						},
						{
							component: "<InputOTPSeparator />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the separator.",
								},
							],
						},
					]}
				/>
			</div>

			<ComponentNavigation />
		</main>
	);
}

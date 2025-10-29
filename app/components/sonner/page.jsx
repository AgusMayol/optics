"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/agusmayol/accordion";
import { Button } from "@/registry/agusmayol/button";
import { Card, CardContent, CardFooter } from "@/registry/agusmayol/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/agusmayol/code-block";
import { CornerDownLeft } from "lucide-react";

import { toast } from "@/registry/agusmayol/sonner";

export default function Page() {
	const code = [
		{
			language: "jsx",
			filename: "sonner.jsx",
			code: `import { toast } from "@/registry/agusmayol/sonner";
import { Button } from "@/registry/agusmayol/button";


<Button
	variant="raised"
	onClick={() =>
		toast({
			toastId: "success-demo",
			type: "success",
			title: "Success!",
			description: "Your action was completed successfully.",
		})
	}
>
	Success Toast
</Button>


<Button
	variant="raised"
	onClick={() =>
		toast({
			toastId: "info-demo",
			type: "info",
			title: "Information",
			description: "Here's some useful information for you.",
		})
	}
>
	Info Toast
</Button>


<Button
	variant="raised"
	onClick={() =>
		toast({
			toastId: "warning-demo",
			type: "warning",
			title: "Warning",
			description: "Please be careful with this action.",
		})
	}
>
	Warning Toast
</Button>


<Button
	variant="raised"
	onClick={() =>
		toast({
			toastId: "error-demo",
			type: "error",
			title: "Error",
			description: "Something went wrong. Please try again.",
		})
	}
>
	Error Toast
</Button>


<Button
	variant="raised"
	onClick={() => {
		// Create a promise that resolves after 2 seconds
		const mockPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve("Data saved successfully!");
			}, 2000);
		});
		
		toast({
			toastId: "promise-success-demo",
			type: "promise",
			promise: mockPromise,
			loading: "Saving your data...",
			success: "Data saved successfully!",
			error: "Failed to save data. Please try again.",
		});
	}}
>
	Promise Toast (Always Success)
</Button>


<Button
	variant="raised"
	onClick={() => {
		// Create a promise that always fails for testing error state
		const mockPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Server is currently unavailable");
			}, 2000);
		});
		
		toast({
			toastId: "promise-error-demo",
			type: "promise",
			promise: mockPromise,
			loading: "Connecting to server...",
			success: "Connected successfully!",
			error: "Connection failed. Server is down.",
		});
	}}
>
	Promise Toast (Always Error)
</Button>


<Button
	variant="raised"
	onClick={() =>
		toast({
			toastId: "custom-button-demo",
			type: "success",
			title: "Custom Toast",
			description:
				"You have full control of styles and jsx, while still having the animations.",
			button: {
				label: (
					<div className="flex items-center gap-2">
						<span>Reply</span>
						<CornerDownLeft className="!size-3" />
					</div>
				),
				onClick: () => console.log("Reply"),
			},
		})
	}
>
	Toast with Button
</Button>`,
		},
	];

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Sonner</h1>
				<p className="text-muted-foreground text-xl">
					Displays a toast or a component that looks like a toast.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<Button
							variant="success"
							onClick={() =>
								toast({
									toastId: "success-demo",
									type: "success",
									title: "Success!",
									description: "Your action was completed successfully.",
								})
							}
						>
							Success Toast
						</Button>
						<Button
							variant="info"
							onClick={() =>
								toast({
									toastId: "info-demo",
									type: "info",
									title: "Information",
									description: "Here's some useful information for you.",
								})
							}
						>
							Info Toast
						</Button>
						<Button
							variant="warning"
							onClick={() =>
								toast({
									toastId: "warning-demo",
									type: "warning",
									title: "Warning",
									description: "Please be careful with this action.",
								})
							}
						>
							Warning Toast
						</Button>
						<Button
							variant="destructive"
							onClick={() =>
								toast({
									toastId: "error-demo",
									type: "error",
									title: "Error",
									description: "Something went wrong. Please try again.",
								})
							}
						>
							Error Toast
						</Button>
						<Button
							variant="raised"
							onClick={() => {
								// Create a promise that resolves after 2 seconds
								const mockPromise = new Promise((resolve, reject) => {
									setTimeout(() => {
										resolve("Data saved successfully!");
									}, 2000);
								});

								toast({
									toastId: "promise-success-demo",
									type: "promise",
									promise: mockPromise,
									loading: "Saving your data...",
									success: "Data saved successfully!",
									error: "Failed to save data. Please try again.",
								});
							}}
						>
							Promise Toast (Always Success)
						</Button>
						<Button
							variant="raised"
							onClick={() => {
								// Create a promise that always fails for testing error state
								const mockPromise = new Promise((resolve, reject) => {
									setTimeout(() => {
										reject("Server is currently unavailable");
									}, 2000);
								});

								toast({
									toastId: "promise-error-demo",
									type: "promise",
									promise: mockPromise,
									loading: "Connecting to server...",
									success: "Connected successfully!",
									error: "Connection failed. Server is down.",
									button: {
										label: "Retry",
										onClick: () => {
											console.log("Retry");
										},
									},
								});
							}}
						>
							Promise Toast (Always Error)
						</Button>
						<Button
							variant="raised"
							onClick={() =>
								toast({
									toastId: "custom-button-demo",
									type: "success",
									title: "Custom Toast",
									description:
										"You have full control of styles and jsx, while still having the animations.",
									button: {
										label: (
											<div className="flex items-center gap-2">
												<span>Reply</span>
												<CornerDownLeft className="!size-3" />
											</div>
										),
										onClick: () => console.log("Reply"),
									},
								})
							}
						>
							Toast with Button
						</Button>
					</CardContent>

					<CardFooter className="border-t px-0 py-0 bg-background rounded-b-xl">
						{/* Component Code */}
						<Accordion type={"single"} collapsible className="w-full">
							<AccordionItem value="codeblock" className="rounded-b-xl">
								<AccordionTrigger
									className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
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
		</main>
	);
}

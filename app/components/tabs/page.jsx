"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.svg";
import { ArrowLeft, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";
import { Input } from "@/registry/agusmayol/input";
import { Label } from "@/registry/agusmayol/label";
import { Switch } from "@/registry/agusmayol/switch";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/agusmayol/tabs";
const code = [
	{
		language: "jsx",
		filename: "card.jsx",
		code: `import { Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger, } from "@/registry/agusmayol/tabs";
        
        
<Tabs>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContents>
    <TabsContent value="account">
      Make changes to your account here.
    </TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </TabsContents>
</Tabs>`,
	},
];
export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-0">
				<h1 className="text-4xl font-bold tracking-tight">Tabs</h1>
				<p className="text-muted-foreground text-xl">
					Displays a tabs or a component that looks like a tabs.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-12 bg-background">
				<Card className="pt-8 pb-0 bg-background">
					<CardContent className="px-8 flex items-center justify-center flex-wrap gap-4">
						{/* Component */}
						<Tabs defaultValue="account">
							<TabsList>
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="password">Password</TabsTrigger>
							</TabsList>
							<Card className="shadow-none py-0 min-w-[400px]">
								<TabsContents className="py-6">
									<TabsContent value="account" className="flex flex-col gap-6">
										<CardHeader>
											<CardTitle>Account</CardTitle>
											<CardDescription>
												Make changes to your account here. Click save when
												you&apos;re done.
											</CardDescription>
										</CardHeader>
										<CardContent className="grid gap-6">
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-name">Name</Label>
												<Input
													id="tabs-demo-name"
													defaultValue="Pedro Duarte"
												/>
											</div>
										</CardContent>
										<CardFooter>
											<Button>Save changes</Button>
										</CardFooter>
									</TabsContent>
									<TabsContent value="password" className="flex flex-col gap-6">
										<CardHeader>
											<CardTitle>Password</CardTitle>
											<CardDescription>
												Change your password here. After saving, you&apos;ll be
												logged out.
											</CardDescription>
										</CardHeader>
										<CardContent className="grid gap-6">
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-current">
													Current password
												</Label>
												<Input id="tabs-demo-current" type="password" />
											</div>
											<div className="grid gap-3">
												<Label htmlFor="tabs-demo-new">New password</Label>
												<Input id="tabs-demo-new" type="password" />
											</div>
										</CardContent>
										<CardFooter>
											<Button>Save password</Button>
										</CardFooter>
									</TabsContent>
								</TabsContents>
							</Card>
						</Tabs>
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

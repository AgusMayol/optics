"use client";
import { ComponentNavigation } from "@/components/component-navigation";
import { PropsTable } from "@/components/props-table";
import { useCookiePreferences } from "@/lib/use-cookie-preferences";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/optics/accordion";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Card, CardContent, CardFooter } from "@/registry/optics/card";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/optics/code-block";
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsContents,
	SnippetTabsList,
	SnippetTabsTrigger,
} from "@/registry/optics/code-snippet";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/multi-select";
import { Separator } from "@/registry/optics/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/registry/optics/tabs";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const code = [
	{
		language: "jsx",
		filename: "multi-select.jsx",
		code: `import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/optics/multi-select";

<Select onValuesChange={(values) => console.log(values)}>
	<SelectTrigger variant="raised">
		<SelectValue placeholder="Select status" />
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectLabel>Status</SelectLabel>
			<SelectItem value="ready" color="bg-teal-400">
				Ready
			</SelectItem>
			<SelectItem value="error" color="bg-red-500">
				Error
			</SelectItem>
			<SelectItem value="building" color="bg-amber-400">
				Building
			</SelectItem>
			<SelectItem value="queued" color="bg-gray-200">
				Queued
			</SelectItem>
		</SelectGroup>
	</SelectContent>
</Select>`,
	},
];

const selectComponentCode = [
	{
		language: "jsx",
		filename: "components/ui/optics/multi-select.jsx",
		code: `"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
	Button,
	buttonVariants,
	otherThemes,
} from "@/registry/optics/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox, CheckboxPrimitive } from "@/registry/optics/checkbox";

// Contexto para compartir el estado de selección entre todos los items
const MultiSelectContext = React.createContext({
	values: {},
	setValue: () => {},
	onValuesChange: () => {},
	itemCount: 0,
	colors: {},
	registerColor: () => {},
});

function Select({ onValuesChange, onOpenChange, ...props }) {
	const [values, setValues] = React.useState({});
	const [colors, setColors] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const registeredItemsRef = React.useRef(new Set());

	// Función para registrar un item
	const registerItem = React.useCallback((value) => {
		if (value && !registeredItemsRef.current.has(value)) {
			registeredItemsRef.current.add(value);
			setValues((prev) => {
				if (!(value in prev)) {
					return { ...prev, [value]: false };
				}
				return prev;
			});
		}
	}, []);

	// Función para registrar el color de un item
	const registerColor = React.useCallback((value, color) => {
		if (value) {
			setColors((prev) => ({ ...prev, [value]: color }));
		}
	}, []);

	// Función para actualizar un valor
	const setValue = React.useCallback(
		(value, checked) => {
			setValues((prev) => {
				const newValues = { ...prev, [value]: checked };
				// Llamar al callback con el array de valores
				if (onValuesChange) {
					const valuesArray = Object.entries(newValues).map(([key, val]) => ({
						value: key,
						checked: val,
					}));
					onValuesChange(valuesArray);
				}
				return newValues;
			});
		},
		[onValuesChange],
	);

	const handleOpenChange = React.useCallback(
		(newOpen) => {
			setOpen(newOpen);
			if (onOpenChange) {
				onOpenChange(newOpen);
			}
		},
		[onOpenChange],
	);

	const contextValue = React.useMemo(
		() => ({
			values,
			setValue,
			registerItem,
			itemCount: registeredItemsRef.current.size,
			colors,
			registerColor,
		}),
		[values, setValue, registerItem, colors, registerColor],
	);

	return (
		<MultiSelectContext.Provider value={contextValue}>
			<SelectPrimitive.Root
				data-slot="select"
				open={open}
				onOpenChange={handleOpenChange}
				{...props}
			/>
		</MultiSelectContext.Provider>
	);
}

function SelectGroup({ ...props }) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({ ...props }) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = "default",
	children,
	variant,
	...props
}) {
	const { values, colors, itemCount } = React.useContext(MultiSelectContext);

	// Obtener los items seleccionados con sus colores
	const selectedItems = React.useMemo(() => {
		return Object.entries(values)
			.filter(([_, checked]) => checked)
			.map(([value, _]) => ({
				value,
				color: colors[value] || "bg-gray-200",
			}));
	}, [values, colors]);

	const selectedCount = selectedItems.length;
	const totalCount = itemCount;

	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit min-w-3xs items-center justify-between gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
				otherThemes({ variant: variant }),
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2 flex-1 min-w-0">
				{selectedCount > 0 && (
					<div className="flex items-center -space-x-0.25 -ml-1">
						{selectedItems.map((item, index) => (
							<Badge
								key={item.value}
								className={cn(
									"rounded-full squircle-none aspect-square size-3 p-0 border border-background -ml-1 first:ml-0",
									item.color
								)}
								style={{
									zIndex: selectedItems.length - index,
								}}
							/>
						))}
					</div>
				)}
				{children}
			</div>
			{totalCount > 0 && (
				<span className="text-xs text-muted-foreground ml-2 shrink-0">
					{selectedCount}/{totalCount}
				</span>
			)}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50 shrink-0" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({ className, children, position = "popper", ...props }) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border shadow-md",
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({ className, ...props }) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
			{...props}
		/>
	);
}

function SelectItem({ className, children, value, color, ...props }) {
	const { values, setValue, registerItem, registerColor, itemCount } =
		React.useContext(MultiSelectContext);
	const [isHoveringCheckbox, setIsHoveringCheckbox] = React.useState(false);
	const [isHoveringText, setIsHoveringText] = React.useState(false);

	// Registrar el item cuando se monta
	React.useEffect(() => {
		if (value) {
			registerItem(value);
		}
	}, [value, registerItem]);

	// Registrar el color cuando se monta o cambia
	React.useEffect(() => {
		if (value && color) {
			registerColor(value, color);
		}
	}, [value, color, registerColor]);

	const checked = value ? (values[value] ?? false) : false;

	// Calcular estados
	const allChecked = Object.values(values).every((v) => v === true);
	const someChecked = Object.values(values).some((v) => v === true);
	const noneChecked = !someChecked;

	// Determinar qué texto mostrar según los comentarios
	const getActionText = () => {
		if (checked && isHoveringCheckbox) {
			return "Uncheck";
		}
		if (noneChecked && (isHoveringCheckbox || isHoveringText)) {
			return "Check";
		}
		if (someChecked && !checked && isHoveringCheckbox) {
			return "Check";
		}
		if (!checked && someChecked && isHoveringText) {
			return "Only";
		}
		if (checked && allChecked && isHoveringText) {
			return "Only";
		}
		if (checked && someChecked && !allChecked && isHoveringText) {
			return "Check All";
		}
		return "";
	};

	const handleCheckboxClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (value) {
			setValue(value, !checked);
		}
	};

	const handleTextClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (!value) return;

		if (checked && someChecked && !allChecked && isHoveringText) {
			Object.keys(values).forEach((key) => {
				setValue(key, true);
			});
		} else if (isHoveringText && ((!checked && someChecked) || (checked && allChecked))) {
			Object.keys(values).forEach((key) => {
				setValue(key, key === value);
			});
		} else {
			setValue(value, true);
		}
	};

	return (
		<div className="w-full flex items-center gap-1 group">
			<div
				className={cn(
					buttonVariants({
						variant: "ghost",
						size: "icon-sm",
						animation: "none",
					}),
					"aspect-square [&_svg]:!size-3.5",
				)}
				onClick={handleCheckboxClick}
				onMouseEnter={() => setIsHoveringCheckbox(true)}
				onMouseLeave={() => setIsHoveringCheckbox(false)}
			>
				<Checkbox checked={checked} />
			</div>

			<div
				className={cn(
					buttonVariants({
						variant: "ghost",
						size: "icon-sm",
						animation: "none",
					}),
					"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center justify-between gap-8 w-full cursor-pointer rounded-lg py-1.5 pr-2 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
					className,
				)}
				value={value}
				onSelect={() => {
					// Prevenir el cierre del select - no hacer nada
				}}
				onClick={handleTextClick}
				onMouseEnter={() => setIsHoveringText(true)}
				onMouseLeave={() => setIsHoveringText(false)}
				{...props}
			>
				<div className="flex items-center gap-2">
					<Badge className={cn("rounded-full squircle-none aspect-square size-3 p-0 bg-gray-200 border border-background", color)} />
					{children}
				</div>

				<div className="flex w-fit items-center justify-center text-xs text-muted-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-50">
					{getActionText()}
				</div>
			</div>
		</div>
	);
}

function SelectSeparator({ className, ...props }) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({ className, ...props }) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({ className, ...props }) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				"flex cursor-default items-center justify-center py-1",
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};`,
	},
];

const commands = [
	{
		label: "pnpm",
		code: "pnpm dlx shadcn@latest add @optics/multi-select",
	},
	{
		label: "npm",
		code: "npx shadcn@latest add @optics/multi-select",
	},
	{
		label: "yarn",
		code: "yarn shadcn@latest add @optics/multi-select",
	},
	{
		label: "bun",
		code: "bunx --bun shadcn@latest add @optics/multi-select",
	},
];

const installDeps = [
	{
		label: "pnpm",
		code: "pnpm add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "npm",
		code: "npm install @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "yarn",
		code: "yarn add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
	{
		label: "bun",
		code: "bun add @radix-ui/react-select @radix-ui/react-checkbox lucide-react",
	},
];

export default function Page() {
	const {
		mounted,
		value,
		setValue,
		installationTab,
		handleTabChange,
		activeCommand,
		activeDepsCommand,
	} = useCookiePreferences(commands, installDeps);

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<div className="w-full flex items-center justify-between">
					<h1 className="text-3xl lg:text-4xl font-bold tracking-tight truncate">
						Multi Select
					</h1>
					<Button variant="link" size="sm" asChild>
						<Link
							href="https://ui.shadcn.com/docs/components/select"
							target="_blank"
							rel="noopener noreferrer"
						>
							shadcn/ui
							<ArrowUpRight className="-ml-1" />
						</Link>
					</Button>
				</div>

				<p className="text-muted-foreground text-base lg:text-xl text-pretty">
					Multi select allows the user to select multiple options from a list.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 pt-4">
				<Card className="pt-8 pb-0 bg-sidebar">
					<CardContent className="px-8 flex items-center justify-center gap-4">
						<Select onValuesChange={(values) => console.log(values)}>
							<SelectTrigger variant="raised">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent className="w-full">
								<SelectGroup>
									<SelectLabel>Status</SelectLabel>
									<SelectItem value="ready" color="bg-teal-400">
										Ready
									</SelectItem>
									<SelectItem value="error" color="bg-red-500">
										Error
									</SelectItem>
									<SelectItem value="building" color="bg-amber-400">
										Building
									</SelectItem>
									<SelectItem value="queued" color="bg-gray-200">
										Queued
									</SelectItem>
									<SelectItem value="provisioning" color="bg-gray-200">
										Provisioning
									</SelectItem>
									<SelectItem value="canceled" color="bg-gray-200">
										Canceled
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
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
											<CodeBlockCopyButton />
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

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Installation
				</h2>
				<Tabs
					value={installationTab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList variant="underline">
						<TabsTrigger value="tab1">CLI</TabsTrigger>
						<TabsTrigger value="tab2">Manual</TabsTrigger>
					</TabsList>
					<TabsContents className="w-full pt-2">
						<TabsContent value="tab1" className="w-full pt-4">
							<Snippet
								onValueChange={setValue}
								value={value}
								className="w-full"
							>
								<SnippetHeader>
									<SnippetTabsList variant="outline">
										{commands.map((command) => (
											<SnippetTabsTrigger
												key={command.label}
												value={command.label}
											>
												<span>{command.label}</span>
											</SnippetTabsTrigger>
										))}
									</SnippetTabsList>
								</SnippetHeader>
								<SnippetTabsContents>
									{commands.map((command) => (
										<SnippetTabsContent
											key={command.label}
											value={command.label}
											className="w-full flex items-center justify-between gap-8 py-2 pr-2"
										>
											{command.code}
											{activeCommand && (
												<SnippetCopyButton value={activeCommand.code} />
											)}
										</SnippetTabsContent>
									))}
								</SnippetTabsContents>
							</Snippet>
						</TabsContent>
						<TabsContent
							value="tab2"
							className="w-full pt-4 flex flex-col gap-12"
						>
							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Install the following dependencies:
								</p>

								<Snippet
									onValueChange={setValue}
									value={value}
									className="w-full"
								>
									<SnippetHeader>
										<SnippetTabsList variant="outline">
											{installDeps.map((command) => (
												<SnippetTabsTrigger
													key={command.label}
													value={command.label}
												>
													<span>{command.label}</span>
												</SnippetTabsTrigger>
											))}
										</SnippetTabsList>
									</SnippetHeader>
									<SnippetTabsContents>
										{installDeps.map((command) => (
											<SnippetTabsContent
												key={command.label}
												value={command.label}
												className="w-full flex items-center justify-between gap-8 py-2 pr-2"
											>
												{command.code}
												{activeDepsCommand && (
													<SnippetCopyButton value={activeDepsCommand.code} />
												)}
											</SnippetTabsContent>
										))}
									</SnippetTabsContents>
								</Snippet>
							</div>

							<div className="w-full flex flex-col gap-2">
								<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
									Copy and paste the following code into your project:
								</p>

								<CodeBlock
									data={selectComponentCode}
									defaultValue={selectComponentCode[0].filename}
								>
									<CodeBlockHeader>
										<CodeBlockFiles>
											{(item) => (
												<CodeBlockFilename
													key={item.language}
													value={item.filename}
												>
													{item.filename}
												</CodeBlockFilename>
											)}
										</CodeBlockFiles>

										<CodeBlockCopyButton variant="ghost" />
									</CodeBlockHeader>
									<CodeBlockBody>
										{(item) => (
											<CodeBlockItem key={item.language} value={item.filename}>
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
							</div>

							<p className="text-[16px] leading-[1.3] tracking-[-0.01em] font-semibold">
								Update the import paths to match your project setup.
							</p>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>

			<div className="flex flex-col items-start justify-start gap-4 p-6 lg:p-12 pt-0">
				<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold">
					Props
				</h2>
				<PropsTable
					data={[
						{
							component: "<Select />",
							props: [
								{
									name: "onValuesChange",
									type: "(values: Array<{value: string, checked: boolean}>) => void",
									description:
										"Callback function called when selected values change.",
								},
								{
									name: "onOpenChange",
									type: "(open: boolean) => void",
									description:
										"Callback function called when the select opens or closes.",
								},
							],
						},
						{
							component: "<SelectTrigger />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the trigger.",
								},
								{
									name: "size",
									type: `"default" | "sm" (default: "default")`,
									description: "Size of the trigger button.",
								},
								{
									name: "variant",
									type: `"raised" | "ghost" | "outline"`,
									description: "Variant style for the trigger button.",
								},
							],
						},
						{
							component: "<SelectContent />",
							props: [
								{
									name: "className",
									type: "string",
									description:
										"Additional CSS classes to apply to the content.",
								},
								{
									name: "position",
									type: `"popper" | "item-aligned" (default: "popper")`,
									description: "Positioning strategy for the content.",
								},
							],
						},
						{
							component: "<SelectItem />",
							props: [
								{
									name: "className",
									type: "string",
									description: "Additional CSS classes to apply to the item.",
								},
								{
									name: "value",
									type: "string (required)",
									description: "The value of the select item.",
								},
								{
									name: "color",
									type: "string (Tailwind color class)",
									description:
										"Tailwind color class for the item's badge when selected.",
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

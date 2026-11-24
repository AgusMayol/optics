"use client";

import * as React from "react";
import { ArrowUpIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/registry/optics/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/optics/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "@/registry/optics/input-group";

export interface ModelOption {
	id: string;
	name: string;
	description?: string;
	provider?: string;
	disabled?: boolean;
}

export interface ModelProvider {
	name: string;
	models: ModelOption[];
}

export interface EffortOption {
	id: string;
	name: string;
	description?: string;
	disabled?: boolean;
}

const DEFAULT_PROVIDERS: ModelProvider[] = [
	{
		name: "OpenAI",
		models: [
			{ id: "gpt-5", name: "GPT-5" },
			{ id: "gpt-5-mini", name: "GPT-5 mini" },
		],
	},
	{
		name: "Anthropic",
		models: [
			{ id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
			{ id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
		],
	},
];

const DEFAULT_EFFORTS: EffortOption[] = [
	{ id: "low", name: "Low" },
	{ id: "medium", name: "Medium" },
	{ id: "high", name: "High" },
];

interface ModelSelectorContextValue {
	providers: ModelProvider[];
	efforts: EffortOption[];
	model: string;
	setModel: (modelId: string) => void;
	effort: string;
	setEffort: (effortId: string) => void;
}

const ModelSelectorContext = React.createContext<ModelSelectorContextValue | null>(null);
const ComposerGroupContext = React.createContext(false);

function normalizeProviders(providers?: ModelProvider[], models?: ModelOption[]): ModelProvider[] {
	if (providers !== undefined) {
		return providers;
	}
	if (models !== undefined) {
		const grouped = new Map<string, ModelOption[]>();
		for (const item of models) {
			const key = item.provider ?? "";
			const list = grouped.get(key) ?? [];
			list.push(item);
			grouped.set(key, list);
		}
		return Array.from(grouped.entries()).map(([name, groupModels]) => ({
			name,
			models: groupModels,
		}));
	}
	return DEFAULT_PROVIDERS;
}

function getFirstModelId(providers: ModelProvider[]): string {
	for (const provider of providers) {
		if (provider.models.length > 0) {
			return provider.models[0].id;
		}
	}
	return "";
}

export interface ModelSelectorProps extends React.ComponentProps<"div"> {
	providers?: ModelProvider[];
	models?: ModelOption[];
	model?: string;
	defaultModel?: string;
	onModelChange?: (modelId: string) => void;
	efforts?: EffortOption[];
	effort?: string;
	defaultEffort?: string;
	onEffortChange?: (effortId: string) => void;
}

function ModelSelector({
	providers,
	models,
	model,
	defaultModel,
	onModelChange,
	efforts = DEFAULT_EFFORTS,
	effort,
	defaultEffort,
	onEffortChange,
	className = "",
	children,
	...props
}: ModelSelectorProps) {
	const resolvedProviders = normalizeProviders(providers, models);
	const initialModel = defaultModel ?? getFirstModelId(resolvedProviders);
	const initialEffort = defaultEffort ?? efforts[1]?.id ?? efforts[0]?.id ?? "";

	const [uncontrolledModel, setUncontrolledModel] = React.useState(initialModel);
	const [uncontrolledEffort, setUncontrolledEffort] = React.useState(initialEffort);

	const isModelControlled = model !== undefined;
	const isEffortControlled = effort !== undefined;

	const resolvedModel = isModelControlled ? model : uncontrolledModel;
	const resolvedEffort = isEffortControlled ? effort : uncontrolledEffort;

	const setModel = React.useCallback(
		(nextModel: string) => {
			if (!isModelControlled) {
				setUncontrolledModel(nextModel);
			}
			onModelChange?.(nextModel);
		},
		[isModelControlled, onModelChange],
	);

	const setEffort = React.useCallback(
		(nextEffort: string) => {
			if (!isEffortControlled) {
				setUncontrolledEffort(nextEffort);
			}
			onEffortChange?.(nextEffort);
		},
		[isEffortControlled, onEffortChange],
	);

	return (
		<ModelSelectorContext.Provider
			value={{
				providers: resolvedProviders,
				efforts,
				model: resolvedModel,
				setModel,
				effort: resolvedEffort,
				setEffort,
			}}
		>
			<div
				data-slot="model-selector"
				className={cn("flex w-full min-w-0 flex-col gap-2", className)}
				{...props}
			>
				{children}
			</div>
		</ModelSelectorContext.Provider>
	);
}

export interface ModelSelectorMenuProps {
	providers?: ModelProvider[];
	models?: ModelOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (modelId: string) => void;
	align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
	side?: React.ComponentProps<typeof DropdownMenuContent>["side"];
	sideOffset?: number;
	variant?: NonNullable<ButtonProps["variant"]>;
	size?: "xs" | "sm";
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	contentClassName?: string;
}

function ModelSelectorMenu({
	providers,
	models,
	value,
	defaultValue,
	onValueChange,
	align = "start",
	side = "bottom",
	sideOffset = 4,
	variant = "outline",
	size = "sm",
	disabled = false,
	placeholder = "Select model",
	className = "",
	contentClassName = "",
}: ModelSelectorMenuProps) {
	const context = React.useContext(ModelSelectorContext);
	const inInputGroup = React.useContext(ComposerGroupContext);

	const resolvedProviders =
		providers !== undefined || models !== undefined
			? normalizeProviders(providers, models)
			: (context?.providers ?? DEFAULT_PROVIDERS);
	const flatModels = resolvedProviders.flatMap((provider) => provider.models);

	const [uncontrolledValue, setUncontrolledValue] = React.useState(
		defaultValue ?? getFirstModelId(resolvedProviders),
	);
	const isPropControlled = value !== undefined;
	const resolvedValue = isPropControlled
		? value
		: context !== null
			? context.model
			: uncontrolledValue;

	const currentModel = flatModels.find((item) => item.id === resolvedValue) ?? flatModels[0];

	function handleValueChange(nextValue: unknown) {
		if (typeof nextValue !== "string") {
			return;
		}
		if (!isPropControlled) {
			if (context !== null) {
				context.setModel(nextValue);
			} else {
				setUncontrolledValue(nextValue);
			}
		}
		onValueChange?.(nextValue);
	}

	const triggerLabel = currentModel?.name ?? placeholder;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				disabled={disabled}
				render={
					inInputGroup ? (
						<InputGroupButton
							type="button"
							size={size}
							variant={variant}
							disabled={disabled}
							aria-label={`Model: ${triggerLabel}`}
							className={className}
						/>
					) : (
						<Button
							type="button"
							size={size}
							variant={variant}
							disabled={disabled}
							aria-label={`Model: ${triggerLabel}`}
							className={className}
						/>
					)
				}
			>
				<span className="truncate">{triggerLabel}</span>
				<ChevronDownIcon className="shrink-0 opacity-70" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className={cn("w-52", contentClassName)}
			>
				<DropdownMenuRadioGroup value={resolvedValue} onValueChange={handleValueChange}>
					{resolvedProviders.map((provider, index) => (
						<React.Fragment key={provider.name || `provider-${index}`}>
							{index > 0 && <DropdownMenuSeparator />}
							<DropdownMenuGroup>
								{provider.name !== "" && <DropdownMenuLabel>{provider.name}</DropdownMenuLabel>}
								{provider.models.map((item) => (
									<DropdownMenuRadioItem
										key={item.id}
										value={item.id}
										disabled={item.disabled}
										closeOnClick
									>
										<span className="flex min-w-0 flex-col">
											<span className="truncate">{item.name}</span>
											{item.description !== undefined && (
												<span className="truncate text-[0.6875rem] text-muted-foreground">
													{item.description}
												</span>
											)}
										</span>
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuGroup>
						</React.Fragment>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export interface ModelEffortMenuProps {
	efforts?: EffortOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (effortId: string) => void;
	label?: string;
	align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
	side?: React.ComponentProps<typeof DropdownMenuContent>["side"];
	sideOffset?: number;
	variant?: NonNullable<ButtonProps["variant"]>;
	size?: "xs" | "sm";
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
}

function ModelEffortMenu({
	efforts,
	value,
	defaultValue,
	onValueChange,
	label = "Effort",
	align = "start",
	side = "bottom",
	sideOffset = 4,
	variant = "outline",
	size = "sm",
	disabled = false,
	className = "",
	contentClassName = "",
}: ModelEffortMenuProps) {
	const context = React.useContext(ModelSelectorContext);
	const inInputGroup = React.useContext(ComposerGroupContext);

	const resolvedEfforts = efforts ?? context?.efforts ?? DEFAULT_EFFORTS;
	const [uncontrolledValue, setUncontrolledValue] = React.useState(
		defaultValue ?? resolvedEfforts[1]?.id ?? resolvedEfforts[0]?.id ?? "",
	);
	const isPropControlled = value !== undefined;
	const resolvedValue = isPropControlled
		? value
		: context !== null
			? context.effort
			: uncontrolledValue;

	const currentEffort =
		resolvedEfforts.find((item) => item.id === resolvedValue) ?? resolvedEfforts[0];

	function handleValueChange(nextValue: unknown) {
		if (typeof nextValue !== "string") {
			return;
		}
		if (!isPropControlled) {
			if (context !== null) {
				context.setEffort(nextValue);
			} else {
				setUncontrolledValue(nextValue);
			}
		}
		onValueChange?.(nextValue);
	}

	const effortName = currentEffort?.name ?? "Default";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				disabled={disabled}
				render={
					inInputGroup ? (
						<InputGroupButton
							type="button"
							size={size}
							variant={variant}
							disabled={disabled}
							aria-label={`${label}: ${effortName}`}
							className={className}
						/>
					) : (
						<Button
							type="button"
							size={size}
							variant={variant}
							disabled={disabled}
							aria-label={`${label}: ${effortName}`}
							className={className}
						/>
					)
				}
			>
				<span className="text-muted-foreground">{label}</span>
				<span className="truncate">{effortName}</span>
				<ChevronDownIcon className="shrink-0 opacity-70" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className={cn("w-40", contentClassName)}
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{label}</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={resolvedValue} onValueChange={handleValueChange}>
						{resolvedEfforts.map((item) => (
							<DropdownMenuRadioItem
								key={item.id}
								value={item.id}
								disabled={item.disabled}
								closeOnClick
							>
								<span className="flex min-w-0 flex-col">
									<span className="truncate">{item.name}</span>
									{item.description !== undefined && (
										<span className="truncate text-[0.6875rem] text-muted-foreground">
											{item.description}
										</span>
									)}
								</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export interface ModelSelectorSubmitPayload {
	text: string;
	model: string;
	effort: string;
}

export interface ModelSelectorComposerProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onSubmit?: (payload: ModelSelectorSubmitPayload) => void | Promise<void>;
	placeholder?: string;
	providers?: ModelProvider[];
	models?: ModelOption[];
	model?: string;
	defaultModel?: string;
	onModelChange?: (modelId: string) => void;
	efforts?: EffortOption[];
	effort?: string;
	defaultEffort?: string;
	onEffortChange?: (effortId: string) => void;
	showEffort?: boolean;
	leadingActions?: React.ReactNode;
	submitLabel?: string;
	disabled?: boolean;
	isSubmitting?: boolean;
	textareaClassName?: string;
}

function ModelSelectorComposer({
	value,
	defaultValue = "",
	onValueChange,
	onSubmit,
	placeholder = "Ask the agent to change your code...",
	providers,
	models,
	model,
	defaultModel,
	onModelChange,
	efforts,
	effort,
	defaultEffort,
	onEffortChange,
	showEffort = true,
	leadingActions,
	submitLabel = "Send",
	disabled = false,
	isSubmitting = false,
	textareaClassName = "",
	className = "",
	...props
}: ModelSelectorComposerProps) {
	const context = React.useContext(ModelSelectorContext);
	const formRef = React.useRef<HTMLFormElement>(null);

	const resolvedProviders =
		providers !== undefined || models !== undefined
			? normalizeProviders(providers, models)
			: (context?.providers ?? DEFAULT_PROVIDERS);
	const resolvedEfforts = efforts ?? context?.efforts ?? DEFAULT_EFFORTS;

	const [uncontrolledText, setUncontrolledText] = React.useState(defaultValue);
	const isTextControlled = value !== undefined;
	const text = isTextControlled ? value : uncontrolledText;

	const [uncontrolledModel, setUncontrolledModel] = React.useState(
		defaultModel ?? getFirstModelId(resolvedProviders),
	);
	const isModelPropControlled = model !== undefined;
	const resolvedModel = isModelPropControlled
		? model
		: context !== null
			? context.model
			: uncontrolledModel;

	const [uncontrolledEffort, setUncontrolledEffort] = React.useState(
		defaultEffort ?? resolvedEfforts[1]?.id ?? resolvedEfforts[0]?.id ?? "",
	);
	const isEffortPropControlled = effort !== undefined;
	const resolvedEffort = isEffortPropControlled
		? effort
		: context !== null
			? context.effort
			: uncontrolledEffort;

	const canSend = text.trim().length > 0 && !disabled && !isSubmitting;

	function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const nextText = event.target.value;
		if (!isTextControlled) {
			setUncontrolledText(nextText);
		}
		onValueChange?.(nextText);
	}

	function handleModelChange(nextModel: string) {
		if (!isModelPropControlled) {
			if (context !== null) {
				context.setModel(nextModel);
			} else {
				setUncontrolledModel(nextModel);
			}
		}
		onModelChange?.(nextModel);
	}

	function handleEffortChange(nextEffort: string) {
		if (!isEffortPropControlled) {
			if (context !== null) {
				context.setEffort(nextEffort);
			} else {
				setUncontrolledEffort(nextEffort);
			}
		}
		onEffortChange?.(nextEffort);
	}

	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!canSend) {
			return;
		}
		onSubmit?.({
			text: text.trim(),
			model: resolvedModel,
			effort: resolvedEffort,
		});
		if (!isTextControlled) {
			setUncontrolledText("");
		}
	}

	return (
		<ComposerGroupContext.Provider value={true}>
			<form
				ref={formRef}
				data-slot="model-selector-composer"
				onSubmit={handleFormSubmit}
				className={cn("w-full min-w-0", className)}
				{...props}
			>
				<InputGroup data-disabled={disabled ? "true" : undefined}>
					<InputGroupTextarea
						value={text}
						onChange={handleTextChange}
						placeholder={placeholder}
						disabled={disabled}
						onKeyDown={(event) => {
							if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
								event.preventDefault();
								formRef.current?.requestSubmit();
							}
						}}
						className={cn("p-3", textareaClassName)}
					/>
					<InputGroupAddon align="block-end" className="gap-1.5">
						{leadingActions}
						<ModelSelectorMenu
							providers={resolvedProviders}
							value={resolvedModel}
							onValueChange={handleModelChange}
							disabled={disabled}
							className="ml-auto"
						/>
						{showEffort && resolvedEfforts.length > 0 && (
							<ModelEffortMenu
								efforts={resolvedEfforts}
								value={resolvedEffort}
								onValueChange={handleEffortChange}
								disabled={disabled}
							/>
						)}
						<InputGroupButton
							type="submit"
							size="icon-sm"
							variant="default"
							className="rounded-full"
							disabled={!canSend}
							aria-label={submitLabel}
						>
							<ArrowUpIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</form>
		</ComposerGroupContext.Provider>
	);
}

ModelSelector.displayName = "ModelSelector";
ModelSelectorMenu.displayName = "ModelSelectorMenu";
ModelEffortMenu.displayName = "ModelEffortMenu";
ModelSelectorComposer.displayName = "ModelSelectorComposer";

export { ModelSelector, ModelSelectorMenu, ModelEffortMenu, ModelSelectorComposer };

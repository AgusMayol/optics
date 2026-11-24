"use client";

import React from "react";
import { useTheme } from "next-themes";
import { toast as sonnerToast, Toaster as Sonner, type ToasterProps } from "sonner";
import { Button } from "@/registry/optics/button";
import { Info, Check, AlertCircle, AlertTriangle, Loader2, type LucideIcon } from "lucide-react";
import { Spinner } from "@/registry/optics/spinner";
import { cn } from "@/registry/optics/lib/utils";

export type ToastType = "success" | "info" | "warning" | "error" | "promise";

export interface ToastButton {
	label: React.ReactNode;
	onClick: () => void;
}

export interface ToastOptions<TData = unknown> {
	type?: ToastType;
	title?: React.ReactNode;
	description?: React.ReactNode;
	button?: ToastButton;
	promise?: Promise<TData>;
	loading?: React.ReactNode;
	success?: React.ReactNode;
	error?: React.ReactNode;
	toastId?: string;
	duration?: number;
}

interface ToastTypeConfig {
	icon: LucideIcon;
	bgColor: string;
	iconColor: string;
	useSpinner?: boolean;
}

const TOAST_TYPES: Record<ToastType, ToastTypeConfig> = {
	success: {
		icon: Check,
		bgColor: "bg-emerald-500/20",
		iconColor: "text-emerald-600",
	},
	info: {
		icon: Info,
		bgColor: "bg-blue-500/20",
		iconColor: "text-blue-600",
	},
	warning: {
		icon: AlertTriangle,
		bgColor: "bg-yellow-500/20",
		iconColor: "text-yellow-600",
	},
	error: {
		icon: AlertCircle,
		bgColor: "bg-red-500/20",
		iconColor: "text-red-600",
	},
	promise: {
		icon: Loader2,
		bgColor: "",
		iconColor: "text-zinc-600",
		useSpinner: true,
	},
};

export function Toaster({ className = "", ...props }: React.ComponentProps<typeof Sonner>) {
	const { theme = "system" } = useTheme();
	const resolvedTheme: ToasterProps["theme"] =
		theme === "light" || theme === "dark" || theme === "system" ? theme : "system";
	const toasterStyle: React.CSSProperties & Record<`--${string}`, string | number | undefined> = {
		"--normal-bg": "var(--popover)",
		"--normal-text": "var(--popover-foreground)",
		"--normal-border": "var(--border)",
	};

	return (
		<Sonner
			theme={resolvedTheme}
			className={cn("toaster group", className)}
			style={toasterStyle}
			{...props}
		/>
	);
}

type PromiseStatus = "loading" | "success" | "error";

interface ToastInstance {
	id: string | number;
	bounce: () => void;
}

interface PromiseStateEntry {
	state: PromiseStatus;
	result: unknown;
	isTransitioning: boolean;
}

interface ToastBounceDetail {
	toastId: string;
}

interface PromiseStateUpdateDetail {
	toastId: string;
	state: PromiseStatus;
	result: unknown;
}

function isToastBounceDetail(detail: unknown): detail is ToastBounceDetail {
	return (
		typeof detail === "object" &&
		detail !== null &&
		"toastId" in detail &&
		typeof detail.toastId === "string"
	);
}

function isPromiseStateUpdateDetail(detail: unknown): detail is PromiseStateUpdateDetail {
	return (
		typeof detail === "object" &&
		detail !== null &&
		"toastId" in detail &&
		typeof detail.toastId === "string" &&
		"state" in detail &&
		(detail.state === "loading" || detail.state === "success" || detail.state === "error") &&
		"result" in detail
	);
}

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message || "Something went wrong!";
	if (
		typeof err === "object" &&
		err !== null &&
		"message" in err &&
		typeof err.message === "string"
	) {
		return err.message || "Something went wrong!";
	}
	return "Something went wrong!";
}

const toastInstances = new Map<string, ToastInstance>();
const promiseInstances = new Map<string, unknown>();
const promiseStates = new Map<string, PromiseStateEntry>();

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast<TData = unknown>(toastConfig: ToastOptions<TData> = {}): string | number {
	const {
		type = "info",
		title,
		description,
		button,
		promise,
		loading,
		success,
		error,
		toastId,
		duration = 5500,
	} = toastConfig;

	const id = toastId || `${type}-${Date.now()}-${Math.random()}`;

	const existingToast = toastInstances.get(id);
	if (existingToast) {
		existingToast.bounce();
		return existingToast.id;
	}

	if (type === "promise" && promise) {
		if (!promiseStates.has(id)) {
			promiseStates.set(id, {
				state: "loading",
				result: null,
				isTransitioning: false,
			});

			promise
				.then((data) => {
					const currentState = promiseStates.get(id);
					if (currentState) {
						currentState.isTransitioning = true;
						setTimeout(() => {
							currentState.state = "success";
							currentState.result = data;
							currentState.isTransitioning = false;
							window.dispatchEvent(
								new CustomEvent<PromiseStateUpdateDetail>("promise-state-update", {
									detail: { toastId: id, state: "success", result: data },
								}),
							);
						}, 150);
					}
				})
				.catch((err: unknown) => {
					const currentState = promiseStates.get(id);
					if (currentState) {
						currentState.isTransitioning = true;
						setTimeout(() => {
							currentState.state = "error";
							currentState.result = err;
							currentState.isTransitioning = false;
							window.dispatchEvent(
								new CustomEvent<PromiseStateUpdateDetail>("promise-state-update", {
									detail: { toastId: id, state: "error", result: err },
								}),
							);
						}, 150);
					}
				});
		}

		const promiseToastId = sonnerToast.custom(
			(sonnerId) => (
				<PromiseToast
					id={sonnerId}
					toastId={id}
					loading={loading || "Loading..."}
					success={success || "Success!"}
					error={error || "Something went wrong!"}
					button={button}
					duration={duration}
				/>
			),
			{
				duration: duration,
			},
		);

		toastInstances.set(id, {
			id: promiseToastId,
			bounce: () => {
				window.dispatchEvent(
					new CustomEvent<ToastBounceDetail>("toast-bounce", {
						detail: { toastId: id },
					}),
				);
			},
		});

		setTimeout(() => {
			toastInstances.delete(id);
			promiseInstances.delete(id);
			promiseStates.delete(id);
		}, duration);

		return promiseToastId;
	}

	const regularToastId = sonnerToast.custom(
		(sonnerId) => (
			<Toast
				id={sonnerId}
				toastId={id}
				type={type}
				title={title}
				description={description}
				button={
					button
						? {
								label: button.label,
								onClick: () => button.onClick(),
							}
						: undefined
				}
				duration={duration}
			/>
		),
		{
			duration: duration,
		},
	);

	toastInstances.set(id, {
		id: regularToastId,
		bounce: () => {
			window.dispatchEvent(
				new CustomEvent<ToastBounceDetail>("toast-bounce", {
					detail: { toastId: id },
				}),
			);
		},
	});

	setTimeout(() => {
		toastInstances.delete(id);
		promiseInstances.delete(id);
		promiseStates.delete(id);
	}, duration);

	return regularToastId;
}

interface PromiseToastProps {
	id: string | number;
	toastId: string;
	loading: React.ReactNode;
	success: React.ReactNode;
	error: React.ReactNode;
	button?: ToastButton;
	duration?: number;
}

/** Promise toast component that handles promise state */
function PromiseToast(props: PromiseToastProps) {
	const { id, toastId, loading, success, error, button } = props;
	const [state, setState] = React.useState<PromiseStatus>("loading");
	const [result, setResult] = React.useState<unknown>(null);
	const [isTransitioning, setIsTransitioning] = React.useState(false);
	const [isBouncing, setIsBouncing] = React.useState(false);

	React.useEffect(() => {
		const globalState = promiseStates.get(toastId);
		if (globalState) {
			setState(globalState.state);
			setResult(globalState.result);
			setIsTransitioning(globalState.isTransitioning);
		}
	}, [toastId]);

	React.useEffect(() => {
		const handleBounce = (event: Event) => {
			if (
				event instanceof CustomEvent &&
				isToastBounceDetail(event.detail) &&
				event.detail.toastId === toastId
			) {
				setIsBouncing(true);
				setTimeout(() => {
					setIsBouncing(false);
				}, 400);
			}
		};

		window.addEventListener("toast-bounce", handleBounce);
		return () => {
			window.removeEventListener("toast-bounce", handleBounce);
		};
	}, [toastId]);

	React.useEffect(() => {
		const handleStateUpdate = (event: Event) => {
			if (
				event instanceof CustomEvent &&
				isPromiseStateUpdateDetail(event.detail) &&
				event.detail.toastId === toastId
			) {
				setState(event.detail.state);
				setResult(event.detail.result);
				setIsTransitioning(false);
			}
		};

		window.addEventListener("promise-state-update", handleStateUpdate);
		return () => {
			window.removeEventListener("promise-state-update", handleStateUpdate);
		};
	}, [toastId]);

	const getToastConfig = (): {
		type: ToastType;
		title: React.ReactNode;
		description: string;
	} => {
		switch (state) {
			case "success":
				return {
					type: "success",
					title: success,
					description: typeof result === "string" ? result : "Operation completed successfully!",
				};
			case "error":
				return {
					type: "error",
					title: error,
					description: getErrorMessage(result),
				};
			default:
				return {
					type: "promise",
					title: loading,
					description: "Please wait while we process your request.",
				};
		}
	};

	const toastConfig = getToastConfig();
	return (
		<div
			className={cn(
				"transition-all duration-300 ease-in-out",
				isTransitioning && "opacity-75 scale-95",
				isBouncing && "animate-zoom-subtle",
			)}
		>
			<Toast {...toastConfig} id={id} button={button} />
		</div>
	);
}

interface ToastProps {
	title?: React.ReactNode;
	description?: React.ReactNode;
	button?: ToastButton;
	id: string | number;
	toastId?: string;
	type?: ToastType;
	duration?: number;
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
	const { title, description, button, id, toastId, type = "info" } = props;
	const [isBouncing, setIsBouncing] = React.useState(false);
	const toastType = TOAST_TYPES[type] || TOAST_TYPES.info;
	const IconComponent = toastType.icon;

	React.useEffect(() => {
		const handleBounce = (event: Event) => {
			if (
				event instanceof CustomEvent &&
				isToastBounceDetail(event.detail) &&
				event.detail.toastId === toastId
			) {
				setIsBouncing(true);
				setTimeout(() => {
					setIsBouncing(false);
				}, 400);
			}
		};

		window.addEventListener("toast-bounce", handleBounce);
		return () => {
			window.removeEventListener("toast-bounce", handleBounce);
		};
	}, [toastId]);

	return (
		<div
			className={cn(
				"bg-muted z-50 grid w-full gap-4 rounded-2xl border p-1 shadow-lg sm:min-w-md sm:max-w-md select-none transition-all duration-300",
				isBouncing && "animate-zoom-subtle",
				!description && "sm:min-w-sm sm:max-w-sm",
			)}
		>
			<div
				className={cn(
					"bg-background grid w-full gap-4 rounded-xl p-6 px-6 shadow-lg bg-[repeating-linear-gradient(45deg,var(--background),var(--card)_3px,var(--muted)_3px,var(--muted)_6px)] relative",
					!description && "row-span-2",
				)}
			>
				<div className="absolute inset-0 bg-[linear-gradient(135deg,var(--background)_45%,transparent_100%)] rounded-lg" />
				<div className={cn("flex flex-col gap-2 text-center sm:text-left relative")}>
					<div
						className={cn(
							"w-full flex items-start justify-between -mt-2",
							!description && "-mb-2 -mt-3",
						)}
					>
						<div
							className={cn(
								"flex items-center justify-center gap-2.5 -ml-2",
								!description && "-mb-1",
							)}
						>
							<div
								className={cn(
									"p-1 rounded-full squircle-none flex items-center justify-center shadow-md transition-all duration-300 ease-in-out",
									toastType.bgColor,
									toastType.useSpinner && "shadow-none",
								)}
							>
								{toastType.useSpinner ? (
									<Spinner
										size="size-4"
										className={cn("transition-colors duration-300", toastType.iconColor)}
									/>
								) : (
									<IconComponent
										className={cn("size-4 transition-colors duration-300", toastType.iconColor)}
									/>
								)}
							</div>
							<h2
								className={cn(
									"text-base font-medium transition-all duration-300",
									toastType.iconColor,
									!description && "text-sm !text-foreground",
								)}
							>
								{title}
							</h2>
						</div>
					</div>

					{description && (
						<p className="text-muted-foreground text-xs text-pretty transition-all duration-300">
							{description}
						</p>
					)}
				</div>

				{button && !toastType.useSpinner && (
					<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end relative">
						<Button
							variant="raised"
							size="sm"
							className="-mr-4 -mb-4"
							onClick={() => {
								button.onClick();
								sonnerToast.dismiss(id);
							}}
						>
							{button.label}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

Toaster.displayName = "Toaster";
PromiseToast.displayName = "PromiseToast";
Toast.displayName = "Toast";

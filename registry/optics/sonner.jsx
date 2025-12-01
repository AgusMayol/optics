"use client";

import React from "react";
import { useTheme } from "next-themes";
import { toast as sonnerToast, Toaster as Sonner } from "sonner";
import { Button } from "@/registry/optics/button";
import {
	X,
	Info,
	Check,
	AlertCircle,
	AlertTriangle,
	Loader2,
} from "lucide-react";
import { Spinner } from "@/registry/optics/spinner";
import { cn } from "@/lib/utils";

// Toast type definitions
const TOAST_TYPES = {
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

export function Toaster({ ...props }) {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme}
			className="toaster group"
			style={{
				"--normal-bg": "var(--popover)",
				"--normal-text": "var(--popover-foreground)",
				"--normal-border": "var(--border)",
			}}
			{...props}
		/>
	);
}

// Store for managing toast instances and bounce effects
const toastInstances = new Map();
// Store for managing promise instances to avoid multiple rejects
const promiseInstances = new Map();
// Store for managing promise states globally
const promiseStates = new Map();

/** I recommend abstracting the toast function
 *  so that you can call it without having to use toast.custom everytime. */
export function toast(toastConfig) {
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
		duration = 5500, // 5.5 seconds default
	} = toastConfig;

	// Generate or use provided ID
	const id = toastId || `${type}-${Date.now()}-${Math.random()}`;

	// Check if toast with same ID already exists
	const existingToast = toastInstances.get(id);
	if (existingToast) {
		// Trigger bounce effect
		existingToast.bounce();
		return existingToast.id;
	}

	// Handle promise toast with custom component
	if (type === "promise" && promise) {
		// Initialize promise state if it doesn't exist
		if (!promiseStates.has(id)) {
			promiseStates.set(id, {
				state: "loading",
				result: null,
				isTransitioning: false,
			});

			// Execute promise only once
			promise
				.then((data) => {
					const currentState = promiseStates.get(id);
					if (currentState) {
						currentState.isTransitioning = true;
						setTimeout(() => {
							currentState.state = "success";
							currentState.result = data;
							currentState.isTransitioning = false;
							// Notify all components with this ID
							window.dispatchEvent(
								new CustomEvent("promise-state-update", {
									detail: { toastId: id, state: "success", result: data },
								}),
							);
						}, 150);
					}
				})
				.catch((err) => {
					const currentState = promiseStates.get(id);
					if (currentState) {
						currentState.isTransitioning = true;
						setTimeout(() => {
							currentState.state = "error";
							currentState.result = err;
							currentState.isTransitioning = false;
							// Notify all components with this ID
							window.dispatchEvent(
								new CustomEvent("promise-state-update", {
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

		// Store toast instance
		toastInstances.set(id, {
			id: promiseToastId,
			bounce: () => {
				// Trigger bounce effect by updating the bounce state
				// This will be handled by the component's bounce state
				window.dispatchEvent(
					new CustomEvent("toast-bounce", {
						detail: { toastId: id },
					}),
				);
			},
		});

		// Auto-remove from store after duration
		setTimeout(() => {
			toastInstances.delete(id);
			promiseInstances.delete(id);
			promiseStates.delete(id);
		}, duration);

		return promiseToastId;
	}

	// Handle regular toasts
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

	// Store toast instance
	toastInstances.set(id, {
		id: regularToastId,
		bounce: () => {
			// Trigger bounce effect by updating the bounce state
			// This will be handled by the component's bounce state
			window.dispatchEvent(
				new CustomEvent("toast-bounce", {
					detail: { toastId: id },
				}),
			);
		},
	});

	// Auto-remove from store after duration
	setTimeout(() => {
		toastInstances.delete(id);
		promiseInstances.delete(id);
		promiseStates.delete(id);
	}, duration);

	return regularToastId;
}

/** Promise toast component that handles promise state */
function PromiseToast(props) {
	const { id, toastId, loading, success, error, button, duration } = props;
	const [state, setState] = React.useState("loading");
	const [result, setResult] = React.useState(null);
	const [isTransitioning, setIsTransitioning] = React.useState(false);
	const [isBouncing, setIsBouncing] = React.useState(false);

	// Initialize state from global store
	React.useEffect(() => {
		const globalState = promiseStates.get(toastId);
		if (globalState) {
			setState(globalState.state);
			setResult(globalState.result);
			setIsTransitioning(globalState.isTransitioning);
		}
	}, [toastId]);

	// Listen for bounce events
	React.useEffect(() => {
		const handleBounce = (event) => {
			if (event.detail.toastId === toastId) {
				setIsBouncing(true);
				setTimeout(() => {
					setIsBouncing(false);
				}, 400); // Zoom animation duration
			}
		};

		window.addEventListener("toast-bounce", handleBounce);
		return () => {
			window.removeEventListener("toast-bounce", handleBounce);
		};
	}, [toastId]);

	// Listen for promise state updates
	React.useEffect(() => {
		const handleStateUpdate = (event) => {
			if (event.detail.toastId === toastId) {
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

	const getToastConfig = () => {
		switch (state) {
			case "success":
				return {
					type: "success",
					title: success,
					description:
						typeof result === "string"
							? result
							: "Operation completed successfully!",
				};
			case "error":
				return {
					type: "error",
					title: error,
					description: result?.message || "Something went wrong!",
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

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props) {
	const {
		title,
		description,
		button,
		id,
		toastId,
		type = "info",
		duration,
	} = props;
	const [isBouncing, setIsBouncing] = React.useState(false);
	const toastType = TOAST_TYPES[type] || TOAST_TYPES.info;
	const IconComponent = toastType.icon;

	// Listen for bounce events
	React.useEffect(() => {
		const handleBounce = (event) => {
			if (event.detail.toastId === toastId) {
				setIsBouncing(true);
				setTimeout(() => {
					setIsBouncing(false);
				}, 400); // Zoom animation duration
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
				{/* Header */}
				<div
					className={cn(
						"flex flex-col gap-2 text-center sm:text-left relative",
					)}
				>
					{/* Icon */}
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
										className={cn(
											"transition-colors duration-300",
											toastType.iconColor,
										)}
									/>
								) : (
									<IconComponent
										className={cn(
											"size-4 transition-colors duration-300",
											toastType.iconColor,
										)}
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

					{/* Description */}
					{description && (
						<p className="text-muted-foreground text-xs text-pretty transition-all duration-300">
							{description}
						</p>
					)}
				</div>

				{/* Footer */}
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

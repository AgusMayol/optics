"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Popover, PopoverTrigger, PopoverContent } from "@/registry/optics/popover";
import { cn } from "@/registry/optics/lib/utils";
import { Button } from "@/registry/optics/button";
import { X } from "lucide-react";

interface GuidedTourContextValue {
	activeTour: string | null;
	setActiveTour: React.Dispatch<React.SetStateAction<string | null>>;
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	steps: unknown[];
	setSteps: React.Dispatch<React.SetStateAction<unknown[]>>;
	totalSteps: number;
	setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
}

const GuidedTourContext = React.createContext<GuidedTourContextValue>({
	activeTour: null,
	setActiveTour: () => {},
	currentStep: 0,
	setCurrentStep: () => {},
	steps: [],
	setSteps: () => {},
	totalSteps: 0,
	setTotalSteps: () => {},
});

function GuidedTourProvider({ children = null }: { children?: React.ReactNode }) {
	const [activeTour, setActiveTour] = React.useState<string | null>(null);
	const [currentStep, setCurrentStep] = React.useState(0);
	const [steps, setSteps] = React.useState<unknown[]>([]);
	const [totalSteps, setTotalSteps] = React.useState(0);

	const contextValue = React.useMemo(
		() => ({
			activeTour,
			setActiveTour,
			currentStep,
			setCurrentStep,
			steps,
			setSteps,
			totalSteps,
			setTotalSteps,
		}),
		[activeTour, currentStep, steps, totalSteps],
	);

	return <GuidedTourContext.Provider value={contextValue}>{children}</GuidedTourContext.Provider>;
}

function useGuidedTour() {
	const context = React.useContext(GuidedTourContext);
	if (!context) {
		throw new Error("useGuidedTour must be used within GuidedTourProvider");
	}
	return context;
}

const GuidedTourOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	({ className, ...props }, ref) => {
		const { activeTour } = useGuidedTour();

		if (!activeTour) return null;

		return (
			<div
				ref={ref}
				className={cn(
					"fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					className,
				)}
				{...props}
			/>
		);
	},
);
GuidedTourOverlay.displayName = "GuidedTourOverlay";

function GuidedTour({ children = null, ...props }: React.ComponentProps<"div">) {
	return (
		<div data-slot="guided-tour" {...props}>
			{children}
		</div>
	);
}

type GuidedTourTriggerProps = Omit<
	React.ComponentProps<typeof Button>,
	"render" | "className" | "onClick"
> & {
	tourId?: string;
	children?: React.ReactNode;
	className?: string;
	render?: React.ReactElement | null;
	onClick?: React.MouseEventHandler<HTMLElement>;
};

function GuidedTourTrigger({
	tourId = "",
	children = null,
	className = "",
	render = null,
	onClick,
	...restProps
}: GuidedTourTriggerProps) {
	const { setActiveTour, setCurrentStep, setTotalSteps } = useGuidedTour();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(event);
		}

		if (event?.defaultPrevented) return;

		const tourSteps = document.querySelectorAll(`[data-tour="${tourId}"][data-step]`);
		const sortedSteps = Array.from(tourSteps).sort((a, b) => {
			const stepA = parseInt(a.getAttribute("data-step") ?? "0", 10) || 0;
			const stepB = parseInt(b.getAttribute("data-step") ?? "0", 10) || 0;
			return stepA - stepB;
		});

		if (sortedSteps.length > 0) {
			setTotalSteps(sortedSteps.length);
			setCurrentStep(0);
			setActiveTour(tourId);

			// Scroll to the first element
			setTimeout(() => {
				sortedSteps[0]?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 100);
		}
	};

	const triggerProps = {
		"data-slot": "guided-tour-trigger",
		onClick: handleClick,
		className: cn(!render && "cursor-pointer", className),
		type: render ? undefined : ("button" as const),
		...restProps,
	};

	if (render && React.isValidElement<Record<string, unknown>>(render)) {
		return React.cloneElement(render, triggerProps);
	}

	return <Button {...triggerProps}>{children}</Button>;
}

interface GuidedTourStepProps extends Omit<
	React.HTMLAttributes<HTMLElement>,
	"content" | "children"
> {
	tourId?: string;
	step?: number;
	children?: React.ReactElement | null;
	className?: string;
	content?: React.ReactNode;
}

const GuidedTourStep = React.forwardRef<HTMLElement, GuidedTourStepProps>(
	({ tourId = "", step = 0, children = null, className = "", content = null, ...props }, ref) => {
		const { activeTour, currentStep, setActiveTour, setCurrentStep } = useGuidedTour();
		const isActive = activeTour === tourId && currentStep === step - 1;
		const elementRef = React.useRef<HTMLElement | null>(null);
		const [open, setOpen] = React.useState(false);

		React.useEffect(() => {
			if (isActive && elementRef.current) {
				setOpen(true);
				// Scroll to the active element
				setTimeout(() => {
					elementRef.current?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}, 100);
			} else {
				setOpen(false);
			}
		}, [isActive]);

		const handleOpenChange = (newOpen: boolean) => {
			setOpen(newOpen);
			// If the popover is closed by user interaction (click outside), deactivate the tour
			if (!newOpen && isActive && activeTour === tourId) {
				// Capture current values to check after timeout
				const currentTourId = activeTour;
				const currentStepValue = currentStep;
				// Use a small timeout to allow step transitions to complete
				// If we're transitioning to another step, the tour will remain active
				setTimeout(() => {
					// Only deactivate if the tour is still active and we're still on this step
					// This means the user closed the popover manually, not by navigating
					if (activeTour === currentTourId && currentStep === currentStepValue) {
						setActiveTour(null);
						setCurrentStep(0);
					}
				}, 100);
			}
		};

		if (
			!React.isValidElement<
				Record<string, unknown> & {
					className?: string;
					ref?: React.Ref<HTMLElement>;
				}
			>(children)
		) {
			return null;
		}

		const childRef = children.props?.ref;

		const clonedElement = React.cloneElement(children, {
			ref: (node: HTMLElement | null) => {
				elementRef.current = node;
				if (typeof childRef === "function") {
					childRef(node);
				} else if (childRef && typeof childRef === "object" && "current" in childRef) {
					childRef.current = node;
				}
				if (typeof ref === "function") {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			},
			"data-tour": tourId,
			"data-step": step,
			className: cn(className, isActive && "relative z-[101]", children.props?.className),
			...props,
		});
		const isNativeButton =
			typeof clonedElement.type === "string" && clonedElement.type.toLowerCase() === "button";

		if (!isActive || !content) {
			return clonedElement;
		}

		return (
			<Popover open={open} onOpenChange={(nextOpen: boolean) => handleOpenChange(nextOpen)}>
				<PopoverTrigger nativeButton={isNativeButton} render={clonedElement} />
				<GuidedTourStepContent>{content}</GuidedTourStepContent>
			</Popover>
		);
	},
);
GuidedTourStep.displayName = "GuidedTourStep";

function GuidedTourStepContent({ children }: { children?: React.ReactNode }) {
	const { currentStep, setCurrentStep, setActiveTour, totalSteps } = useGuidedTour();

	const handleNext = () => {
		if (currentStep < totalSteps - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleFinish();
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		setActiveTour(null);
		setCurrentStep(0);
	};

	const handleFinish = () => {
		setActiveTour(null);
		setCurrentStep(0);
	};

	const isLastStep = currentStep === totalSteps - 1;
	const isFirstStep = currentStep === 0;

	return (
		<GuidedTourContent
			onSkip={handleSkip}
			onNext={handleNext}
			onBack={handleBack}
			onFinish={handleFinish}
			isLastStep={isLastStep}
			isFirstStep={isFirstStep}
		>
			{children}
		</GuidedTourContent>
	);
}

type GuidedTourContentProps = Omit<
	React.ComponentProps<typeof PopoverPrimitive.Popup>,
	"className"
> &
	Pick<
		React.ComponentProps<typeof PopoverPrimitive.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & {
		className?: string;
		positionerClassName?: string;
		onSkip?: () => void;
		onNext?: () => void;
		onBack?: () => void;
		onFinish?: () => void;
		isLastStep?: boolean;
		isFirstStep?: boolean;
	};

function GuidedTourContent({
	children = null,
	className = "",
	onSkip = undefined,
	onNext = undefined,
	onBack = undefined,
	onFinish = undefined,
	isLastStep = false,
	isFirstStep = false,
	align = "start",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	...props
}: GuidedTourContentProps) {
	const { currentStep, totalSteps } = useGuidedTour();

	return (
		<PopoverContent
			align={align}
			alignOffset={alignOffset}
			side={side}
			sideOffset={sideOffset}
			positionerClassName="z-[102]"
			className={cn(
				"w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95",
				className,
			)}
			data-slot="guided-tour-content"
			{...props}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">{children}</div>
					{onSkip && (
						<PopoverPrimitive.Close
							render={
								<button
									type="button"
									onClick={onSkip}
									className="rounded-sm opacity-70 hover:opacity-100 transition-opacity p-1 -mt-1 -mr-1"
									aria-label="Close"
								>
									<X className="h-4 w-4" />
								</button>
							}
						/>
					)}
				</div>

				<div className="flex items-center justify-between gap-2">
					<div className="text-xs text-muted-foreground">
						Step {currentStep + 1} of {totalSteps}
					</div>
					<div className="flex items-center gap-2">
						{onSkip && (
							<Button variant="ghost" size="sm" onClick={onSkip} type="button">
								Skip
							</Button>
						)}
						{onBack && !isFirstStep && (
							<Button variant="outline" size="sm" onClick={onBack} type="button">
								Back
							</Button>
						)}
						{isLastStep ? (
							<Button variant="default" size="sm" onClick={onFinish} type="button">
								Finish
							</Button>
						) : (
							<Button variant="default" size="sm" onClick={onNext} type="button">
								Next
							</Button>
						)}
					</div>
				</div>
			</div>
		</PopoverContent>
	);
}

// GuidedTourPopover is now deprecated - use GuidedTourStep with content prop instead
function GuidedTourPopover({
	children = null,
	...props
}: Omit<React.ComponentProps<typeof PopoverPrimitive.Root>, "children"> & {
	children?: React.ReactNode;
}) {
	const { activeTour, currentStep, setCurrentStep, setActiveTour, totalSteps } = useGuidedTour();
	const [open, setOpen] = React.useState(false);
	const [currentElement, setCurrentElement] = React.useState<Element | null>(null);

	React.useEffect(() => {
		if (activeTour) {
			const element = document.querySelector(
				`[data-tour="${activeTour}"][data-step="${currentStep + 1}"]`,
			);
			if (element) {
				setCurrentElement(element);
				setOpen(true);
				// Scroll to the element
				setTimeout(() => {
					element.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}, 100);
			} else {
				setOpen(false);
				setCurrentElement(null);
			}
		} else {
			setOpen(false);
			setCurrentElement(null);
		}
	}, [activeTour, currentStep]);

	const handleNext = () => {
		if (currentStep < totalSteps - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			handleFinish();
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSkip = () => {
		setActiveTour(null);
		setCurrentStep(0);
		setOpen(false);
		setCurrentElement(null);
	};

	const handleFinish = () => {
		setActiveTour(null);
		setCurrentStep(0);
		setOpen(false);
		setCurrentElement(null);
	};

	const isLastStep = currentStep === totalSteps - 1;
	const isFirstStep = currentStep === 0;

	if (!activeTour || !open || !currentElement) return null;

	return (
		<Popover open={open} onOpenChange={(nextOpen: boolean) => setOpen(nextOpen)} {...props}>
			<PopoverTrigger
				nativeButton={false}
				render={
					<div
						style={{
							position: "absolute",
							left: currentElement.getBoundingClientRect().left,
							top: currentElement.getBoundingClientRect().top,
							width: currentElement.getBoundingClientRect().width,
							height: currentElement.getBoundingClientRect().height,
							pointerEvents: "none",
						}}
					/>
				}
			/>
			<GuidedTourContent
				onSkip={handleSkip}
				onNext={handleNext}
				onBack={handleBack}
				onFinish={handleFinish}
				isLastStep={isLastStep}
				isFirstStep={isFirstStep}
			>
				{children}
			</GuidedTourContent>
		</Popover>
	);
}

GuidedTourProvider.displayName = "GuidedTourProvider";
GuidedTour.displayName = "GuidedTour";
GuidedTourTrigger.displayName = "GuidedTourTrigger";
// GuidedTourStep already has displayName set in its forwardRef
GuidedTourOverlay.displayName = "GuidedTourOverlay";
GuidedTourContent.displayName = "GuidedTourContent";
GuidedTourPopover.displayName = "GuidedTourPopover";

export {
	GuidedTourProvider,
	GuidedTour,
	GuidedTourTrigger,
	GuidedTourStep,
	GuidedTourOverlay,
	GuidedTourContent,
	GuidedTourPopover,
	useGuidedTour,
};

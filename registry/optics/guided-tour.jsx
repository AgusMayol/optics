"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/optics/button";
import { X } from "lucide-react";

const GuidedTourContext = React.createContext({
	activeTour: null,
	setActiveTour: () => {},
	currentStep: 0,
	setCurrentStep: () => {},
	steps: [],
	setSteps: () => {},
	totalSteps: 0,
});

function GuidedTourProvider({ children, ...props }) {
	const [activeTour, setActiveTour] = React.useState(null);
	const [currentStep, setCurrentStep] = React.useState(0);
	const [steps, setSteps] = React.useState([]);
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

	return (
		<GuidedTourContext.Provider value={contextValue} {...props}>
			{children}
		</GuidedTourContext.Provider>
	);
}

function useGuidedTour() {
	const context = React.useContext(GuidedTourContext);
	if (!context) {
		throw new Error("useGuidedTour must be used within GuidedTourProvider");
	}
	return context;
}

const GuidedTourOverlay = React.forwardRef(({ className, ...props }, ref) => {
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
});
GuidedTourOverlay.displayName = "GuidedTourOverlay";

function GuidedTour({ children, ...props }) {
	return (
		<div data-slot="guided-tour" {...props}>
			{children}
		</div>
	);
}

function GuidedTourTrigger({
	tourId,
	children,
	className,
	asChild = false,
	...props
}) {
	const { setActiveTour, setCurrentStep, setTotalSteps } = useGuidedTour();

	const handleClick = () => {
		// Find all elements with data-step for this tour
		const tourSteps = document.querySelectorAll(
			`[data-tour="${tourId}"][data-step]`,
		);
		const sortedSteps = Array.from(tourSteps).sort((a, b) => {
			const stepA = parseInt(a.getAttribute("data-step")) || 0;
			const stepB = parseInt(b.getAttribute("data-step")) || 0;
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

	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			type={asChild ? undefined : "button"}
			onClick={handleClick}
			className={cn(!asChild && "cursor-pointer", className)}
			{...props}
		>
			{children}
		</Comp>
	);
}

const GuidedTourStep = React.forwardRef(
	({ tourId, step, children, className, content, ...props }, ref) => {
		const { activeTour, currentStep, setActiveTour, setCurrentStep } =
			useGuidedTour();
		const isActive = activeTour === tourId && currentStep === step - 1;
		const elementRef = React.useRef(null);
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

		const handleOpenChange = (newOpen) => {
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
					if (
						activeTour === currentTourId &&
						currentStep === currentStepValue
					) {
						setActiveTour(null);
						setCurrentStep(0);
					}
				}, 100);
			}
		};

		const clonedElement = React.cloneElement(children, {
			ref: (node) => {
				elementRef.current = node;
				if (typeof children.ref === "function") {
					children.ref(node);
				} else if (ref) {
					if (typeof ref === "function") {
						ref(node);
					} else {
						ref.current = node;
					}
				}
			},
			"data-tour": tourId,
			"data-step": step,
			className: cn(
				className,
				isActive && "relative z-[101]",
				children.props?.className,
			),
			...props,
		});

		if (!isActive || !content) {
			return clonedElement;
		}

		return (
			<PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
				<PopoverPrimitive.Anchor asChild>
					{clonedElement}
				</PopoverPrimitive.Anchor>
				<GuidedTourStepContent>{content}</GuidedTourStepContent>
			</PopoverPrimitive.Root>
		);
	},
);
GuidedTourStep.displayName = "GuidedTourStep";

function GuidedTourStepContent({ children }) {
	const { currentStep, setCurrentStep, setActiveTour, totalSteps } =
		useGuidedTour();

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

function GuidedTourContent({
	children,
	className,
	onSkip,
	onNext,
	onBack,
	onFinish,
	isLastStep = false,
	isFirstStep = false,
	...props
}) {
	const { currentStep, totalSteps } = useGuidedTour();

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="guided-tour-content"
				className={cn(
					"z-[102] w-80 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					className,
				)}
				side="bottom"
				align="start"
				sideOffset={8}
				{...props}
			>
				<div className="flex flex-col gap-4">
					<div className="flex items-start justify-between gap-2">
						<div className="flex-1">{children}</div>
						{onSkip && (
							<PopoverPrimitive.Close asChild>
								<button
									type="button"
									onClick={onSkip}
									className="rounded-sm opacity-70 hover:opacity-100 transition-opacity p-1 -mt-1 -mr-1"
									aria-label="Close"
								>
									<X className="h-4 w-4" />
								</button>
							</PopoverPrimitive.Close>
						)}
					</div>

					<div className="flex items-center justify-between gap-2">
						<div className="text-xs text-muted-foreground">
							Step {currentStep + 1} of {totalSteps}
						</div>
						<div className="flex items-center gap-2">
							{onSkip && (
								<Button
									variant="ghost"
									size="sm"
									onClick={onSkip}
									type="button"
								>
									Skip
								</Button>
							)}
							{onBack && !isFirstStep && (
								<Button
									variant="outline"
									size="sm"
									onClick={onBack}
									type="button"
								>
									Back
								</Button>
							)}
							{isLastStep ? (
								<Button
									variant="default"
									size="sm"
									onClick={onFinish}
									type="button"
								>
									Finish
								</Button>
							) : (
								<Button
									variant="default"
									size="sm"
									onClick={onNext}
									type="button"
								>
									Next
								</Button>
							)}
						</div>
					</div>
				</div>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
}

// GuidedTourPopover is now deprecated - use GuidedTourStep with content prop instead
function GuidedTourPopover({ children, ...props }) {
	const { activeTour, currentStep, setCurrentStep, setActiveTour, totalSteps } =
		useGuidedTour();
	const [open, setOpen] = React.useState(false);
	const [currentElement, setCurrentElement] = React.useState(null);

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
		<PopoverPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
			<PopoverPrimitive.Anchor asChild>
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
			</PopoverPrimitive.Anchor>
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
		</PopoverPrimitive.Root>
	);
}

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

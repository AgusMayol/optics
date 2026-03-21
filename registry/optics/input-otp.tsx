"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/optics/button";
import { MinusIcon } from "lucide-react";

type InputOTPComponentProps = React.ComponentProps<typeof OTPInput> & {
	variant?: VariantProps<typeof buttonVariants>["variant"];
};

type InputOTPGroupProps = React.ComponentProps<"div">;
type InputOTPSlotProps = React.ComponentProps<"div"> & {
	index: number;
	variant?: VariantProps<typeof buttonVariants>["variant"];
};
type InputOTPSeparatorProps = React.ComponentProps<"div">;

function InputOTP({
	className = "",
	containerClassName = "",
	variant,
	...props
}: InputOTPComponentProps) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn(
				"cn-input-otp flex items-center has-disabled:opacity-50",
				containerClassName,
			)}
			spellCheck={false}
			className={cn(
				"disabled:cursor-not-allowed",
				variant &&
					buttonVariants({
						variant,
						animation: "colors",
						className:
							"cursor-text border-0 shadow-none ring-0 bg-transparent px-0",
					}),
				className,
			)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className = "", ...props }: InputOTPGroupProps) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn(
				"has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive rounded-md has-aria-invalid:ring-[2px] flex items-center",
				className,
			)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className = "",
	variant,
	...props
}: InputOTPSlotProps) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			data-variant={variant}
			className={cn(
				"bg-input/20 dark:bg-input/30 border-input data-[active=true]:border-ring data-[active=true]:ring-ring/30 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive size-7 border-y border-r text-xs/relaxed transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:ring-[2px] relative flex items-center justify-center data-[active=true]:z-10 cursor-default",
				variant &&
					buttonVariants({
						variant,
						animation: "colors",
						className:
							"cursor-default rounded-none border-y border-r first:rounded-l-md first:border-l last:rounded-r-md size-7 shadow-none px-0",
					}),
				className,
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink duration-1000 bg-foreground h-4 w-px" />
				</div>
			)}
		</div>
	);
}

function InputOTPSeparator(props: InputOTPSeparatorProps) {
	return (
		<div
			data-slot="input-otp-separator"
			className="[&_svg:not([class*='size-'])]:size-4 flex items-center"
			role="separator"
			{...props}
		>
			<MinusIcon />
		</div>
	);
}

InputOTP.displayName = "InputOTP";
InputOTPGroup.displayName = "InputOTPGroup";
InputOTPSlot.displayName = "InputOTPSlot";
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

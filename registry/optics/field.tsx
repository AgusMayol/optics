"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Label } from "@/registry/optics/label";
import { Separator } from "@/registry/optics/separator";

type FieldSetProps = React.ComponentProps<"fieldset">;
type FieldLegendProps = React.ComponentProps<"legend"> & {
	variant?: "legend" | "label";
};
type FieldGroupProps = React.ComponentProps<"div">;
type FieldProps = React.ComponentProps<"div"> &
	VariantProps<typeof fieldVariants>;
type FieldContentProps = React.ComponentProps<"div">;
type FieldLabelProps = React.ComponentProps<typeof Label>;
type FieldTitleProps = React.ComponentProps<"div">;
type FieldDescriptionProps = React.ComponentProps<"p">;
type FieldSeparatorProps = React.ComponentProps<"div">;
type FieldErrorItem = {
	message?: React.ReactNode | null | undefined;
};
type FieldErrorProps = React.ComponentProps<"div"> & {
	children?: React.ReactNode;
	errors?: FieldErrorItem[];
};

function FieldSet({ className = "", ...props }: FieldSetProps) {
	return (
		<fieldset
			data-slot="field-set"
			className={cn(
				"gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLegend({
	className = "",
	variant = "legend",
	...props
}: FieldLegendProps) {
	return (
		<legend
			data-slot="field-legend"
			data-variant={variant}
			className={cn(
				"mb-2 font-medium data-[variant=label]:text-xs/relaxed data-[variant=legend]:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function FieldGroup({ className = "", ...props }: FieldGroupProps) {
	return (
		<div
			data-slot="field-group"
			className={cn(
				"gap-4 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col",
				className,
			)}
			{...props}
		/>
	);
}

const fieldVariants = cva(
	"data-[invalid=true]:text-destructive gap-2 group/field flex w-full",
	{
		variants: {
			orientation: {
				vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
				horizontal:
					"flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				responsive:
					"flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	},
);

function Field({
	className = "",
	orientation = "vertical",
	...props
}: FieldProps) {
	return (
		<div
			role="group"
			data-slot="field"
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function FieldContent({ className = "", ...props }: FieldContentProps) {
	return (
		<div
			data-slot="field-content"
			className={cn(
				"gap-0.5 group/field-content flex flex-1 flex-col leading-snug",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLabel({ className = "", ...props }: FieldLabelProps) {
	return (
		<Label
			data-slot="field-label"
			className={cn(
				"has-data-checked:bg-primary/5 dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-2 group/field-label peer/field-label flex w-fit leading-snug",
				"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function FieldTitle({ className = "", ...props }: FieldTitleProps) {
	return (
		<div
			data-slot="field-label"
			className={cn(
				"gap-2 text-xs/relaxed font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug",
				className,
			)}
			{...props}
		/>
	);
}

function FieldDescription({ className = "", ...props }: FieldDescriptionProps) {
	return (
		<p
			data-slot="field-description"
			className={cn(
				"text-muted-foreground text-left text-xs/relaxed [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
				"last:mt-0 nth-last-2:-mt-1",
				"[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}

function FieldSeparator({
	children = null,
	className = "",
	...props
}: FieldSeparatorProps) {
	return (
		<div
			data-slot="field-separator"
			data-content={!!children}
			className={cn(
				"-my-2 h-5 text-xs/relaxed group-data-[variant=outline]/field-group:-mb-2 relative",
				className,
			)}
			{...props}
		>
			<Separator className="absolute inset-0 top-1/2" />
			{children && (
				<span
					className="text-muted-foreground px-2 bg-background relative mx-auto block w-fit"
					data-slot="field-separator-content"
				>
					{children}
				</span>
			)}
		</div>
	);
}

function FieldError({
	className = "",
	children = null,
	errors = [],
	...props
}: FieldErrorProps) {
	const content = React.useMemo<React.ReactNode>(() => {
		if (children) {
			return children;
		}

		if (!errors?.length) {
			return null;
		}

		const uniqueErrors = [
			...new Map(
				errors.map((error) => [String(error?.message ?? ""), error]),
			).values(),
		];

		if (uniqueErrors.length === 1) {
			return uniqueErrors[0]?.message;
		}

		return (
			<ul className="ml-4 flex list-disc flex-col gap-1">
				{uniqueErrors.map(
					(error, index) =>
						error?.message && <li key={index}>{error.message}</li>,
				)}
			</ul>
		);
	}, [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div
			role="alert"
			data-slot="field-error"
			className={cn("text-destructive text-xs/relaxed font-normal", className)}
			{...props}
		>
			{content}
		</div>
	);
}

Field.displayName = "Field";
FieldLabel.displayName = "FieldLabel";
FieldDescription.displayName = "FieldDescription";
FieldError.displayName = "FieldError";
FieldGroup.displayName = "FieldGroup";
FieldLegend.displayName = "FieldLegend";
FieldSeparator.displayName = "FieldSeparator";
FieldSet.displayName = "FieldSet";
FieldContent.displayName = "FieldContent";
FieldTitle.displayName = "FieldTitle";

export {
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle,
};

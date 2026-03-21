"use client";
import * as React from "react";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { cn } from "@/registry/optics/lib/utils";
import { Label } from "@/registry/optics/label";

type SlotChildProps = {
	className?: string;
};

type SlotProps = React.HTMLAttributes<HTMLElement> & {
	children?: React.ReactElement<SlotChildProps> | null;
};

type FormItemContextValue = {
	id: string;
};

type FormFieldContextValue = {
	name: string;
};

type FormItemProps = React.ComponentProps<"div">;
type FormLabelProps = React.ComponentProps<typeof Label>;
type FormDescriptionProps = React.ComponentProps<"p">;
type FormMessageProps = React.ComponentProps<"p"> & {
	children?: React.ReactNode;
};
type FormControlProps = SlotProps & {
	render?: unknown;
};

const Slot = ({ children, ...props }: SlotProps) => {
	if (React.isValidElement<SlotChildProps>(children)) {
		return React.cloneElement(children, {
			...props,
			...children.props,
			className: cn(props.className, children.props.className),
		});
	}
	return null;
};

const Form = FormProvider;

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
	null,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const itemContext = React.useContext(FormItemContext);
	if (!itemContext) {
		throw new Error("useFormField should be used within <FormItem>");
	}

	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);
	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function FormItem({ className = "", ...props }: FormItemProps) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({ className = "", ...props }: FormLabelProps) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({ render: _render, ...props }: FormControlProps) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

function FormDescription({ className = "", ...props }: FormDescriptionProps) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function FormMessage({
	className = "",
	children = null,
	...props
}: FormMessageProps) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;

	if (!body) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	);
}

FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";
FormField.displayName = "FormField";

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};

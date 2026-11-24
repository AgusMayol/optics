"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type { TooltipPositioner } from "@base-ui/react/tooltip";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/optics/tooltip";
import { cn } from "@/lib/utils";

type AvatarContextValue = {
	loaded: boolean;
	setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarContext = React.createContext<AvatarContextValue>({
	loaded: false,
	setLoaded: () => {},
});

export type AvatarProps = Omit<
	React.ComponentProps<typeof AvatarPrimitive.Root>,
	"className" | "title"
> & {
	className?: string;
	size?: "default" | "sm" | "lg";
	title?: React.ReactNode;
	tooltipSide?: TooltipPositioner.Props["side"];
	tooltipSideOffset?: TooltipPositioner.Props["sideOffset"];
	tooltipAlign?: TooltipPositioner.Props["align"];
	tooltipAlignOffset?: TooltipPositioner.Props["alignOffset"];
};

function Avatar({
	className = "",
	size = "default",
	title,
	tooltipSide = "top",
	tooltipSideOffset = 4,
	tooltipAlign = "center",
	tooltipAlignOffset = 0,
	children,
	...props
}: AvatarProps) {
	const [loaded, setLoaded] = React.useState(false);

	const renderAvatar = (
		triggerProps: React.HTMLAttributes<HTMLElement> & {
			ref?: React.Ref<HTMLSpanElement>;
		} = {},
	) => {
		const { className: triggerClassName, ref: triggerRef, ...triggerRest } = triggerProps;

		return (
			<AvatarContext.Provider value={{ loaded, setLoaded }}>
				<AvatarPrimitive.Root
					ref={triggerRef}
					data-slot="avatar"
					data-size={size}
					className={cn(
						"ring-background ring-2 size-8 rounded-full after:rounded-full squircle-none data-[size=lg]:size-10 data-[size=sm]:size-6 after:border-border group/avatar isolate relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten",
						className,
						triggerClassName,
					)}
					{...props}
					{...triggerRest}
				>
					{children}
				</AvatarPrimitive.Root>
			</AvatarContext.Provider>
		);
	};

	if (!title) {
		return renderAvatar();
	}

	return (
		<Tooltip>
			<TooltipTrigger render={renderAvatar} />
			<TooltipContent
				side={tooltipSide}
				sideOffset={tooltipSideOffset}
				align={tooltipAlign}
				alignOffset={tooltipAlignOffset}
			>
				{title}
			</TooltipContent>
		</Tooltip>
	);
}

export type AvatarStackItem = {
	title?: React.ReactNode;
	image: ImageProps["src"];
	fallback: React.ReactNode;
};

export type AvatarStackProps = Omit<AvatarImageProps, "src"> & {
	data?: AvatarStackItem[];
};

function AvatarStack({ data = [], width = 50, height = 50, alt = "", ...props }: AvatarStackProps) {
	return (
		<div className="flex items-center -space-x-2">
			{data.map((item, index) => (
				<Avatar title={item.title} key={index}>
					<AvatarImage src={item.image} width={width} height={height} alt={alt} {...props} />
					<AvatarFallback>{item.fallback}</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
}

export type AvatarImageProps = Omit<ImageProps, "alt" | "className"> & {
	alt?: string;
	className?: string;
};

function AvatarImage({
	className = "",
	width = 50,
	height = 50,
	alt = "",
	...props
}: AvatarImageProps) {
	const { setLoaded } = React.useContext(AvatarContext);

	return (
		<Image
			data-slot="avatar-image"
			className={cn(
				"aspect-square size-full rounded-full squircle-none object-cover absolute inset-0 z-10 bg-background",
				className,
			)}
			width={width}
			height={height}
			alt={alt}
			onLoad={() => setLoaded(true)}
			onError={() => setLoaded(false)}
			{...props}
		/>
	);
}

export type AvatarFallbackProps = Omit<
	React.ComponentProps<typeof AvatarPrimitive.Fallback>,
	"className"
> & {
	className?: string;
};

function AvatarFallback({ className = "", ...props }: AvatarFallbackProps) {
	const { loaded } = React.useContext(AvatarContext);

	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-muted text-muted-foreground rounded-full squircle-none absolute inset-0 grid place-items-center text-sm group-data-[size=sm]/avatar:text-xs z-0 transition-opacity",
				loaded && "opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarBadge({ className = "", ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"bg-primary text-primary-foreground ring-background absolute right-0 bottom-0 z-30 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none squircle-none",
				"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
				"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroup({ className = "", ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn("group/avatar-group flex -space-x-2", className)}
			{...props}
		/>
	);
}

function AvatarGroupCount({ className = "", ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"bg-muted text-muted-foreground size-8 rounded-full squircle-none text-xs/relaxed group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 ring-background relative flex shrink-0 items-center justify-center ring-2",
				className,
			)}
			{...props}
		/>
	);
}

Avatar.displayName = "Avatar";
AvatarStack.displayName = "AvatarStack";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";
AvatarGroup.displayName = "AvatarGroup";
AvatarGroupCount.displayName = "AvatarGroupCount";
AvatarBadge.displayName = "AvatarBadge";

export {
	Avatar,
	AvatarStack,
	AvatarImage,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarBadge,
};

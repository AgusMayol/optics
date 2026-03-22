"use client";
import * as React from "react";
import { cn } from "@/registry/optics/lib/utils";

type GridContextValue = {
	cols: number;
	rows: number;
	gap: number;
	border: boolean;
};

type GridContainerProps = React.ComponentProps<"div"> & {
	cols?: number;
	rows?: number;
	gap?: number;
	border?: boolean;
	children?: React.ReactNode;
};

type GridRowProps = React.ComponentProps<"div"> & {
	span?: number;
	gap?: number;
	overrideStyles?: boolean;
	borderTop?: boolean;
	borderBottom?: boolean;
	children?: React.ReactNode;
};

type GridItemProps = React.ComponentProps<"div"> & {
	span?: number;
	borderLeft?: boolean;
	borderRight?: boolean;
	borderTop?: boolean;
	borderBottom?: boolean;
	decorationTopLeft?: boolean;
	decorationTopRight?: boolean;
	decorationBottomLeft?: boolean;
	decorationBottomRight?: boolean;
	children?: React.ReactNode;
};

const GridContext = React.createContext<GridContextValue | null>(null);

const useGridContext = () => {
	const context = React.useContext(GridContext);
	if (!context) {
		throw new Error("GridRow y GridItem deben estar dentro de GridContainer");
	}
	return context;
};

export const GridContainer = ({
	cols = 12,
	rows = 1,
	gap = 0,
	border = true,
	className = "",
	children = null,
	...props
}: GridContainerProps) => {
	const contextValue = React.useMemo(
		() => ({
			cols,
			rows,
			gap,
			border,
		}),
		[border, cols, gap, rows],
	);

	return (
		<GridContext.Provider value={contextValue}>
			<div
				className={cn("w-full grid", className)}
				style={{
					gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
					gap,
				}}
				{...props}
			>
				{children}
			</div>
		</GridContext.Provider>
	);
};

export const GridRow = ({
	className = "",
	children = null,
	span: paramSpan = 0,
	gap: paramGap = 0,
	overrideStyles = false,
	borderTop = true,
	borderBottom = true,
	...props
}: GridRowProps) => {
	const { cols, gap: containerGap, border } = useGridContext();
	const gap = paramGap || containerGap;
	const span = paramSpan || cols;

	return (
		<div
			className={cn(
				"w-full grid border-t last:border-b -mb-[1px] s",
				gap > 0 && "!border-b -mb-0",
				!border && "!border-0",
				!borderTop && "!border-t-0",
				!borderBottom && "!border-b-0",
				className,
			)}
			style={
				overrideStyles
					? undefined
					: {
							gridColumn: `span ${span} / span ${cols}`,
							gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
							gap,
						}
			}
			{...props}
		>
			{children}
		</div>
	);
};

export const GridItem = ({
	className = "",
	children = null,
	span = 1,
	borderLeft = true,
	borderRight = true,
	borderTop = false,
	borderBottom = false,
	decorationTopLeft = false,
	decorationTopRight = false,
	decorationBottomLeft = false,
	decorationBottomRight = false,
	...props
}: GridItemProps) => {
	const { cols, border } = useGridContext();
	const hasDecorations =
		decorationTopLeft ||
		decorationTopRight ||
		decorationBottomLeft ||
		decorationBottomRight;

	return (
		<div
			className={cn(
				"border-l last:border-r flex items-center justify-center relative",
				span === 1 && "md:aspect-square",
				span === 1 && "min-h-[60px] md:min-h-0",
				!borderLeft && "!border-l-0",
				!borderRight && "!border-r-0",
				borderTop && "!border-t",
				borderBottom && "!border-b",
				!border && "!border-0",
				!hasDecorations && "overflow-hidden",
				className,
			)}
			style={{
				gridColumn: `span ${span} / span ${cols}`,
			}}
			{...props}
		>
			{children}

			{decorationTopLeft && (
				<div className={cn("absolute -left-[1px] -top-[1px] z-10")}>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[21px] rounded-full absolute -top-2.5" />
						<div className="bg-muted-foreground w-[21px] h-[1px] rounded-full absolute -left-2.5" />
					</div>
				</div>
			)}

			{decorationTopRight && (
				<div
					className={cn(
						"absolute -right-[0px] -top-[1px] z-10",
						span !== 1 && "-right-[0px]",
					)}
				>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[21px] rounded-full absolute -top-2.5" />
						<div className="bg-muted-foreground w-[21px] h-[1px] rounded-full absolute -left-2.5" />
					</div>
				</div>
			)}

			{decorationBottomLeft && (
				<div
					className={cn(
						"absolute -left-[1px] -bottom-[0px] z-10",
						span !== 1 && "-left-[1px] bottom-[1px]",
					)}
				>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[21px] rounded-full absolute -top-2.5" />
						<div className="bg-muted-foreground w-[21px] h-[1px] rounded-full absolute -left-2.5" />
					</div>
				</div>
			)}

			{decorationBottomRight && (
				<div
					className={cn(
						"absolute -right-[0px] -bottom-[0px] z-10",
						span !== 1 && "bottom-[1px]",
					)}
				>
					<div className="relative">
						<div className="bg-muted-foreground w-[1px] h-[21px] rounded-full absolute -top-2.5" />
						<div className="bg-muted-foreground w-[21px] h-[1px] rounded-full absolute -left-2.5" />
					</div>
				</div>
			)}
		</div>
	);
};

GridContainer.displayName = "GridContainer";
GridRow.displayName = "GridRow";
GridItem.displayName = "GridItem";

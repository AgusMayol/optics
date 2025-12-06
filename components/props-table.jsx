import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { GridContainer, GridItem, GridRow } from "@/registry/optics/grid";
import { ALargeSmall, Binary, Info } from "lucide-react";
import { Button } from "@/registry/optics/button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/registry/optics/tooltip";
import { ShowMore } from "@/registry/optics/show-more";

const renderPropsTableItem = (item) => (
	<div key={item.component} className="w-full flex flex-col gap-2">
		<Badge variant="outline" className="text-xs font-mono">
			{item.component}
		</Badge>

		<GridContainer
			cols={12}
			rows={item.props.length + 1}
			border={false}
			className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-[calc(var(--radius)+3px)] [&>*:last-child]:rounded-b-[calc(var(--radius)+3px)] shadow border rounded-xl [&>*:nth-child(odd)]:bg-muted`}
		>
			<GridRow
				className="rounded-t-[calc(var(--radius)+3px)] w-full grid !grid-cols-12 !grid-rows-1 col-span-full !py-0"
				overrideStyles={true}
			>
				<GridItem
					span={5}
					className="text-xs font-semibold justify-start gap-1 !row-span-1"
				>
					<ALargeSmall />
					Name
				</GridItem>
				<GridItem
					span={6}
					className="text-xs font-semibold gap-1 mr-auto !row-span-1"
				>
					<Binary size={16} />
					Type
				</GridItem>
				<GridItem
					span={1}
					className="text-xs font-semibold gap-1 pl-4 !row-span-1"
				></GridItem>
			</GridRow>

			{item.props.map((prop, index) => (
				<GridRow
					key={`${item.component}-${prop.name}`}
					className={cn(
						item.props.length - 1 === index &&
							"rounded-b-[calc(var(--radius)+3px)]",
						"h-[calc(100%)] w-full  grid !grid-cols-12 !grid-rows-1 col-span-full !py-0",
					)}
					overrideStyles={true}
				>
					{prop.name && (
						<GridItem
							span={5}
							className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em]"
						>
							<Badge
								variant="outline"
								className="font-mono text-blue-600 dark:text-blue-400 bg-background"
							>
								{prop.name}
							</Badge>
						</GridItem>
					)}
					{prop.type && (
						<GridItem
							span={6}
							className="text-xs font-mono justify-start"
						>
							{prop.type}
						</GridItem>
					)}
					{prop.description && (
						<GridItem
							span={1}
							className="text-xs text-balance font-mono justify-end px-4 py-0"
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="ghost" size="icon">
											<Info size={16} className="text-muted-foreground" />
											<span className="sr-only">Description</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent className="w-52">
										<p className="text-xs text-pretty">
											{prop.description}
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</GridItem>
					)}
				</GridRow>
			))}
		</GridContainer>
	</div>
);

export const PropsTable = ({ data, className, ...props }) => {
	// ExampleData = [
	//     {
	//          component: "<SnippetCopyButton />",
	//          props: [
	//              {
	//                  name: "value",
	//                  type: "string",
	//                  description: "The value to copy to the clipboard.",
	//              },
	//              {
	//                  name: "timeout",
	//                  type: "number",
	//                  description: "The timeout in milliseconds to copy the value to the clipboard.",
	//              },
	//          ],
	//     },
	// ]

	// If there's only one item, render it normally
	if (data.length === 1) {
		return (
			<div className={cn("w-full flex flex-col gap-12", className)} {...props}>
				{renderPropsTableItem(data[0])}
			</div>
		);
	}

	// If there are multiple items, use ShowMore
	const firstItem = data[0];
	const remainingItems = data.slice(1);

	return (
		<div className={cn("w-full flex flex-col gap-12", className)} {...props}>
			<ShowMore
				moreContent={
					<div className="flex flex-col gap-12 mt-12">
						{remainingItems.map((item) => renderPropsTableItem(item))}
					</div>
				}
				showSeparator={false}
			>
				{renderPropsTableItem(firstItem)}
			</ShowMore>
		</div>
	);
};

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import { GridContainer, GridItem, GridRow } from "@/registry/optics/grid";
import { ALargeSmall, Binary, Info } from "lucide-react";

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

	return (
		<div className={cn("w-full flex flex-col gap-12", className)} {...props}>
			{data.map((item) => (
				<div key={item.component} className="w-full flex flex-col gap-2">
					<Badge variant="outline" className="text-xs font-mono">
						{item.component}
					</Badge>

					<GridContainer
						cols={3}
						rows={item.props.length + 1}
						border={false}
						className={`[&>*:not(:first-child)]:!border-t [&>*]:py-4 [&>*]:pl-4 [&>*:first-child]:rounded-t-[calc(var(--radius)+3px)] [&>*:last-child]:rounded-b-[calc(var(--radius)+3px)] shadow border rounded-xl [&>*:nth-child(odd)]:bg-muted`}
					>
						<GridRow className="rounded-t-[calc(var(--radius)+3px)] w-full grid !grid-cols-3 !grid-rows-1 col-span-full" overrideStyles={true}>
							<GridItem
								span={4}
								className="text-xs font-semibold justify-start gap-1 !row-span-1 !col-span-1"
							>
								<ALargeSmall />
								Name
							</GridItem>
							<GridItem
								span={4}
								className="text-xs font-semibold gap-1 mr-auto !row-span-1 !col-span-1"
							>
								<Binary size={16} />
								Type
							</GridItem>
							<GridItem
								span={4}
								className="text-xs font-semibold gap-1 pl-4 mr-auto !row-span-1 !col-span-1"
							>
								<Info size={16} />
								Description
							</GridItem>
						</GridRow>

						{item.props.map((prop, index) => (
							<GridRow
								key={`${item.component}-${prop.name}`}
								className={cn(
									item.props.length - 1 === index &&
										"rounded-b-[calc(var(--radius)+3px)]",
									"h-[calc(100%)] w-full grid !grid-cols-3 !grid-rows-1 col-span-full",
								)}
                                overrideStyles={true}
							>
								{prop.name && (
									<GridItem
										span={4}
										className="justify-start text-[14px] leading-[1.4] tracking-[-0.01em] !row-span-1 !col-span-1"
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
										span={4}
										className="text-xs font-mono justify-start !row-span-1 !col-span-1"
									>
										{prop.type}
									</GridItem>
								)}
								{prop.description && (
									<GridItem
										span={4}
										className="text-xs text-balance font-mono justify-start pr-8 pl-4 !row-span-1 !col-span-1"
									>
										{prop.description}
									</GridItem>
								)}
							</GridRow>
						))}
					</GridContainer>
				</div>
			))}
		</div>
	);
};

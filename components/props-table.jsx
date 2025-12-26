import { cn } from "@/lib/utils";
import { Badge } from "@/registry/optics/badge";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/registry/optics/table";
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
		<div className="border rounded-xl overflow-hidden">
			<Table
				className={cn(
					"border-collapse",
					"[&_thead_tr]:rounded-t-[calc(var(--radius)+3px)]",
					"[&_tbody_tr:last-child]:rounded-b-[calc(var(--radius)+3px)]",
					"[&_tbody_tr:nth-child(odd)]:bg-muted",
					"[&_tbody_tr]:border-t",
				)}
			>
				<TableHeader>
					<TableRow className="border-b rounded-t-[calc(var(--radius)+3px)]">
						<TableHead className="text-xs font-semibold py-4 pl-4 w-[41.666667%]">
							<div className="flex items-center justify-start gap-1">
								<ALargeSmall />
								Name
							</div>
						</TableHead>
						<TableHead className="text-xs font-semibold py-4 pl-4 w-[50%]">
							<div className="flex items-center gap-1">
								<Binary size={16} />
								Type
							</div>
						</TableHead>
						<TableHead className="text-xs font-semibold py-4 pl-4 w-[8.333333%]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{item.props.map((prop, index) => (
						<TableRow
							key={`${item.component}-${prop.name}`}
							className={cn(
								item.props.length - 1 === index &&
									"rounded-b-[calc(var(--radius)+3px)]",
								"border-t",
							)}
						>
							<TableCell className="py-4 pl-4 w-[41.666667%]">
								{prop.name ? (
									<div className="flex items-center justify-start text-[14px] leading-[1.4] tracking-[-0.01em]">
										<Badge
											variant="outline"
											className="font-mono text-blue-600 dark:text-blue-400 bg-background"
										>
											{prop.name}
											{/* {prop.required && <span className="ml-1 text-red-500">*</span>} */}
										</Badge>
									</div>
								) : null}
							</TableCell>
							<TableCell className="py-4 pl-4 text-xs font-mono w-[50%]">
								{prop.type ? (
									<div className="flex items-center justify-start">
										{prop.type}
										{prop.defaultValue && (
											<span className="ml-2 text-muted-foreground">
												{prop.defaultValue}
											</span>
										)}
									</div>
								) : null}
							</TableCell>
							<TableCell className="py-4 pl-4 w-[8.333333%]">
								{prop.description ? (
									<div className="flex items-center justify-end px-4">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger
													render={
														<Button variant="ghost" size="icon">
															<Info
																size={16}
																className="text-muted-foreground"
															/>
															<span className="sr-only">Description</span>
														</Button>
													}
												/>
												<TooltipContent className="w-52">
													<p className="text-xs text-pretty">
														{prop.description}
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								) : null}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	</div>
);

export const PropsTable = ({ data, className, ...props }) => {
	// Si data es un string (nombre del componente), intentar cargar el JSON
	let propsData = data;

	if (typeof data === "string") {
		try {
			// En Next.js, podemos usar import dinámico para JSON en build time
			// Pero para runtime, necesitamos usar require o import estático
			// Por ahora, asumimos que el JSON se importa estáticamente
			// El usuario debe importar: import propsData from "./props.json"
			console.warn(
				"PropsTable: data should be an array or imported JSON. String paths not supported in runtime.",
			);
			return null;
		} catch (error) {
			console.error(`Error loading props:`, error);
			return null;
		}
	}

	// Validar que data sea un array
	if (!Array.isArray(propsData) || propsData.length === 0) {
		return null;
	}

	// Si hay solo un item, renderizarlo normalmente
	if (propsData.length === 1) {
		return (
			<div className={cn("w-full flex flex-col gap-12", className)} {...props}>
				{renderPropsTableItem(propsData[0])}
			</div>
		);
	}

	// Si hay múltiples items, usar ShowMore
	const firstItem = propsData[0];
	const remainingItems = propsData.slice(1);

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

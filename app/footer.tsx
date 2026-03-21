"use client";
import { Button } from "@/registry/optics/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Dithering } from "@paper-design/shaders-react";
import { useIsLight } from "@/hooks/use-get-theme";

export function Footer() {
	const isLight = useIsLight();

	return (
		<footer className="col-span-full border-t w-full flex flex-col items-end justify-end text-end p-4 bg-background relative z-20">
			<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
				Made from
				<Image src="/images/AR.png" alt="Argentina" width={16} height={16} />
				by{" "}
				<Button
					variant="link"
					nativeButton={false}
					className="text-xs text-muted-foreground hover:text-primary transition-colors mr-2"
					render={
						<Link
							href="https://agusmayol.com.ar"
							target="_blank"
							rel="noopener noreferrer"
						>
							AgusMayol
							<ArrowUpRight size={16} className="-ml-1" />
						</Link>
					}
				/>
				The source code is available on{" "}
				<Button
					variant="link"
					nativeButton={false}
					className="text-xs text-muted-foreground hover:text-primary transition-colors"
					render={
						<Link
							href="https://github.com/agusmayol/optics"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
							<ArrowUpRight size={16} className="-ml-1" />
						</Link>
					}
				/>
			</p>
			<Dithering
				colorBack={isLight ? "#ffffff" : "#0a0a0a"}
				colorFront="#6cace4"
				shape="warp"
				type="4x4"
				size={2}
				speed={0.08}
				className="w-full h-full absolute top-0 left-0 opacity-20 -z-10"
			/>
		</footer>
	);
}

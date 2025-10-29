import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 0,
		height: typeof window !== "undefined" ? window.innerHeight : 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
};

export function AnimationsBackground() {
	const { width, height } = useWindowSize();

	return (
		<div className={cn("flex flex-col items-center")}>
			<UnicornScene
				production={true}
				projectId="0DHyC9dXItt7R1gglbmY"
				width={150}
				height={150}
			/>
		</div>
	);
};

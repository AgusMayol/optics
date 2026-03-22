"use client";
import * as React from "react";

type SidebarWidthContextValue = {
	sidebarWidth: number;
	setSidebarWidth: React.Dispatch<React.SetStateAction<number>>;
};

const SidebarWidthContext = React.createContext<
	SidebarWidthContextValue | undefined
>(undefined);

export function SidebarWidthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarWidth, setSidebarWidth] = React.useState(0);

	return (
		<SidebarWidthContext.Provider value={{ sidebarWidth, setSidebarWidth }}>
			{children}
		</SidebarWidthContext.Provider>
	);
}

export function useSidebarWidth() {
	const context = React.useContext(SidebarWidthContext);

	if (!context) {
		throw new Error("useSidebarWidth must be used within SidebarWidthProvider");
	}

	return context;
}

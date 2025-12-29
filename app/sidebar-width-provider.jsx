"use client";
import * as React from "react";

const SidebarWidthContext = React.createContext(undefined);

export function SidebarWidthProvider({ children }) {
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





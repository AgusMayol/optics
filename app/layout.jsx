import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { LayoutContent } from "./layout-content";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Toaster } from "@/registry/agusmayol/sonner";
import { ViewTransition } from "react";

const interSans = Inter({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal", "italic"],
	variable: "--font-instrument-serif",
	display: "swap",
});

export const metadata = {
	title: process.env.NEXT_PUBLIC_TITLE,
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
	keywords: [
		"AgusMayol Optics",
		"design system",
		"component registry",
		"react components",
		"nextjs",
		"next.js 16",
		"tailwind css",
		"tailwind v4",
		"ui components",
		"shadcn",
		"shadcn ui",
		"radix ui",
		"web development",
		"frontend development",
		"react hooks",
		"javascript",
		"typescript",
		"responsive design",
		"component library",
		"modern ui",
		"dark mode",
		"theme switcher",
		"accessibility",
		"a11y",
		"web components",
		"react framework",
		"css framework",
		"ui/ux",
		"frontend architecture",
		"design patterns",
		"reusable components",
		"web design",
		"developer tools",
		"typography",
		"iconography",
		"color palette",
		"animations",
		"transitions",
		"cursor rules",
		"mcp",
		"model context protocol",
		"react 19",
		"server components",
		"client components",
		"form components",
		"dialog components",
		"drawer components",
		"button components",
		"input components",
		"card components",
		"table components",
		"navigation components",
		"layout system",
		"design tokens",
		"css variables",
		"tailwind utilities",
		"component documentation",
		"code snippets",
		"copy paste components",
	],
	applicationName: process.env.NEXT_PUBLIC_APPLICATION_NAME,
	metadataBase: new URL(`https://www.${process.env.NEXT_PUBLIC_DOMAIN}`),
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/",
		},
	},
	openGraph: {
		title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		url: `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
		siteName: process.env.NEXT_PUBLIC_APPLICATION_NAME,
		images: "/images/assets/og.png",
	},
	appleWebApp: {
		title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
	},
	icons: {
		icon: "/apple-touch-icon.png",
		shortcut: "/apple-touch-icon.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${interSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ViewTransition>
						<LayoutContent>{children}</LayoutContent>
						<Toaster />
						{shouldInjectToolbar && <VercelToolbar />}
					</ViewTransition>
				</ThemeProvider>
			</body>
		</html>
	);
}

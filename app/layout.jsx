import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { LayoutContent } from "./layout-content";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Toaster } from "@/registry/optics/sonner";
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
		"component library",
		"React components",
		"Next.js 16",
		"Tailwind CSS",
		"ui components",
		"shadcn ui",
		"Radix UI",
		"frontend development",
		"UI/UX",
		"accessibility",
		"component documentation",
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
	},
	appleWebApp: {
		title: process.env.NEXT_PUBLIC_APPLICATION_NAME,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({ children }) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: process.env.NEXT_PUBLIC_APPLICATION_NAME,
		url: `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${interSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
					}}
				/>
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

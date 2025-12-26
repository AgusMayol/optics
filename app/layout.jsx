import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { LayoutContent } from "./layout-content";
import { VercelToolbar } from "@vercel/toolbar/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/registry/optics/sonner";
import { ViewTransition } from "react";
import { Header } from "./header";
import { links } from "./layout-content";
import { Footer } from "./footer";
import { SidebarWidthProvider } from "./sidebar-width-provider";

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
		"ui components",
		"shadcn ui",
		"UI/UX",
		"Installation",
		"Colors",
		"Iconography",
		"Materials",
		"Typography",
		"SEO & Metadata",
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
				className={`${interSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background grid grid-cols-[1fr_minmax(0,1280px)_1fr] grid-rows-[1fr_auto]`}
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
						<Analytics />
						<SpeedInsights />
						<SidebarWidthProvider>
							<div className="col-start-1 row-start-1 lg:border-r lg:border-b border-dashed bg-background sticky top-0 z-20" />
							<div className="col-start-2 row-start-1 border-b z-50 bg-background sticky top-0">
								<Header links={links} />
							</div>
							<div className="col-start-3 row-start-1 lg:border-l lg:border-b border-dashed bg-background sticky top-0 z-20" />

							<div className="col-start-1 row-start-2 lg:border-r" />
							<LayoutContent>{children}</LayoutContent>
							<div className="col-start-3 row-start-2 lg:border-l sticky top-0" />

							{/* <div className="bg-background z-10 fixed bottom-0 left-auto w-full">
								<Footer />
							</div> */}
						</SidebarWidthProvider>
						<Toaster />
						{shouldInjectToolbar && <VercelToolbar />}
					</ViewTransition>
				</ThemeProvider>
			</body>
		</html>
	);
}

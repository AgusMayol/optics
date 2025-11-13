"use client";
import * as React from "react";
import { Badge } from "@/registry/agusmayol/badge";
import { Button } from "@/registry/agusmayol/button";
import { Separator } from "@/registry/agusmayol/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
} from "@/registry/agusmayol/code-block";

// Code examples data
const basicMetadataCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  title: {
    default: "My Application",
    template: "%s | My Application",
  },
  description: "The best web application for your needs",
  keywords: ["nextjs", "react", "web app", "seo"],
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  creator: "Your Name",
  publisher: "Your Company",
  metadataBase: new URL("https://yourdomain.com"),
};`,
	},
];

const openGraphCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  openGraph: {
    title: "My Application",
    description: "The best web application for your needs",
    url: "https://yourdomain.com",
    siteName: "My Application",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Application Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};`,
	},
];

const twitterCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  twitter: {
    card: "summary_large_image",
    title: "My Application",
    description: "The best web application for your needs",
    creator: "@yourusername",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },
};`,
	},
];

const robotsCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};`,
	},
];

const iconsCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/shortcut-icon.png",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};`,
	},
];

const verificationCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-code",
    yahoo: "your-yahoo-code",
  },
};`,
	},
];

const alternatesCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  alternates: {
    canonical: "https://yourdomain.com",
    languages: {
      "en-US": "https://yourdomain.com/en",
      "es-ES": "https://yourdomain.com/es",
    },
  },
};`,
	},
];

const completeMetadataCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "My Application - Main Tagline",
    template: "%s | My Application",
  },
  description: "The best web application for your needs. Detailed description of what you offer.",
  keywords: ["nextjs", "react", "web app", "seo", "typescript"],
  authors: [{ name: "Your Name", url: "https://yourdomain.com" }],
  creator: "Your Name",
  publisher: "Your Company",
  
  // Open Graph
  openGraph: {
    title: "My Application",
    description: "The best web application for your needs",
    url: "https://yourdomain.com",
    siteName: "My Application",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Application Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "My Application",
    description: "The best web application for your needs",
    creator: "@yourusername",
    images: ["/twitter-image.jpg"],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Icons
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code",
  },
  
  // Alternates
  alternates: {
    canonical: "https://yourdomain.com",
  },
};`,
	},
];

const dynamicMetadataCode = [
	{
		language: "jsx",
		filename: "app/blog/[slug]/page.js",
		code: `export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Fetch data
  const post = await fetch(\`https://api.yourdomain.com/posts/\${slug}\`)
    .then((res) => res.json());
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPost({ params }) {
  // Your component...
}`,
	},
];

const jsonLdCode = [
	{
		language: "jsx",
		filename: "app/layout.js",
		code: `export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "My Application",
    "description": "The best web application for your needs",
    "url": "https://yourdomain.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourdomain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
	},
];

const sitemapCode = [
	{
		language: "jsx",
		filename: "app/sitemap.js",
		code: `export default function sitemap() {
  return [
    {
      url: "https://yourdomain.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://yourdomain.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yourdomain.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}`,
	},
];

const robotsTxtCode = [
	{
		language: "jsx",
		filename: "app/robots.js",
		code: `export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}`,
	},
];

const ogImageCode = [
	{
		language: "jsx",
		filename: "app/opengraph-image.tsx",
		code: `import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'My Application';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        My Application
      </div>
    ),
    {
      ...size,
    }
  );
}`,
	},
];

const ogImageDynamicCode = [
	{
		language: "jsx",
		filename: "app/blog/[slug]/opengraph-image.tsx",
		code: `import { ImageResponse } from 'next/og';

export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  
  // Fetch post data
  const post = await fetch(\`https://api.yourdomain.com/posts/\${slug}\`)
    .then((res) => res.json());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    }
  );
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background rounded-b-xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-12 pb-4">
				<h1 className="text-4xl font-bold tracking-tight">SEO & Metadata</h1>
				<p className="text-muted-foreground text-xl">
					Optimize your Next.js application for search engines with ready-to-use
					code snippets.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-24 p-12 pt-4">
				{/* Introduction */}
				<div className="flex flex-col gap-4 -mt-2">
					<p className="text-muted-foreground leading-7">
						Next.js includes a Metadata API that allows you to define metadata
						to improve your application's SEO. This guide includes ready-to-copy
						examples for your Next.js project.
					</p>
				</div>

				{/* 1. Complete Configuration */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										1
									</Badge>
									Complete Metadata
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Below is a complete example of the metadata setup, so you can easily
						copy it into your{" "}
						<Badge variant="outline" className="text-xs font-mono">
							app/layout.jsx
						</Badge>
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className=" px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										app/layout.jsx
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={completeMetadataCode}
											defaultValue={completeMetadataCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar"
														>
															{item.code}
														</CodeBlockContent>
													</CodeBlockItem>
												)}
											</CodeBlockBody>
										</CodeBlock>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardFooter>
					</Card>
				</div>

				{/* 2. Dynamic Metadata */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										2
									</Badge>
									Dynamic Metadata
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						For pages with dynamic content (blogs, products, etc.), use{" "}
						<Badge variant="outline" className="text-xs font-mono">
							generateMetadata()
						</Badge>
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										[slug]/page.jsx
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={dynamicMetadataCode}
											defaultValue={dynamicMetadataCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.language}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar"
														>
															{item.code}
														</CodeBlockContent>
													</CodeBlockItem>
												)}
											</CodeBlockBody>
										</CodeBlock>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardFooter>
					</Card>
				</div>

				{/* 3. Open Graph Image Generation */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										3
									</Badge>
									Open Graph Image Generation
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Automatically generate Open Graph images using Next.js. Create{" "}
						<Badge variant="outline" className="text-xs font-mono">
							app/opengraph-image.tsx
						</Badge>{" "}
						or{" "}
						<Badge variant="outline" className="text-xs font-mono">
							app/[route]/opengraph-image.tsx
						</Badge>{" "}
						for dynamic routes. Next.js will automatically generate the image
						and add the correct meta tags.
					</p>
					<div className="flex flex-col gap-4">
						<Card className="pt-0 pb-0 bg-background">
							<CardFooter className="px-0 py-0 rounded-b-xl">
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Static OG Image
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={ogImageCode}
												defaultValue={ogImageCode[0].filename}
												className="border-none rounded-none rounded-b-xl shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton />
												</CodeBlockHeader>
												<CodeBlockBody>
													{(item) => (
														<CodeBlockItem
															key={item.language}
															value={item.filename}
														>
															<CodeBlockContent
																language={item.language}
																className="bg-sidebar"
															>
																{item.code}
															</CodeBlockContent>
														</CodeBlockItem>
													)}
												</CodeBlockBody>
											</CodeBlock>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardFooter>
						</Card>

						<Card className="pt-0 pb-0 bg-background">
							<CardFooter className="px-0 py-0 rounded-b-xl">
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Dynamic OG Image (per route)
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={ogImageDynamicCode}
												defaultValue={ogImageDynamicCode[0].filename}
												className="border-none rounded-none rounded-b-xl shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton />
												</CodeBlockHeader>
												<CodeBlockBody>
													{(item) => (
														<CodeBlockItem
															key={item.language}
															value={item.filename}
														>
															<CodeBlockContent
																language={item.language}
																className="bg-sidebar"
															>
																{item.code}
															</CodeBlockContent>
														</CodeBlockItem>
													)}
												</CodeBlockBody>
											</CodeBlock>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardFooter>
						</Card>
					</div>
				</div>

				{/* 4. Sitemap & Robots */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button variant="link" asChild className="gap-1">
							<Link
								href="https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap"
								target="_blank"
								rel="noopener noreferrer"
							>
								<h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
									<Badge
										variant="outline"
										className="tabular-nums aspect-square"
									>
										4
									</Badge>
									Sitemap & Robots.txt
								</h2>
								<ArrowUpRight size={16} className="mb-4" />
							</Link>
						</Button>
					</div>
					<p className="text-muted-foreground leading-7">
						Next.js automatically generates sitemap.xml and robots.txt files.
						Create{" "}
						<Badge variant="outline" className="text-xs font-mono">
							app/sitemap.js
						</Badge>{" "}
						and{" "}
						<Badge variant="outline" className="text-xs font-mono">
							app/robots.js
						</Badge>{" "}
						in your app directory. These files will be automatically served at{" "}
						<code className="text-xs">/sitemap.xml</code> and{" "}
						<code className="text-xs">/robots.txt</code>.
					</p>
					<div className="flex flex-col gap-4">
						<Card className="pt-0 pb-0 bg-background">
							<CardFooter className="px-0 py-0 rounded-b-xl">
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Sitemap (app/sitemap.js)
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={sitemapCode}
												defaultValue={sitemapCode[0].filename}
												className="border-none rounded-none rounded-b-xl shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton />
												</CodeBlockHeader>
												<CodeBlockBody>
													{(item) => (
														<CodeBlockItem
															key={item.language}
															value={item.filename}
														>
															<CodeBlockContent
																language={item.language}
																className="bg-sidebar"
															>
																{item.code}
															</CodeBlockContent>
														</CodeBlockItem>
													)}
												</CodeBlockBody>
											</CodeBlock>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardFooter>
						</Card>

						<Card className="pt-0 pb-0 bg-background">
							<CardFooter className="px-0 py-0 rounded-b-xl">
								<Accordion type={"single"} collapsible className="w-full">
									<AccordionItem value="codeblock" className="rounded-b-xl">
										<AccordionTrigger
											className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
											showArrow
										>
											Robots.txt (app/robots.js)
										</AccordionTrigger>
										<AccordionContent
											className="border-b-0 border-x-0 border-t pb-0 shadow-none"
											keepRendered
										>
											<CodeBlock
												data={robotsTxtCode}
												defaultValue={robotsTxtCode[0].filename}
												className="border-none rounded-none rounded-b-xl shadow-none group"
											>
												<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
													<CodeBlockCopyButton />
												</CodeBlockHeader>
												<CodeBlockBody>
													{(item) => (
														<CodeBlockItem
															key={item.language}
															value={item.filename}
														>
															<CodeBlockContent
																language={item.language}
																className="bg-sidebar"
															>
																{item.code}
															</CodeBlockContent>
														</CodeBlockItem>
													)}
												</CodeBlockBody>
											</CodeBlock>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>

			<Separator decoration />

			{/* Additional Tips */}
			<div className="flex flex-col items-start justify-start gap-12 p-12 pt-4">
				<h3 className="text-xl font-semibold">Additional SEO Tips</h3>
				<ul className="list-disc list-inside space-y-2 text-muted-foreground">
					<li>
						<strong>OG Images:</strong> Use 1200x630px for Open Graph (Facebook,
						LinkedIn)
					</li>
					<li>
						<strong>Twitter Images:</strong> 1200x600px works best for Twitter
						Cards
					</li>
					<li>
						<strong>Description:</strong> Between 150-160 characters is ideal
						for Google
					</li>
					<li>
						<strong>Title:</strong> Maximum 60 characters to avoid truncation in
						results
					</li>
					<li>
						<strong>Keywords:</strong> 5-10 relevant keywords is sufficient
					</li>
				</ul>

				<div className="w-full flex items-center gap-8">
					<Button variant="link" asChild>
						<Link
							href="https://www.newcopy.ai/m/tools"
							target="_blank"
							rel="noopener noreferrer"
						>
							AI Marketing Tools
							<ArrowUpRight size={16} />
						</Link>
					</Button>

					<Button variant="link" asChild>
						<Link
							href="https://www.cleanmyseo.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Clean My SEO
							<ArrowUpRight size={16} />
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}

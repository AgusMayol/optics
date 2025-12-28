"use client";
import * as React from "react";
import { Badge } from "@/registry/optics/badge";
import { Button } from "@/registry/optics/button";
import { Separator } from "@/registry/optics/separator";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/optics/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/optics/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
	CodeBlockFilename,
} from "@/registry/optics/code-block";

// Code examples data
const serverComponentsCode = [
	{
		language: "jsx",
		filename: "app/products/page.jsx",
		code: `// Server Component (default in Next.js 16)
// Runs on the server, not sent to client
import { db } from '@/lib/db';

export default async function ProductsPage() {
  // This function runs on the server
  const products = await db.products.findMany();
  
  return (
    <div>
      <h1>Products</h1>
      <ProductsList products={products} />
    </div>
  );
}

// Child component is also Server Component by default
async function ProductsList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </li>
      ))}
    </ul>
  );
}`,
	},
];

const clientComponentsCode = [
	{
		language: "jsx",
		filename: "app/components/InteractiveButton.jsx",
		code: `"use client"; // Required for interactivity

import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button 
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
    >
      Clicks: {count}
    </button>
  );
}

// DON'T use "use client" if you don't need interactivity
// Server Components are faster and reduce bundle size`,
	},
];

const dynamicImportsCode = [
	{
		language: "jsx",
		filename: "app/components/HeavyComponent.jsx",
		code: `import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy loading with loading state
const HeavyChart = dynamic(() => import('./Chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Disable SSR if not needed
});

// With named exports
const HeavyEditor = dynamic(
  () => import('./Editor').then(mod => ({ default: mod.Editor })),
  { loading: () => <p>Loading editor...</p> }
);

// With Suspense for better control
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}`,
	},
];

const reactCompilerCode = [
	{
		language: "js",
		filename: "next.config.ts",
		code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler (Next.js 16+)
  reactCompiler: true,
  
  // Or advanced configuration:
  // reactCompiler: {
  //   compilationMode: 'annotation', // or 'infer'
  // },
};

export default nextConfig;`,
	},
	{
		language: "jsx",
		filename: "app/components/OptimizedComponent.jsx",
		code: `// React Compiler automatically optimizes this component
// You don't need useMemo, useCallback manually

export function ProductList({ products, filter }) {
  // Compiler optimizes this automatically
  const filteredProducts = products.filter(p => 
    p.category === filter
  );
  
  // Also optimizes callbacks automatically
  const handleClick = (id) => {
    console.log('Product clicked:', id);
  };
  
  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id} onClick={() => handleClick(product.id)}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}

// Compiler detects dependencies and memoizes automatically
// You no longer need to write useMemo/useCallback manually`,
	},
];

const cacheCode = [
	{
		language: "jsx",
		filename: "app/products/page.jsx",
		code: `import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// React cache for request deduplication
const getProduct = cache(async (id) => {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  return res.json();
});

// Next.js cache with revalidation
const getCachedProducts = unstable_cache(
  async () => {
    const res = await fetch('https://api.example.com/products');
    return res.json();
  },
  ['products'], // cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['products'], // For on-demand revalidation
  }
);

export default async function ProductsPage() {
  // Multiple calls to getProduct with same id
  // only make one real request (deduplication)
  const product1 = await getProduct(1);
  const product2 = await getProduct(1); // Uses cache
  
  const products = await getCachedProducts();
  
  return <div>{/* ... */}</div>;
}`,
	},
	{
		language: "jsx",
		filename: "app/api/revalidate/route.js",
		code: `import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// On-demand revalidation
export async function POST(request) {
  const { tag } = await request.json();
  
  revalidateTag(tag); // Revalidate cache with this tag
  
  return NextResponse.json({ revalidated: true });
}

// Usage:
// POST /api/revalidate
// Body: { "tag": "products" }`,
	},
];

const fetchCacheCode = [
	{
		language: "jsx",
		filename: "app/data/page.jsx",
		code: `// Fetch with automatic caching
export default async function DataPage() {
  // Default cache (force-cache)
  const staticData = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Indefinite cache
  });
  
  // Revalidation every 60 seconds
  const revalidatedData = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 },
  });
  
  // Revalidation with tags
  const taggedData = await fetch('https://api.example.com/data', {
    next: { 
      revalidate: 3600,
      tags: ['data'],
    },
  });
  
  // No cache (always fresh)
  const freshData = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  });
  
  // Cache only at build time
  const buildTimeData = await fetch('https://api.example.com/data', {
    next: { revalidate: false },
  });
  
  const data = await staticData.json();
  
  return <div>{/* ... */}</div>;
}`,
	},
];

const loadingFilesCode = [
	{
		language: "jsx",
		filename: "app/dashboard/page.jsx",
		code: `import { Suspense } from 'react';

// Page component with async data
export default async function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Renders immediately */}
      <Header />
      
      {/* Renders when data is ready */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
      
      {/* Another independent block */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
    </div>
  );
}

async function DashboardContent() {
  // This call might be slow
  const data = await fetch('https://api.example.com/dashboard', {
    cache: 'no-store',
  }).then(r => r.json());
  
  return <div>{/* ... */}</div>;
}

async function Stats() {
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store',
  }).then(r => r.json());
  
  return <div>{/* ... */}</div>;
}`,
	},
	{
		language: "jsx",
		filename: "app/dashboard/loading.jsx",
		code: `// Loading UI file (Next.js 16+)
// Automatically shown while page.tsx is loading
// This is the recommended approach in Next.js 16

export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

// Benefits of loading.jsx:
// - Automatically wraps page in Suspense boundary
// - Shows immediately while page loads
// - Better UX than manual Suspense fallbacks
// - Works with streaming and partial prerendering`,
	},
];

const imageOptimizationCode = [
	{
		language: "jsx",
		filename: "app/components/ProductImage.jsx",
		code: `import Image from 'next/image';

// Automatic image optimization
export function ProductImage({ src, alt, width, height }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // Lazy loading by default
      loading="lazy"
      
      // Placeholder while loading
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      
      // Priority for above-the-fold images
      priority={false}
      
      // Modern formats automatically
      // Next.js serves WebP/AVIF automatically
      
      // Responsive images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

// For above-the-fold images
export function HeroImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      priority // Load immediately
      quality={90}
    />
  );
}`,
	},
];

const bundleOptimizationCode = [
	{
		language: "jsx",
		filename: "app/components/IconButton.jsx",
		code: `// Imports only what you need
import { Heart, Star, Share } from 'lucide-react';

export function IconButton({ icon }) {
  const Icon = icon === 'heart' ? Heart : Star;
  return <Icon className="w-5 h-5" />;
}

// For large libraries, use dynamic imports
const HeavyLibrary = dynamic(() => import('heavy-library'));`,
	},
	{
		language: "js",
		filename: "next.config.ts",
		code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
    ],
  },
  
  // Bundle analysis
  // Run: next build --analyze
  // Or install: @next/bundle-analyzer
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Improved tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    return config;
  },
};

export default nextConfig;`,
	},
];

const partialPrerenderingCode = [
	{
		language: "jsx",
		filename: "app/products/[id]/page.jsx",
		code: `import { Suspense } from 'react';

// Partial Prerendering (Next.js 16+)
// Renders static part immediately
// and streams dynamic part

export default function ProductPage({ params }) {
  return (
    <div>
      {/* This part is prerendered statically */}
      <ProductHeader />
      <ProductDescription />
      
      {/* This part is streamed dynamically */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={params.id} />
      </Suspense>
      
      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedProducts productId={params.id} />
      </Suspense>
    </div>
  );
}

// Static components (prerendered)
function ProductHeader() {
  return <header>{/* ... */}</header>;
}

// Dynamic components (streamed)
async function ProductReviews({ productId }) {
  const reviews = await fetch(
    \`https://api.example.com/products/\${productId}/reviews\`,
    { cache: 'no-store' }
  ).then(r => r.json());
  
  return <div>{/* ... */}</div>;
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">Performance</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					Next.js 16 introduces significant performance improvements with React
					Compiler, better Server Components support, and new caching
					strategies. This guide covers best practices to maximize your
					application's performance.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 lg:gap-24 p-6 lg:p-12 pt-4">
				{/* 1. Server Components */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/server-and-client-components"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											1
										</Badge>
										Server Components (Default)
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						In Next.js 16, all components are Server Components by default. They
						run on the server, reduce client bundle size, and improve initial
						performance. Only use{" "}
						<Badge variant="outline" className="text-xs font-mono">
							"use client"
						</Badge>{" "}
						when you need interactivity.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="server-components-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Server Components Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={serverComponentsCode}
											defaultValue={serverComponentsCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`server-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 2. Client Components */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/server-and-client-components"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											2
										</Badge>
										Client Components (Only When Needed)
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use Client Components only for interactivity (events, state,
						effects). Each Client Component increases bundle size. Keep business
						logic in Server Components whenever possible.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="client-components-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Client Component Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={clientComponentsCode}
											defaultValue={clientComponentsCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`client-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 3. Dynamic Imports */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/guides/lazy-loading"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											3
										</Badge>
										Dynamic Imports & Code Splitting
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use dynamic imports to load heavy components only when needed. This
						reduces the initial bundle and improves Time to Interactive.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="dynamic-imports-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Dynamic Import Examples
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={dynamicImportsCode}
											defaultValue={dynamicImportsCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`dynamic-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 4. React Compiler */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://react.dev/learn/react-compiler"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											4
										</Badge>
										React Compiler
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						The React Compiler automatically optimizes your components,
						memoizing values and callbacks without needing{" "}
						<Badge variant="outline" className="text-xs font-mono">
							useMemo
						</Badge>{" "}
						or{" "}
						<Badge variant="outline" className="text-xs font-mono">
							useCallback
						</Badge>
						. Available in Next.js 16+.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="react-compiler-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										React Compiler Setup
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={reactCompilerCode}
											defaultValue={reactCompilerCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 bg-sidebar flex items-center justify-between p-1">
												<CodeBlockSelect>
													<CodeBlockSelectTrigger>
														<CodeBlockSelectValue />
													</CodeBlockSelectTrigger>
													<CodeBlockSelectContent>
														{(item) => (
															<CodeBlockSelectItem
																key={item.filename}
																value={item.filename}
															>
																{item.filename}
															</CodeBlockSelectItem>
														)}
													</CodeBlockSelectContent>
												</CodeBlockSelect>
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`compiler-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 5. Cache Strategies */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/guides/caching"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											5
										</Badge>
										Cache Strategies
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Next.js 16 offers multiple cache levels: React cache for
						deduplication, Next.js cache for data, and on-demand revalidation
						with tags.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="cache-codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Cache Examples
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={cacheCode}
											defaultValue={cacheCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 bg-sidebar flex items-center justify-between p-1">
												<CodeBlockSelect>
													<CodeBlockSelectTrigger>
														<CodeBlockSelectValue />
													</CodeBlockSelectTrigger>
													<CodeBlockSelectContent>
														{(item) => (
															<CodeBlockSelectItem
																key={item.filename}
																value={item.filename}
															>
																{item.filename}
															</CodeBlockSelectItem>
														)}
													</CodeBlockSelectContent>
												</CodeBlockSelect>
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`cache-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 6. Fetch Cache */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/caching-and-revalidating"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											6
										</Badge>
										Fetch Cache & Revalidation
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Next.js automatically caches fetch responses. Configure time-based
						revalidation (ISR) or tag-based revalidation to keep data fresh.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="fetch-cache-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Fetch Cache Options
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={fetchCacheCode}
											defaultValue={fetchCacheCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`fetch-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 7. Loading Files & Streaming */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/loading-ui-and-streaming"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											7
										</Badge>
										Loading Files & Streaming
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Next.js 16 recommends using separate{" "}
						<Badge variant="outline" className="text-xs font-mono">
							loading.jsx
						</Badge>{" "}
						files alongside{" "}
						<Badge variant="outline" className="text-xs font-mono">
							page.jsx
						</Badge>
						. This automatically wraps your page in a Suspense boundary,
						improving Time to First Byte (TTFB) and allowing users to see
						content while other parts load.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="loading-files-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Loading Files Pattern
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={loadingFilesCode}
											defaultValue={loadingFilesCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 bg-sidebar flex items-center justify-between p-1">
												<CodeBlockSelect>
													<CodeBlockSelectTrigger>
														<CodeBlockSelectValue />
													</CodeBlockSelectTrigger>
													<CodeBlockSelectContent>
														{(item) => (
															<CodeBlockSelectItem
																key={item.filename}
																value={item.filename}
															>
																{item.filename}
															</CodeBlockSelectItem>
														)}
													</CodeBlockSelectContent>
												</CodeBlockSelect>
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`loading-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 8. Image Optimization */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/images"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											8
										</Badge>
										Image Optimization
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Next.js Image component automatically optimizes images, serving
						modern formats (WebP/AVIF), lazy loading, and responsive images.
						Significantly reduces image sizes.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="image-optimization-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Image Optimization
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={imageOptimizationCode}
											defaultValue={imageOptimizationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`image-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 9. Bundle Optimization */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/guides/production-checklist#bundle-analysis"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											9
										</Badge>
										Bundle Optimization
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Reduce bundle sizes by importing only what's needed, using tree
						shaking, and analyzing bundle sizes with tools like bundle-analyzer.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="bundle-optimization-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Bundle Optimization Techniques
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={bundleOptimizationCode}
											defaultValue={bundleOptimizationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 bg-sidebar flex items-center justify-between p-1">
												<CodeBlockSelect>
													<CodeBlockSelectTrigger>
														<CodeBlockSelectValue />
													</CodeBlockSelectTrigger>
													<CodeBlockSelectContent>
														{(item) => (
															<CodeBlockSelectItem
																key={item.filename}
																value={item.filename}
															>
																{item.filename}
															</CodeBlockSelectItem>
														)}
													</CodeBlockSelectContent>
												</CodeBlockSelect>
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`bundle-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

				{/* 10. Partial Prerendering */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/cache-components"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											10
										</Badge>
										Partial Prerendering (PPR)
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Partial Prerendering combines the best of SSG and SSR: prerenders
						static parts and streams dynamic parts. Improves initial performance
						while maintaining dynamic content.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value="partial-prerendering-codeblock"
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Partial Prerendering Example
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={partialPrerenderingCode}
											defaultValue={partialPrerenderingCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={`ppr-${item.language}-${item.filename}`}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar text-[13px]"
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

			<Separator decoration />

			{/* Best Practices & Resources */}
			<div className="w-full flex flex-col items-start justify-start gap-12 p-6 lg:p-12 pt-4">
				<div className="w-full flex flex-col gap-8">
					<h3 className="text-xl font-semibold">Best Practices</h3>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>1. Prioritize Server Components</CardTitle>
								<CardDescription>
									Use Server Components by default and Client Components only
									when you need interactivity
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Reduces client bundle size</p>
								<p>• Improves initial performance</p>
								<p>• Direct access to APIs and databases</p>
								<p>• Better SEO and load time</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>2. Use Cache Strategically</CardTitle>
								<CardDescription>
									Leverage React cache and Next.js cache to reduce redundant
									requests
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• React cache for deduplication</p>
								<p>• Next.js cache with revalidation</p>
								<p>• Tags for on-demand revalidation</p>
								<p>• Configure appropriate revalidation times</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>3. Implement Loading Files</CardTitle>
								<CardDescription>
									Use loading.jsx files alongside page.jsx for automatic
									Suspense boundaries and better TTFB
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Automatic Suspense wrapping</p>
								<p>• Shows immediately while page loads</p>
								<p>• Better UX than manual fallbacks</p>
								<p>• Works with streaming and PPR</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>4. Optimize Bundles</CardTitle>
								<CardDescription>
									Reduce bundle sizes with selective imports and code splitting
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Import only what's needed</p>
								<p>• Use dynamic imports for heavy code</p>
								<p>• Analyze bundles regularly</p>
								<p>• Leverage tree shaking</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="w-full flex flex-wrap items-center gap-8">
					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://nextjs.org/docs/app/guides/production-checklist"
								target="_blank"
								rel="noopener noreferrer"
							>
								Next.js Optimization Docs
								<ArrowUpRight size={16} />
							</Link>
						}
					/>

					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://react.dev/learn/react-compiler"
								target="_blank"
								rel="noopener noreferrer"
							>
								React Compiler
								<ArrowUpRight size={16} />
							</Link>
						}
					/>

					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://web.dev/vitals/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Core Web Vitals
								<ArrowUpRight size={16} />
							</Link>
						}
					/>
				</div>
			</div>
		</main>
	);
}

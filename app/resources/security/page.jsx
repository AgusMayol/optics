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
} from "@/registry/optics/code-block";

// Code examples data
const cspProxyCode = [
	{
		language: "js",
		filename: "proxy.js",
		code: `import { NextResponse } from 'next/server';

export function proxy(request) {
  // Generate unique nonce for each request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';

  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic' \${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' \${isDev ? "'unsafe-inline'" : \`'nonce-\${nonce}'\`};
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  \`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  
  response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};`,
	},
];

const envVariablesCode = [
	{
		language: "bash",
		filename: ".env.local",
		code: `# Database credentials - NEVER commit to git
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# API Keys - Use Vercel's sensitive environment variables
STRIPE_SECRET_KEY="sk_live_..."
OPENAI_API_KEY="sk-..."

# Public variables (can be exposed to browser)
NEXT_PUBLIC_API_URL="https://api.example.com"

# Auth secrets - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# Vercel automatically provides these:
# VERCEL_URL - Deployment URL
# VERCEL_ENV - Environment (production, preview, development)`,
	},
	{
		language: "js",
		filename: "next.config.js",
		code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure env variables are validated at build time
  env: {
    // Only add non-sensitive public vars here
  },
  
  // Configure allowed image domains
  images: {
    domains: ['trusted-cdn.com', 'yourdomain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

module.exports = nextConfig;`,
	},
];

const authProxyCode = [
	{
		language: "js",
		filename: "proxy.js - Authentication",
		code: `import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Protect API routes
  if (request.nextUrl.pathname.startsWith('/api/protected')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}

export const config = {
  matcher: ['/api/protected/:path*', '/admin/:path*'],
};`,
	},
];

const sanitizationCode = [
	{
		language: "jsx",
		filename: "app/api/posts/route.js",
		code: `import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// Validation schema
const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  authorId: z.string().uuid(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = PostSchema.parse(body);
    
    // Sanitize HTML content to prevent XSS
    const sanitizedContent = DOMPurify.sanitize(validatedData.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
      ALLOWED_ATTR: ['href'],
    });
    
    // Save to database with parameterized queries
    const post = await db.post.create({
      data: {
        title: validatedData.title,
        content: sanitizedContent,
        authorId: validatedData.authorId,
      },
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    // Don't expose internal errors
    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
	},
];

const rateLimitingCode = [
	{
		language: "js",
		filename: "lib/rate-limit.js",
		code: `import { LRUCache } from 'lru-cache';

// Rate limiter with LRU cache
export function rateLimit(options = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        
        tokenCount[0] += 1;
        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        
        return isRateLimited ? reject() : resolve();
      }),
  };
}

// Usage in API route
import { NextResponse } from 'next/server';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  
  try {
    await limiter.check(10, ip); // 10 requests per minute
    
    // Your API logic here
    return NextResponse.json({ data: 'success' });
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
}`,
	},
];

const vercelSecurityCode = [
	{
		language: "bash",
		filename: "Terminal",
		code: `# Install Vercel CLI
npm i -g vercel

# Set sensitive environment variables via CLI
vercel env add DATABASE_URL
# Select environment: Production, Preview, Development
# Type: sensitive (encrypted and non-readable)

# Configure Vercel Firewall (Enterprise)
# Enable firewall protection against common attacks:
# - SQL Injection
# - Cross-Site Scripting (XSS)
# - Scanner Detection
# - Local File Inclusion (LFI)

# View deployment logs for security monitoring
vercel logs <deployment-url>

# Enable Attack Challenge Mode
# Go to: Project Settings > Security > Attack Challenge Mode`,
	},
	{
		language: "json",
		filename: "vercel.json",
		code: `{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}`,
	},
];

const csrfProtectionCode = [
	{
		language: "js",
		filename: "app/api/csrf/route.js",
		code: `import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

// Generate CSRF token
export async function GET() {
  const token = randomBytes(32).toString('hex');
  
  const response = NextResponse.json({ csrfToken: token });
  
  // Set CSRF token in httpOnly cookie
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
  });
  
  return response;
}`,
	},
	{
		language: "js",
		filename: "proxy.js - CSRF",
		code: `import { NextResponse } from 'next/server';

export function proxy(request) {
  // Verify CSRF token for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfTokenFromCookie = request.cookies.get('csrf-token')?.value;
    const csrfTokenFromHeader = request.headers.get('x-csrf-token');
    
    if (!csrfTokenFromCookie || csrfTokenFromCookie !== csrfTokenFromHeader) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};`,
	},
];

const secureAuthCode = [
	{
		language: "js",
		filename: "app/api/auth/[...nextauth]/route.js",
		code: `import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, email: user.email, role: user.role };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`,
	},
];

const dependencySecurityCode = [
	{
		language: "json",
		filename: "package.json",
		code: `{
  "name": "secure-nextjs-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "check-updates": "npx npm-check-updates"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.0.0"
  }
}`,
	},
	{
		language: "bash",
		filename: "Terminal - Security Audits",
		code: `# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force

# Check for outdated packages
npm outdated

# Update packages safely
npx npm-check-updates -u

# Use Snyk for advanced security scanning
npx snyk test

# Enable GitHub Dependabot
# Create .github/dependabot.yml for automated updates`,
	},
];

const secureCookiesCode = [
	{
		language: "js",
		filename: "app/api/set-cookie/route.js",
		code: `import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json({ success: true });
  
  // Secure cookie configuration
  response.cookies.set('session', 'your-session-token', {
    httpOnly: true,        // Prevents JavaScript access
    secure: true,          // Only sent over HTTPS
    sameSite: 'strict',    // CSRF protection
    maxAge: 60 * 60 * 24,  // 1 day
    path: '/',
  });
  
  return response;
}`,
	},
	{
		language: "js",
		filename: "lib/session.js",
		code: `import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET
);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}`,
	},
];

const sqlInjectionPreventionCode = [
	{
		language: "js",
		filename: "app/api/users/route.js",
		code: `import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  // ❌ BAD: Vulnerable to SQL injection
  // const user = await prisma.$queryRawUnsafe(
  //   \`SELECT * FROM users WHERE email = '\${email}'\`
  // );
  
  // ✅ GOOD: Use Prisma's type-safe queries
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      email: true,
      name: true,
      // Don't select sensitive fields like password
    },
  });
  
  return NextResponse.json(user);
}

// ✅ GOOD: Using parameterized queries if needed
export async function POST(request) {
  const { name, email } = await request.json();
  
  // Parameterized query prevents SQL injection
  const user = await prisma.$queryRaw\`
    SELECT * FROM users 
    WHERE name = \${name} AND email = \${email}
  \`;
  
  return NextResponse.json(user);
}`,
	},
];

const securityHeadersCode = [
	{
		language: "js",
		filename: "next.config.js",
		code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trusted-cdn.com',
      },
    ],
  },
};

module.exports = nextConfig;`,
	},
];

const serverActionsSecurityCode = [
	{
		language: "js",
		filename: "app/actions/user.js",
		code: `'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
});

export async function updateProfile(formData) {
  // 1. Verify authentication
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }
  
  // 2. Validate input
  const rawData = {
    name: formData.get('name'),
    bio: formData.get('bio'),
  };
  
  const validatedData = UpdateProfileSchema.parse(rawData);
  
  // 3. Check authorization
  const user = await db.user.findUnique({
    where: { id: session.userId },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // 4. Perform action
  await db.user.update({
    where: { id: session.userId },
    data: validatedData,
  });
  
  // 5. Revalidate cache
  revalidatePath('/profile');
  
  return { success: true };
}`,
	},
];

const sourceMapsSecurityCode = [
	{
		language: "js",
		filename: "next.config.js",
		code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Additional security configurations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Disable source maps for client-side production builds
      config.devtool = false;
    }
    
    return config;
  },
};

module.exports = nextConfig;`,
	},
	{
		language: "bash",
		filename: ".gitignore",
		code: `# Dependencies
node_modules/

# Next.js
.next/
out/

# Source maps (never commit these)
*.map
*.js.map
*.css.map

# Environment variables
.env
.env.local
.env.production.local
.env.development.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel`,
	},
	{
		language: "json",
		filename: "vercel.json",
		code: `{
  "build": {
    "env": {
      "GENERATE_SOURCEMAP": "false"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    },
    {
      "source": "/:path*.map",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}`,
	},
];

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-128px)] flex flex-col flex-1 gap-8 bg-background">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-4">
				<h1 className="text-32 tracking-tight! truncate">Security</h1>
				<p className="text-muted-foreground text-20 font-normal! text-pretty">
					Security is fundamental in modern web applications. This guide
					provides practical examples and proven patterns to protect your
					Next.js application deployed on Vercel, based on official
					documentation and industry best practices.
				</p>
			</div>

			<Separator decoration />

			<div className="flex flex-col items-start justify-start gap-12 lg:gap-24 p-6 lg:p-12 pt-4">
				{/* 1. Content Security Policy (CSP) */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/guides/content-security-policy"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											1
										</Badge>
										Content Security Policy (CSP)
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						CSP is essential to protect against XSS attacks, clickjacking, and
						code injection. Implement CSP with nonces in Next.js for enhanced
						security.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className=" px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										CSP Implementation with Proxy
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={cspProxyCode}
											defaultValue={cspProxyCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 2. Environment Variables */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://vercel.com/docs/environment-variables/sensitive-environment-variables"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											2
										</Badge>
										Secure Environment Variables
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Handle secrets and credentials securely with environment variables.
						Vercel offers encrypted sensitive variables that are never exposed.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Variables Configuration
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={envVariablesCode}
											defaultValue={envVariablesCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 3. Authentication & Proxy */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/api-reference/file-conventions/proxy"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											3
										</Badge>
										Authentication with Proxy
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Protect routes and APIs with Proxy (formerly Middleware in Next.js
						15). Verify authentication, authorization, and add security headers
						on every request.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Security Proxy
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={authProxyCode}
											defaultValue={authProxyCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 4. Input Sanitization & Validation */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											4
										</Badge>
										Input Sanitization & Validation
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Validate and sanitize all user inputs. Use validation schemas and
						sanitize HTML to prevent XSS attacks.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Validation with Zod & DOMPurify
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={sanitizationCode}
											defaultValue={sanitizationCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 5. Rate Limiting */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://vercel.com/docs/security/rate-limiting"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											5
										</Badge>
										Rate Limiting
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Protect your APIs against abuse and DDoS attacks by implementing
						rate limiting. Limit the number of requests per IP or user within a
						time period.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Rate Limiter Implementation
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={rateLimitingCode}
											defaultValue={rateLimitingCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 6. Vercel Security Features */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://vercel.com/docs/security"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											6
										</Badge>
										Vercel Security Features
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Vercel provides multiple security layers: Firewall, DDoS protection,
						encrypted sensitive variables, and automatic HTTPS on all
						deployments.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Vercel Configuration
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={vercelSecurityCode}
											defaultValue={vercelSecurityCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 7. CSRF Protection */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											7
										</Badge>
										CSRF Protection
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Protect against Cross-Site Request Forgery attacks using CSRF
						tokens. Verify the authenticity of each request that modifies data.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										CSRF Tokens Implementation
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={csrfProtectionCode}
											defaultValue={csrfProtectionCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 8. Dependency Security */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://docs.npmjs.com/cli/v8/commands/npm-audit"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											8
										</Badge>
										Dependency Security
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Keep your dependencies updated and free from vulnerabilities. Use
						npm audit, Snyk, or Dependabot to detect and fix issues.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Dependency Audit
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={dependencySecurityCode}
											defaultValue={dependencySecurityCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 9. Secure Cookies & Sessions */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											9
										</Badge>
										Secure Cookies & Sessions
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Configure cookies with security flags. Use httpOnly, secure, and
						sameSite to protect against XSS and CSRF.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Secure Cookies Configuration
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={secureCookiesCode}
											defaultValue={secureCookiesCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 10. SQL Injection Prevention */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											10
										</Badge>
										SQL Injection Prevention
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Use ORMs like Prisma or parameterized queries to prevent SQL
						injection. Never concatenate strings directly in queries.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Secure Prisma Usage
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={sqlInjectionPreventionCode}
											defaultValue={sqlInjectionPreventionCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 11. Security Headers */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/api-reference/config/next-config-js/headers"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											11
										</Badge>
										Security Headers
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Configure security headers in next.config.js. Include HSTS,
						X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										next.config.js with Security Headers
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={securityHeadersCode}
											defaultValue={securityHeadersCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 12. Server Actions Security */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/getting-started/updating-data"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											12
										</Badge>
										Server Actions Security
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Server Actions must validate authentication and authorization.
						Always validate inputs and verify user permissions.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Secure Server Action
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={serverActionsSecurityCode}
											defaultValue={serverActionsSecurityCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

				{/* 13. Source Maps Security */}
				<div className="flex flex-col gap-4 w-full">
					<div className="flex items-center justify-between">
						<Button
							nativeButton={false}
							variant="link"
							className="gap-1"
							render={
								<Link
									href="https://nextjs.org/docs/app/api-reference/config/next-config-js/productionBrowserSourceMaps"
									target="_blank"
									rel="noopener noreferrer"
								>
									<h2 className="text-xl lg:text-[24px] leading-[1.2] tracking-[-0.02em] font-bold flex items-center gap-3 pb-4 break-words">
										<Badge
											variant="outline"
											className="tabular-nums aspect-square squircle-none rounded-sm"
										>
											13
										</Badge>
										Source Maps Security
									</h2>
									<ArrowUpRight size={16} className="mb-4" />
								</Link>
							}
						/>
					</div>
					<p className="text-muted-foreground text-sm lg:leading-7">
						Disable source maps in production to prevent exposing your original
						source code. Source maps reveal your application's internal
						structure and logic, making it easier for attackers to find
						vulnerabilities.
					</p>
					<Card className="pt-0 pb-0 bg-background">
						<CardFooter className="px-0 py-0 pt-0! -mb-0! rounded-b-xl">
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem value="codeblock" className="rounded-b-xl">
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-panel-open]>svg]:rotate-360 hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										Disable Source Maps in Production
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={sourceMapsSecurityCode}
											defaultValue={sourceMapsSecurityCode[0].filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton />
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={item.filename}
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

			{/* Security Principles & Resources */}
			<div className="w-full flex flex-col items-start justify-start gap-12 p-12 pt-4">
				<div className="w-full flex flex-col gap-8">
					<h3 className="text-xl font-semibold">
						Fundamental Security Principles
					</h3>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>1. Defense in Depth</CardTitle>
								<CardDescription>
									Multiple security layers to protect the application
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Implement CSP, CSRF, and rate limiting</p>
								<p>• Use multiple authentication methods</p>
								<p>• Validate on both client and server</p>
								<p>• Monitor logs and set up alerts</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>2. Least Privilege</CardTitle>
								<CardDescription>
									Grant only the minimum permissions necessary
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Users only access what they need</p>
								<p>• APIs and services with limited permissions</p>
								<p>• Environment variables only where required</p>
								<p>• Review permissions regularly</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>3. Input Validation</CardTitle>
								<CardDescription>Never trust user data</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Validate and sanitize all inputs</p>
								<p>• Use validation schemas (Zod, Yup)</p>
								<p>• Implement HTML sanitization</p>
								<p>• Prevent SQL injection and XSS</p>
							</CardContent>
						</Card>

						<Card className="w-full" decorations>
							<CardHeader>
								<CardTitle>4. Keep it Updated</CardTitle>
								<CardDescription>
									Keep everything updated and monitored
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm space-y-2">
								<p>• Update dependencies regularly</p>
								<p>• Use audit tools (npm audit, Snyk)</p>
								<p>• Apply security patches quickly</p>
								<p>• Monitor known vulnerabilities</p>
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
								href="https://cheatsheetseries.owasp.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								OWASP Cheat Sheets
								<ArrowUpRight size={16} />
							</Link>
						}
					/>

					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://nextjs.org/docs/app/guides/content-security-policy"
								target="_blank"
								rel="noopener noreferrer"
							>
								Next.js Security
								<ArrowUpRight size={16} />
							</Link>
						}
					/>

					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://vercel.com/docs/security"
								target="_blank"
								rel="noopener noreferrer"
							>
								Vercel Security
								<ArrowUpRight size={16} />
							</Link>
						}
					/>

					<Button
						nativeButton={false}
						variant="link"
						render={
							<Link
								href="https://web.dev/security/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Web.dev Security
								<ArrowUpRight size={16} />
							</Link>
						}
					/>
				</div>
			</div>
		</main>
	);
}

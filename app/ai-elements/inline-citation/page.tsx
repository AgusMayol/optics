"use client";
import { ComponentConfig, type ComponentConfigData } from "@/app/components/layout";
import type { ManualFile } from "@/components/installation-guide";
import {
	InlineCitation,
	InlineCitationCard,
	InlineCitationCardBody,
	InlineCitationCardTrigger,
	InlineCitationQuote,
	InlineCitationSource,
	InlineCitationText,
} from "@/registry/optics/ai-elements/inline-citation";
import generatedProps from "@/registry/optics/dist/ai-elements/inline-citation.json";
import componentCode from "@/registry/optics/dist/ai-elements/inline-citation.tsx.txt";

const componentFiles: ManualFile[] = [
	{
		path: "@/components/optics/ai-elements/inline-citation.tsx",
		code: componentCode,
	},
];

const demoComponent = (
	<div className="flex w-full max-w-xl flex-col gap-3 rounded-xl border bg-card p-6 text-card-foreground">
		<p className="text-sm leading-7">
			Modern App Router workflows{" "}
			<InlineCitation>
				<InlineCitationText>
					keep server-only data fetching out of the client JavaScript bundle
				</InlineCitationText>{" "}
				<InlineCitationCard>
					<InlineCitationCardTrigger
						sources={[
							"https://nextjs.org/docs/app/getting-started/server-and-client-components",
							"https://react.dev/reference/rsc/server-components",
							"https://react.dev/blog/2024/12/05/react-19",
						]}
					/>
					<InlineCitationCardBody>
						<InlineCitationSource
							title="Server and Client Components"
							url="https://nextjs.org/docs/app/getting-started/server-and-client-components"
							description="How Next.js splits rendering across server layouts and interactive client leaves."
						/>
						<InlineCitationQuote>
							Server Components execute ahead of time on the server and never ship their
							dependencies to the browser.
						</InlineCitationQuote>
						<InlineCitationSource
							title="React Server Components"
							url="https://react.dev/reference/rsc/server-components"
							description="Reference specification for async server rendering and client module boundaries."
						/>
						<InlineCitationQuote>
							Use Client Components only at interactive boundaries where state or browser APIs are
							required.
						</InlineCitationQuote>
						<InlineCitationSource
							title="React 19 Release Notes"
							url="https://react.dev/blog/2024/12/05/react-19"
							description="Overview of React 19 transitions, actions, and server component integration."
						/>
						<InlineCitationQuote>
							Actions and transitions coordinate async UI updates without manual pending
							boilerplate.
						</InlineCitationQuote>
					</InlineCitationCardBody>
				</InlineCitationCard>
			</InlineCitation>{" "}
			while{" "}
			<InlineCitation>
				<InlineCitationText>
					hover preview cards remain keyboard accessible and collision-aware
				</InlineCitationText>{" "}
				<InlineCitationCard>
					<InlineCitationCardTrigger
						sources={[
							"https://base-ui.com/react/components/preview-card",
							"https://ui.shadcn.com/docs/ai-elements/base/inline-citation",
						]}
					/>
					<InlineCitationCardBody>
						<InlineCitationSource
							title="Base UI Preview Card"
							url="https://base-ui.com/react/components/preview-card"
							description="Floating hover card primitive with pointer intent delays and viewport positioning."
						/>
						<InlineCitationQuote>
							Preview Card opens on hover or focus with configurable open and close delays.
						</InlineCitationQuote>
						<InlineCitationSource
							title="AI Inline Citation"
							url="https://ui.shadcn.com/docs/ai-elements/base/inline-citation"
							description="Composable inline attribution pill and multi-source carousel pattern."
						/>
						<InlineCitationQuote>
							Pair citation claims with paged sources so readers can verify quotes without leaving
							the response.
						</InlineCitationQuote>
					</InlineCitationCardBody>
				</InlineCitationCard>
			</InlineCitation>
			.
		</p>
		<p className="text-xs text-muted-foreground">
			Hover any citation pill to inspect quotes and cycle through sources.
		</p>
	</div>
);

const componentConfig: ComponentConfigData = {
	header: {
		title: "Inline Citation",
		description:
			"Inline source attribution pill with a hover card carousel for inspecting quotes and URLs.",
		href: "https://ui.shadcn.com/docs/ai-elements/base/inline-citation",
		hrefText: "shadcn/ui",
	},
	content: {
		children: demoComponent,
		imports: `import {
	InlineCitation,
	InlineCitationCard,
	InlineCitationCardBody,
	InlineCitationCardTrigger,
	InlineCitationQuote,
	InlineCitationSource,
	InlineCitationText,
} from "@/components/optics/ai-elements/inline-citation";`,
		filename: "inline-citation.tsx",
	},
	installation: {
		componentName: "ai-inline-citation",
		dependencies: "lucide-react",
		manualFiles: componentFiles,
	},
	props: generatedProps,
};

export default function Page() {
	return <ComponentConfig config={componentConfig}>{null}</ComponentConfig>;
}

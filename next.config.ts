import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
	htmlLimitedBots: /.*/,
	reactCompiler: true,
	experimental: {
		viewTransition: true,
	},
};

const withVercelToolbar = createWithVercelToolbar();
export default withVercelToolbar(nextConfig);

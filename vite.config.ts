import { defineConfig } from "vite-plus";

export default defineConfig({
	fmt: {
		useTabs: true,
		singleQuote: false,
		ignorePatterns: [".next/**", "public/r/**", "registry/optics/dist/**"],
	},
	lint: {
		plugins: ["eslint", "typescript", "react", "nextjs"],
		ignorePatterns: [".next/**", "public/r/**", "registry/optics/dist/**"],
	},
	run: {
		tasks: {
			"pipeline:prepare": {
				command: "bun run registry:build",
				dependsOn: ["sync:sources", "extract-props"],
			},
			"pipeline:dev": {
				command: "bun --bun next dev",
				dependsOn: ["sync:sources", "extract-props"],
				cache: false,
			},
			"pipeline:build": {
				command: "next build",
				dependsOn: ["sync:sources", "extract-props", "registry:build"],
				cache: {
					input: [
						"app/**",
						"components/**",
						"hooks/**",
						"lib/**",
						"public/**",
						"registry/**",
						"!public/r/**",
						"*.{js,jsx,ts,tsx}",
						"next.config.ts",
						"tsconfig.json",
						"package.json",
						"registry.json",
					],
					output: [".next/**", "registry/optics/dist/**"],
				},
			},
		},
	},
});

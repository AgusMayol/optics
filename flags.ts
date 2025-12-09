import { flag } from "flags/next";
import { growthbookAdapter } from "@flags-sdk/growthbook";

export const registryPrefixFlag = flag({
	key: "registry-prefix-flag",
	description: "Whether to use the registry prefix namespace.",
	defaultValue: false,
	adapter: growthbookAdapter.feature<boolean>(),
	options: [
		{ value: false, label: "No" },
		{ value: true, label: "Yes" },
	],
});

import { flag } from "flags/next";

export const registryPrefixFlag = flag({
	key: "registry-prefix-flag",
    description: "Whether to use the registry prefix namespace.",
    defaultValue: false,
	async decide() {
		return false;
	},
    options: [
        // options are not necessary for boolean flags, but we customize their labels here
        { value: false, label: 'No' },
        { value: true, label: 'Yes' },
      ],
});

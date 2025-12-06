"use server";

import { registryPrefixFlag } from "@/flags.ts";

export async function FFResolver() {
	const registryPrefixValue = await registryPrefixFlag();
	return registryPrefixValue;
}

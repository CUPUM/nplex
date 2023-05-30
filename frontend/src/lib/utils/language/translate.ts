import { derived } from "svelte/store";
import type { Locale } from "./locales";
import { page } from "$app/stores";

export type Translation = string | ((...tokens: string[]) => string);

export type TranslationCollection = Record<Locale, Translation>;

export const t = derived(page, ($page) => {
	$page.data
})
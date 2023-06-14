import type { ValueOf } from 'type-fest';

/**
 * Source dictionnary for accepted app locales.
 */
export const LOCALES = {
	FRENCH: 'fr',
	ENGLISH: 'en',
} as const;

export type Locale = ValueOf<typeof LOCALES>;

export const LOCALES_ARR = Object.values(LOCALES);

/**
 * Determine if a given locale string code is valid.
 */
export function isLocale(locale?: string): locale is Locale {
	return LOCALES_ARR.indexOf(locale as any) > -1;
}

export const LOCALE_DEFAULT = LOCALES.FRENCH;

export const LOCALES_DETAILS = {
	[LOCALES.ENGLISH]: {
		name: 'English',
		label: 'En',
	},
	[LOCALES.FRENCH]: {
		name: 'Français',
		label: 'Fr',
	},
} satisfies Record<Locale, { name: string; label: string }>;

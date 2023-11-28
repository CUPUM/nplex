import type { ValueOf } from 'type-fest';
import { z } from 'zod';

/**
 * Source dictionnary for accepted app locales.
 */
export const LOCALES = {
	FRENCH: 'fr',
	ENGLISH: 'en',
	// SPANISH: 'es',
} as const;

export type Locale = ValueOf<typeof LOCALES>;

export const localeSchema = z.nativeEnum(LOCALES);

export const LOCALES_ARR = Object.values(LOCALES);

export const LOCALE_DEFAULT = LOCALES.FRENCH;

export type LocaleDefault = typeof LOCALE_DEFAULT;

export const LOCALES_DETAILS = {
	[LOCALES.ENGLISH]: {
		name: 'English',
		label: 'En',
	},
	[LOCALES.FRENCH]: {
		name: 'Français',
		label: 'Fr',
	},
	// [LOCALES.SPANISH]: {
	// 	name: 'Espanol',
	// 	label: 'Es',
	// },
} satisfies { [L in Locale]: { name: string; label: string } };

export const LOCALE_PARAM = 'locale';

// V2

// export const LANGS_DETAILS = {

// } as const satisfies { [L in AvailableLan]: { name: string; label: string } };

export const LANG_PARAM = 'lang';

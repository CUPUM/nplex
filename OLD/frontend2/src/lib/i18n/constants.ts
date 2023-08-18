import type { ValueOf } from 'type-fest';

/**
 * Source dictionnary for accepted app locales.
 */
export const LOCALES = {
	FRENCH: 'fr',
	ENGLISH: 'en',
} as const satisfies { [K in Uppercase<string>]: string };

export type Locale = ValueOf<typeof LOCALES>;

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
} satisfies { [L in Locale]: { name: string; label: string } };

export const LOCALE_PARAM_NAME = 'locale';

export const PLURAL_THRESHOLDS = {
	Few: 'few',
	Many: 'many',
	Other: 'other',
} as const;

export type PluralThreshold = ValueOf<typeof PLURAL_THRESHOLDS>;

export const PLURAL_THRESHOLDS_ARR = Object.values(PLURAL_THRESHOLDS);

export type PluralThresholdNumerable = Exclude<PluralThreshold, 'many' | 'other'>;

export const PLURAL_THRESHOLDS_DEFAULT = {
	[PLURAL_THRESHOLDS.Few]: 7,
} as const satisfies { [P in PluralThresholdNumerable]: number };

export const PLURAL_THRESHOLDS_NUMERABLE_ARR = Object.keys(
	PLURAL_THRESHOLDS_DEFAULT
) as PluralThresholdNumerable[];

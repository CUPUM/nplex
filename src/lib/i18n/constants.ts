import type { ValueOf } from 'type-fest';

/**
 * Source dictionnary for accepted app locales.
 */
export const LOCALES = {
	French: 'fr',
	English: 'en'
} as const;

export type Locale = ValueOf<typeof LOCALES>;

export const LOCALES_ARR = Object.values(LOCALES);

export const LOCALE_DEFAULT = LOCALES.French;

export type LocaleDefault = typeof LOCALE_DEFAULT;

export const LOCALES_DETAILS = {
	[LOCALES.English]: {
		name: 'English',
		label: 'En'
	},
	[LOCALES.French]: {
		name: 'Français',
		label: 'Fr'
	}
} satisfies { [L in Locale]: { name: string; label: string } };

export const LOCALE_PARAM = 'locale';

// export const PLURAL_THRESHOLDS = {
// 	Few: 'few',
// 	Many: 'many',
// 	Other: 'other',
// } as const;

// export type PluralThreshold = ValueOf<typeof PLURAL_THRESHOLDS>;

// export const PLURAL_THRESHOLDS_ARR = Object.values(PLURAL_THRESHOLDS);

// export type PluralThresholdNumerable = Exclude<PluralThreshold, 'many' | 'other'>;

// export const PLURAL_THRESHOLDS_DEFAULT = {
// 	[PLURAL_THRESHOLDS.Few]: 7,
// } as const satisfies { [P in PluralThresholdNumerable]: number };

// export const PLURAL_THRESHOLDS_NUMERABLE_ARR = Object.keys(
// 	PLURAL_THRESHOLDS_DEFAULT
// ) as PluralThresholdNumerable[];

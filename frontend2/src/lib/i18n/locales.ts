// App-wide constants for locale definitions

import type { ValueOf } from 'type-fest';

export const locales = {
	french: 'fr',
	english: 'en',
} as const;

export type Locale = ValueOf<typeof locales>;

export const locales_arr = [locales.french, locales.english] as const;

export const locale_fallback = locales.french;

export const locale_cookie_name = 'i18n-locale';

export const locale_cookie_maxage = 34_560_000; // 400 days, maximum allowed

export const locales_details = {
	[locales.english]: {
		name: 'English',
		label: 'En',
	},
	[locales.french]: {
		name: 'Français',
		label: 'Fr',
	},
} satisfies Record<Locale, { name: string; label: string }>;

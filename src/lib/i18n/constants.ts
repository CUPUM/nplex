import type { AvailableLanguageTag } from '$i18n/runtime';

export const LANG_DETAILS = {
	en: {
		name: 'English',
		label: 'En',
	},
	fr: {
		name: 'Français',
		label: 'Fr',
	},
} satisfies { [L in AvailableLanguageTag]: { name: string; label: string } };

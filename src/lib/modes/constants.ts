import { createTranslations } from '$lib/i18n/translate';
import { IconMoon, IconSun } from '@tabler/icons-svelte';
import type { ComponentType } from 'svelte';
import type { ValueOf } from 'type-fest';

export const MODES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const;

export type Mode = ValueOf<typeof MODES>;

export const MODES_ARR = Object.values(MODES);

export const MODE_DEFAULT = MODES.LIGHT;

export const MODES_DETAILS = {
	[MODES.LIGHT]: {
		icon: IconSun,
	},
	[MODES.DARK]: {
		icon: IconMoon,
	},
} as const satisfies Record<
	Mode,
	{
		icon: ComponentType;
	}
>;

export const MODES_TRANSLATIONS = createTranslations({
	fr: {
		label: 'Thème',
		[MODES.LIGHT]: 'Clair',
		[MODES.DARK]: 'Sombre',
	},
	en: {
		label: 'Theme',
		[MODES.LIGHT]: 'Light',
		[MODES.DARK]: 'Dark',
	},
});

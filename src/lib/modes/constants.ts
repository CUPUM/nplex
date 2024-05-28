import * as m from '$i18n/messages';
import { Monitor, MoonStar, Sun } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import type { ValueOf } from 'type-fest';

export const MODES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const;

export type Mode = ValueOf<typeof MODES>;

export const MODES_ARR = Object.values(MODES);

export const MODE_SETTINGS = {
	...MODES,
	SYSTEM: 'system',
} as const;

export type ModeSetting = ValueOf<typeof MODE_SETTINGS>;

export const MODE_SETTINGS_DETAILS = {
	[MODE_SETTINGS.LIGHT]: {
		icon: Sun,
		title: m.screen_mode_light,
	},
	[MODE_SETTINGS.DARK]: {
		icon: MoonStar,
		title: m.screen_mode_dark,
	},
	[MODE_SETTINGS.SYSTEM]: {
		icon: Monitor,
		title: m.screen_mode_system,
	},
} as const satisfies Record<ModeSetting, { icon: ComponentType; title: () => string }>;

export const MODE_SETTINGS_ARR = Object.values(MODE_SETTINGS);

export const MODE_SETTING_COOKIE_NAME = 'mode';

export const MODE_SETTING_ATTRIBUTE = 'data-mode';

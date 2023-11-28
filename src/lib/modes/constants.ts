import * as m from '$i18n/messages';
import { MoonStar, Sun, type Icon } from 'lucide-svelte';
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
		icon: Sun,
		title: m.mode_light,
	},
	[MODES.DARK]: {
		icon: MoonStar,
		title: m.mode_dark,
	},
} as const satisfies Record<Mode, { icon: ComponentType<Icon>; title: () => string }>;

export const MODE_COOKIE_NAME = 'mode';

export const MODE_ATTRIBUTE = 'data-mode';

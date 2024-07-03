import * as m from '$i18n/messages';
import { Monitor, MoonStar, Sun } from 'lucide-svelte';
import type { Component, ComponentType } from 'svelte';
import type { ValueOf } from 'type-fest';

export const MODES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const;

export type Mode = ValueOf<typeof MODES>;

export const MODES_ARR = Object.values(MODES);

/**
 * Validate a given resolved mode.
 */
export function isMode(maybeMode?: unknown): maybeMode is Mode {
	return MODES_ARR.indexOf(maybeMode as Mode) > -1;
}

export const MODE_FALLBACK = MODES.DARK;

export const MODE_SETTINGS = {
	...MODES,
	SYSTEM: 'system',
} as const;

export type ModeSetting = ValueOf<typeof MODE_SETTINGS>;

export const MODE_SETTINGS_ARR = Object.values(MODE_SETTINGS);

/**
 * Validate a given mode setting.
 */
export function isModeSetting(maybeModeSetting?: unknown): maybeModeSetting is ModeSetting {
	return MODE_SETTINGS_ARR.indexOf(maybeModeSetting as ModeSetting) > -1;
}

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
} as const satisfies Record<ModeSetting, { icon: ComponentType | Component; title: () => string }>;

export const MODE_COOKIE_NAME = 'mode';

export const MODE_SYSTEM_COOKIE_NAME = 'mode-system';

export const MODE_COOKIE_LIFETIME = 34_560_000; // 400 days, maximum allowed;

export const MODE_COOKIE_OPTIONS = {
	sameSite: 'strict',
	secure: true,
	path: '/',
	expires: new Date(Date.now() + MODE_COOKIE_LIFETIME),
	httpOnly: false,
} satisfies Partial<Cookies.CookieAttributes>;

export const MODE_ATTRIBUTE = 'data-mode';

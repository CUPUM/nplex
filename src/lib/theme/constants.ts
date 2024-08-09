import * as m from '$i18n/messages';
import { Monitor, MoonStar, Sun } from 'lucide-svelte';
import type { Component, ComponentType } from 'svelte';
import type { ValueOf } from 'type-fest';

export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const;

export type Theme = ValueOf<typeof THEMES>;

export const THEMES_ARR = Object.values(THEMES);

/**
 * Validate a given resolved mode.
 */
export function isTheme(maybeTheme?: unknown): maybeTheme is Theme {
	return THEMES_ARR.indexOf(maybeTheme as Theme) > -1;
}

export const THEME_DEFAULT = THEMES.DARK;

export const THEME_SETTINGS = {
	...THEMES,
	SYSTEM: 'system',
} as const;

export type ThemeSetting = ValueOf<typeof THEME_SETTINGS>;

export const THEME_SETTINGS_ARR = Object.values(THEME_SETTINGS);

/**
 * Validate a given mode setting.
 */
export function isThemeSetting(maybeThemeSetting?: unknown): maybeThemeSetting is ThemeSetting {
	return THEME_SETTINGS_ARR.indexOf(maybeThemeSetting as ThemeSetting) > -1;
}

export const THEME_SETTINGS_DETAILS = {
	[THEME_SETTINGS.LIGHT]: {
		icon: Sun,
		title: m.screen_mode_light,
	},
	[THEME_SETTINGS.DARK]: {
		icon: MoonStar,
		title: m.screen_mode_dark,
	},
	[THEME_SETTINGS.SYSTEM]: {
		icon: Monitor,
		title: m.screen_mode_system,
	},
} as const satisfies Record<ThemeSetting, { icon: ComponentType | Component; title: () => string }>;

export const THEME_COOKIE_NAME = 'theme';

export const THEME_SYSTEM_COOKIE_NAME = 'theme-system';

export const THEME_COOKIE_LIFETIME = 34_560_000; // 400 days, maximum allowed;

export const THEME_COOKIE_OPTIONS = {
	sameSite: 'strict',
	secure: true,
	path: '/',
	expires: new Date(Date.now() + THEME_COOKIE_LIFETIME),
	httpOnly: false,
} satisfies Partial<Cookies.CookieAttributes>;

export const THEME_ATTRIBUTE = 'data-theme';

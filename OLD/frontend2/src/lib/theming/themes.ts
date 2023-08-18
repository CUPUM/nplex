import type { ValueOf } from 'type-fest';

export const THEMES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const;

export type Theme = ValueOf<typeof THEMES>;

export const THEMES_ARR = Object.values(THEMES);

export const THEME_DEFAULT = THEMES.LIGHT;

/**
 * Validate a given theme identifier.
 */
export function isTheme(theme?: string): theme is Theme {
	return THEMES_ARR.indexOf(theme as any) > -1;
}

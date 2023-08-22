import type { ValueOf } from 'type-fest';

export const THEMES = {
	Light: 'light',
	Dark: 'dark'
} as const;

export type Theme = ValueOf<typeof THEMES>;

export const THEMES_ARR = Object.values(THEMES);

export const THEME_DEFAULT = THEMES.Light;

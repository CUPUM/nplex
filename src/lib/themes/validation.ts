import { THEMES_ARR, type Theme } from './constants';

/**
 * Validate a given theme identifier.
 */
export function isTheme(maybeTheme?: string): maybeTheme is Theme {
	return THEMES_ARR.indexOf(maybeTheme as Theme) > -1;
}

import { LOCALES_ARR, WORLD_LOCALES, type Locale, type WorldLocale } from './constants';

/**
 * Validate if a given string is a valid world locale.
 */
export function isLocale(maybeLocale?: string): maybeLocale is WorldLocale {
	if (maybeLocale == null) {
		return false;
	}
	return (WORLD_LOCALES as any)[maybeLocale] != null;
}

/**
 * Determine if a given string corresponds to a valid locale code.
 */
export function isSupportedLocale(maybeLocale?: string): maybeLocale is Locale {
	if (maybeLocale == null) {
		return false;
	}
	return LOCALES_ARR.indexOf(maybeLocale as any) > -1;
}

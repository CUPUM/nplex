import { LOCALES_ARR, type Locale } from './constants';

/**
 * Validate that a locale code is supported and expected by the app.
 */
export function isLocale(maybeLocale: string): maybeLocale is Locale {
	return LOCALES_ARR.indexOf(maybeLocale as Locale) > -1;
}

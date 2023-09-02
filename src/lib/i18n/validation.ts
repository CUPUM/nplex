import { ZodType, z } from 'zod';
import { LOCALES_ARR, localeSchema, type Locale } from './constants';

/**
 * Validate that a locale code is supported and expected by the app.
 */
export function isLocale(maybeLocale: unknown): maybeLocale is Locale {
	return LOCALES_ARR.indexOf(maybeLocale as Locale) > -1;
}

/**
 * Schema for translations contents.
 */
export function tSchema<S extends ZodType>(schema: S) {
	return z.record(localeSchema, schema);
}

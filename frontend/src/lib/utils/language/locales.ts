import type { ValueOf } from 'ts-essentials';
import { z } from 'zod';

/**
 * Intl (i18n) locale strings.
 */
export const locales = {
	Fr: 'fr-CA',
	En: 'en-CA',
} as const;

export type Locale = ValueOf<typeof locales>;

export const localeSchema = z.nativeEnum(locales).catch(locales.Fr);

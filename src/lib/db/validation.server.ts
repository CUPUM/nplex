import { LOCALES } from '$lib/i18n/constants';
import { strictRecord } from '$lib/utils/zod';
import type { ZodObject, ZodTypeAny } from 'zod';

/**
 * Schema for translations record.
 */
export function translationsSchema<T extends ZodTypeAny>(schema: T) {
	return strictRecord(LOCALES, schema);
	// return z.record(localeSchema, schema);
}

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslationsRelations}.
 */
export function withTranslationsSchema<
	// T extends { id: ZodString },
	// TT extends { locale: typeof localeSchema },
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny>,
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({ translations: translationsSchema(translationSchema) });
}

import type { AvailableLanguageTag } from '$i18n/runtime';
import { availableLanguageTags, isAvailableLanguageTag } from '$i18n/runtime';
import { LANG_COLUMN_NAME } from '$lib/db/constants';
import { ZodObject, z, type ZodTypeAny } from 'zod';

export const langSchema = z.custom<AvailableLanguageTag>(isAvailableLanguageTag);

export type LangSchema = typeof langSchema;

/**
 * Needed to extend schemas produced by drizzle-zod since custom columns are rendered as ZodAny.
 */
export const LANG_COLUMN_SCHEMA = {
	[LANG_COLUMN_NAME]: langSchema,
};

export type LangColumnSchema = typeof LANG_COLUMN_SCHEMA;

/**
 * Extend the insert schema of a given ressource table with its corresponding translations.
 */
export function withTranslationsSchema<
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny> & LangColumnSchema,
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	const translations = z.object(
		availableLanguageTags.reduce(
			(acc, lang) => {
				acc[lang] = translationSchema.merge(
					z.object({ [LANG_COLUMN_NAME]: langSchema.default(lang) })
				) as never;
				return acc;
			},
			{} as Record<AvailableLanguageTag, ZodObject<TT>>
		)
	);
	return schema.extend({ translations });
}

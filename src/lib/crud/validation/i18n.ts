import type { AvailableLanguageTag } from '$i18n/runtime';
import { availableLanguageTags, isAvailableLanguageTag } from '$i18n/runtime';
import { LANG_COLUMN_NAME } from '$lib/db/constants';
import { ZodObject, z, type ZodTypeAny } from 'zod';
import { strictRecord } from './utils';

export const langSchema = z.custom<AvailableLanguageTag>(isAvailableLanguageTag);

export type LangSchema = typeof langSchema;

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslations}.
 */
export function withTranslationsSchema<
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny> & { lang: LangSchema },
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({
		translations: strictRecord(availableLanguageTags, (lang) =>
			translationSchema
				.omit({ [LANG_COLUMN_NAME]: true })
				.extend({ [LANG_COLUMN_NAME]: translationSchema.shape[LANG_COLUMN_NAME].default(lang) })
		),
	});
}

import { availableLanguageTags } from '$i18n/runtime';
import type { langSchema } from '$lib/i18n/validation';
import { strictRecord } from '$lib/utils/zod';
import type { ZodObject, ZodTypeAny } from 'zod';

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslationsRelations}.
 */
export function withTranslationsSchema<
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny> & { lang: typeof langSchema },
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({
		translations: strictRecord(availableLanguageTags, (l) =>
			translationSchema
				.omit({ lang: true })
				.extend({ lang: translationSchema.shape.lang.default(l) })
		),
	});
}

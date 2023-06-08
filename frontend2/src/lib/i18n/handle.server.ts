import type { Handle } from '@sveltejs/kit';
import { z } from 'zod';
import { locale_cookie_maxage, locale_cookie_name, locale_fallback } from './locales';
import { localeSchema } from './validation';

/**
 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
 * request header, else falls back to default app locale.
 */
export const handlei18n = (async ({ event, resolve }) => {
	// Check for cookie, default to header, and last default to fallback.
	const locale = localeSchema
		.default(
			z
				.array(z.unknown())
				.transform((locales) => {
					return locales.find(
						(l): l is z.infer<typeof localeSchema> => localeSchema.safeParse(l).success
					);
				})
				.parse(event.request.headers.get('Accept-Language')?.split(',')) ?? locale_fallback
		)
		.parse(event.cookies.get(locale_cookie_name));

	// Set cookie for future.
	event.cookies.set(locale_cookie_name, locale, { maxAge: locale_cookie_maxage, path: '/' });

	// Set html lang attribute.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', locale);
		},
	});

	return res;
}) satisfies Handle;

import { setLanguageTag } from '$i18n/runtime';
import type { Handle } from '@sveltejs/kit';
import { getEventLang, getEventLocale } from './event';
import { eventLocalize } from './localize.server';
import { eventI18nRedirect } from './redirect.server';
import { eventCreateTranslations } from './translate';

/**
 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
 * request header, else falls back to default app locale.
 */
const handle = (async ({ event, resolve }) => {
	const locale = getEventLocale(event);
	event.locals.locale = locale;
	event.locals.lang = getEventLang(event);
	setLanguageTag(() => event.locals.lang);
	event.locals.redirect = eventI18nRedirect(event);
	event.locals.createTranslations = eventCreateTranslations(event);
	event.locals.localize = eventLocalize(event);

	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', event.locals.lang);
		},
	});
	return res;
}) satisfies Handle;

export default handle;

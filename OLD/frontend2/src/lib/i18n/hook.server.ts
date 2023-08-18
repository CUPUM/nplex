import type { Handle } from '@sveltejs/kit';
import { getEventLocale } from './event';

/**
 * Handle hook handler to manage i18n persistence. Checks for cookie, else falls back to browser
 * request header, else falls back to default app locale.
 */
const handle = (async ({ event, resolve }) => {
	const locale = getEventLocale(event);
	event.locals.locale = locale;
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', event.locals.locale);
		},
	});
	return res;
}) satisfies Handle;

export default handle;

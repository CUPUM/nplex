import { setLanguageTag } from '$i18n/runtime';
import type { Handle } from '@sveltejs/kit';
import { isRedirect } from '@sveltejs/kit';
import { getEventLang } from './event';
import { splitLang, withLang } from './location';

/**
 * Handle hook for:
 *
 * - Setting SSR lang.
 * - Transforming html element lang attribute placeholder.
 * - Rewriting unlocalized SSR redirects with adequate lang segment in location.
 */
const handle = (async ({ event, resolve }) => {
	event.locals.lang = getEventLang(event);
	setLanguageTag(() => event.locals.lang);
	const response = await resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', event.locals.lang);
		},
	});
	if (!isRedirect(response)) {
		return response;
	}
	const location = response.headers.get('location');
	if (!location || !location.startsWith('/')) {
		return response;
	}
	const { lang, tail } = splitLang(location);
	if (!lang) {
		response.headers.set('location', withLang(tail, event.locals.lang));
	}
	return response;
}) satisfies Handle;

export default handle;

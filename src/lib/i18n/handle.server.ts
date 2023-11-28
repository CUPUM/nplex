import { setLanguageTag } from '$i18n/runtime';
import type { Handle } from '@sveltejs/kit';
import { createEventLocalize, createEventRedirect, getEventLang } from './event';

const handle = (async ({ event, resolve }) => {
	event.locals.lang = getEventLang(event);
	setLanguageTag(() => event.locals.lang);
	event.locals.redirect = createEventRedirect(event);
	event.locals.localize = createEventLocalize(event);

	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', event.locals.lang);
		},
	});
	return res;
}) satisfies Handle;

export default handle;

import type { Handle } from '@sveltejs/kit';
import { getPersistedTheme } from './cookie.server';

/**
 * Handle hook handler for SSR-capable client theme persistance.
 */
const handle = (async ({ event, resolve }) => {
	event.locals.theme = getPersistedTheme(event).theme;

	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%theme%', event.locals.theme);
		},
	});

	return res;
}) satisfies Handle;

export default handle;

import type { Handle } from '@sveltejs/kit';
import { getPersistedMode } from './cookie';

/**
 * Handle hook handler for SSR-capable client theme persistance.
 */
const handle = (async ({ event, resolve }) => {
	event.locals.mode = getPersistedMode(event);

	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%mode%', event.locals.mode);
		},
	});

	return res;
}) satisfies Handle;

export default handle;

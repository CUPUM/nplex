import type { Handle } from '@sveltejs/kit';
import { SETOUT_DEFAULT } from './constants';

const handle = (async ({ event, resolve }) => {
	event.locals.setout = SETOUT_DEFAULT;

	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%setout%', event.locals.setout);
		},
	});

	return res;
}) satisfies Handle;

export default handle;

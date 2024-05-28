import type { Handle } from '@sveltejs/kit';

const handle = (async ({ event, resolve }) => {
	// Set html attribute using event.locals to account for
	// possible different value set by downstream action resolve.
	return await resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%presentation%', event.locals.presentation);
		},
	});
}) satisfies Handle;

export default handle;

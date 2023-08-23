import type { Handle } from '@sveltejs/kit';

const handle = (async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	// ...
}) satisfies Handle;

export default handle;

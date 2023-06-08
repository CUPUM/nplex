import type { Handle } from '@sveltejs/kit';

/**
 * Handle hook step to manage event locals, cookies, html lang attribute, ...
 */
export const handleDatabase = (async (req) => {
	console.log('db handler');
	// Add guards here
	// Assign event.locals.db
	return req.resolve(req.event);
}) satisfies Handle;

export default handleDatabase;

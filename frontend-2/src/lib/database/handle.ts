import type { Handle } from '@sveltejs/kit';

/**
 * Handle hook step to manage event locals, cookies, html lang attribute, ...
 */
export const handleDatabase = (async (req) => {
	console.log('db handler');
	return req.resolve(req.event);
}) satisfies Handle;

export default handleDatabase;

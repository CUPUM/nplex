import type { Handle } from '@sveltejs/kit';

/**
 * Closing the request-scoped pool. In this case we simply end the connection of the global pool
 * since we are in a serverless environment and global = request-scoped.
 */
const handle = (async ({ event, resolve }) => {
	const res = await resolve(event);
	// if (!dev) {
	// 	await pool.end();
	// }
	return res;
}) satisfies Handle;

export default handle;

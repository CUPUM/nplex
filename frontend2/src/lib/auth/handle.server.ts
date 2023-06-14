import type { Handle } from '@sveltejs/kit';

/**
 * Populate event locals with user-auth related data and more.
 */
export const handleAuth = (async ({ resolve, event }) => {
	console.log('Handling user auth');
	return resolve(event);
}) satisfies Handle;


// @migration task: Check imports
import type { RequestHandler } from './$types';

/**
 * Get a single project by its id.
 */
export const GET: RequestHandler = ({ locals, params, request }) => {
	return new Response(undefined);
};

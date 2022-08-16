import { applySetCookieHeaders } from '$utils/cookies';
import { clearTokens } from '$utils/database/auth';
import type { RequestHandler } from '../$types';

/**
 * Endpoint to clear client's auth-related cookies.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	let res = new Response();

	applySetCookieHeaders(res, clearTokens);

	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	return res;
};

import { applySetCookieHeaders } from '$utils/cookies';
import { clearTokens } from '$utils/database/auth';
import type { RequestHandler } from './$types';

/**
 * Endpoint to clear client's auth-related cookies.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	let res = new Response();

	applySetCookieHeaders(res, clearTokens);

	return res;
};

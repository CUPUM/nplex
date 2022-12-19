import { COOKIES, STATUS_CODES } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { SERVER_COOKIE_OPTIONS, tokenData } from '../common';
import type { RequestHandler } from './$types';

const tokensSchema = z.object({
	access_token: z.string(),
	refresh_token: z.string(),
	provider_refresh_token: z.string().optional(),
	provider_token: z.string().optional(),
	expires_in: z.number(),
	expires_at: z.number().optional(),
});

/**
 * Since token refreshes are initiated on the client side, we must ensure they percolate to the
 * server-read cookies else subsequent requests will use stale tokens.
 */
export const POST: RequestHandler = async (event) => {
	const cookie = safeJsonParse(event.cookies.get(COOKIES.SESSION));
	const parsedCookie = tokensSchema.passthrough().safeParse(cookie);
	const refresh = await event.request.json();
	const parsedRefresh = tokensSchema.safeParse(refresh);
	if (!parsedRefresh.success || !parsedCookie.success) {
		throw error(STATUS_CODES.InternalServerError, 'Problem refreshing tokens.');
	}
	event.cookies.set(
		COOKIES.SESSION,
		JSON.stringify({
			...parsedCookie.data,
			...tokenData(parsedRefresh.data),
		} satisfies Partial<App.Locals['session']>),
		{
			...SERVER_COOKIE_OPTIONS,
			maxAge: parsedRefresh.data.expires_in,
		}
	);
	return new Response();
};

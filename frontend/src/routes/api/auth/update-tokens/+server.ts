import { COOKIES, STATUS_CODES } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import { z } from 'zod';
import { setSessionCookie, tokenData } from '../common';
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
		event.cookies.delete(COOKIES.SESSION, { path: '/' });
		return new Response(null, {
			status: STATUS_CODES.Ok,
			statusText: 'La session est invalide.',
		});
		// throw error(STATUS_CODES.InternalServerError, 'Problem refreshing tokens.');
	}

	setSessionCookie(event, {
		...(parsedCookie.data as NonNullable<App.Locals['session']>),
		...tokenData(parsedRefresh.data),
	});
	return new Response(null, { status: STATUS_CODES.Ok });
};

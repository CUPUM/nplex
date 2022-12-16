import { dev } from '$app/environment';
import { COOKIES } from '$utils/enums';
import { json, type RequestEvent } from '@sveltejs/kit';

type CookieOptions = Parameters<RequestEvent['cookies']['set']>[2];

export const SERVER_COOKIE_OPTIONS: CookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: !dev,
};

export function clearSession(event: RequestEvent) {
	event.cookies.delete(COOKIES.SESSION, { path: '/' });
	return json(null);
}

type TokenData = Pick<
	NonNullable<App.Locals['session']>,
	| 'access_token'
	| 'refresh_token'
	| 'provider_refresh_token'
	| 'expires_in'
	| 'expires_at'
	| 'provider_token'
> & {};

export function tokenData(data: TokenData) {
	return {
		access_token: data.access_token,
		refresh_token: data.refresh_token,
		provider_refresh_token: data.provider_refresh_token,
		provider_token: data.provider_token,
		expires_in: data.expires_in,
		expires_at: data.expires_at ?? Date.now() + data.expires_in * 1000,
	} satisfies TokenData;
}

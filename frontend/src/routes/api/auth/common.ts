import { dev } from '$app/environment';
import { COOKIES } from '$utils/enums';
import type { AuthSession, Session } from '@supabase/supabase-js';
import { json, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

type CookieOptions = Parameters<RequestEvent['cookies']['set']>[2];

export const emailSchema = zfd.text(
	z
		.string({ required_error: 'Une adresse courriel est requise.' })
		.email('Adresse courriel invalide.')
);

export type AuthFailure = {
	email?: string[];
	password?: string[];
	first_name?: string[];
	last_name?: string[];
	provider?: string[];
	errors?: string[];
};

export const SERVER_COOKIE_OPTIONS: CookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: !dev,
};

export function setAuthCookie(event: RequestEvent, session: AuthSession) {
	event.cookies.set(COOKIES.AUTH, JSON.stringify(session), {
		...SERVER_COOKIE_OPTIONS,
		maxAge: session.expires_in,
	});
}

export function setSessionCookie(event: RequestEvent, session: NonNullable<App.Locals['session']>) {
	event.cookies.set(COOKIES.SESSION, JSON.stringify(session), {
		...SERVER_COOKIE_OPTIONS,
		maxAge: session.expires_in,
	});
}

export function clearSession(event: RequestEvent) {
	event.cookies.delete(COOKIES.SESSION, { path: '/' });
	return json(null);
}

type TokenData = Pick<
	NonNullable<Session>,
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

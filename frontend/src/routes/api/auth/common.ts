import { dev } from '$app/environment';
import { AUTHMODAL_MODE } from '$routes/AuthModal.svelte';
import { queryMessage } from '$routes/MessagesOutlet.svelte';
import { COOKIES, SEARCH_PARAMS } from '$utils/enums';
import type { AuthSession, Session } from '@supabase/supabase-js';
import { json, type LoadEvent, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

type CookieOptions = Parameters<RequestEvent['cookies']['set']>[2];

export type AuthFeedback = {
	email?: string[];
	first_name?: string[];
	last_name?: string[];
	password?: string[];
	errors?: string[];
};

export function redirectToAuth(
	event: RequestEvent | LoadEvent,
	...messages: (string | Parameters<typeof queryMessage<string, string>>[1])[]
) {
	const to = event.url.pathname + event.url.search;
	return queryMessage(
		`/?${SEARCH_PARAMS.AUTH_MODAL}=${AUTHMODAL_MODE.SignUp}&${SEARCH_PARAMS.REDIRECT}=${to}`,
		messages
	);
}

export const emailSchema = zfd.text(
	z
		.string({ required_error: 'Une adresse courriel est requise.' })
		.email('Adresse courriel invalide.')
);

export const SERVER_COOKIE_OPTIONS: CookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: !dev,
};

export async function setSessionCookieFromAuth(event: RequestEvent, session: AuthSession) {
	try {
		const res = await event.fetch('/api/auth/session.json', {
			method: 'POST',
			body: JSON.stringify({ auth: session }),
		});
		const json = (await res.json()) as App.Locals['session'];
		if (!json) {
			throw new Error('Received empty session response from request initiated by auth data.');
		}
		setSessionCookie(event, json);
	} catch (error) {
		clearSession(event);
		console.error('Error while trying to retrieve session using auth data.');
	}
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

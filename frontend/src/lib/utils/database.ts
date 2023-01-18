import { browser } from '$app/environment';
import { invalidate } from '$app/navigation';
import { page } from '$app/stores';
// @ts-ignore:next-line
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { setSessionCookie, tokenData } from '$routes/api/auth/common';
import {
	AuthError,
	createClient,
	type PostgrestError,
	type SupportedStorage,
} from '@supabase/supabase-js';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { ERROR_MESSAGE, LOAD_DEPENDENCIES } from './enums';

/**
 * Supabase client instance reserved to browser context.
 */
export const browserDb = createClient<App.DatabaseSchema>(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false,
			autoRefreshToken: true,
			detectSessionInUrl: false,
		},
	}
);
if (browser) {
	browserDb.auth.onAuthStateChange(async (event, session) => {
		let update = false;
		if (event === 'SIGNED_IN') {
			// Tab switching triggers a signed in event...
			const pagedata = get(page).data;
			if (pagedata) {
				const sameUser = pagedata.session?.user.id === session?.user.id;
				const sameAccessToken = pagedata.session?.access_token === session?.access_token;
				const sameRefreshToken = pagedata.session?.refresh_token === session?.refresh_token;
				if (!sameUser || !sameAccessToken || !sameRefreshToken) {
					// If the sign in leads to a different session state, then percolate update.
					update = true;
				}
			}
		} else if (event === 'TOKEN_REFRESHED') {
			if (session) {
				update = true;
			}
		}
		// Send auth state update to server to adjust session cookie.
		if (update) {
			await fetch('/api/auth/update-tokens', {
				method: 'POST',
				body: JSON.stringify(session),
			});
			invalidate(LOAD_DEPENDENCIES.SESSION);
		}
	});
}

/**
 * Fill-in replacement for lack of local storage on server context.
 */
function sessionStorage(): SupportedStorage {
	const store = new Map<string, string>();
	return {
		getItem: (key: string) => {
			return store.get(key) ?? null;
		},
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
		removeItem: (key: string) => {
			store.delete(key);
		},
	};
}

/**
 * Supabase client instanciator for short-lived (request event lifecycle) instances reserved to
 * server context.
 */
function createServerClient() {
	return createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
			storage: sessionStorage(),
		},
	});
}

/**
 * Takes an event or a minimal session object (access token + refresh token) and returns the
 * contextually appropriate database client instance with auth session.
 */
export async function getDb(event?: LoadEvent | ServerLoadEvent | RequestEvent) {
	// Server-only context
	if (event && 'locals' in event) {
		if (!event.locals.db) {
			event.locals.db = createServerClient();
			if (event.locals.session) {
				// Update session in cookie if newly set session results in token refresh.
				// const authsession = await event.locals.db.auth.setSession(event.locals.session);
				// if (
				// 	!authsession.error &&
				// 	authsession.data.session &&
				// 	event.locals.session.access_token !== authsession.data.session?.access_token
				// ) {
				// 	setSessionCookie(event, {
				// 		...event.locals.session,
				// 		...tokenData(authsession.data.session),
				// 	});
				// }
				await event.locals.db.auth.setSession(event.locals.session);
				event.locals.db.auth.onAuthStateChange((e, s) => {
					if (e === 'TOKEN_REFRESHED' && s && event.locals.session) {
						setSessionCookie(event, {
							...event.locals.session,
							...tokenData(s),
						});
					}
				});
			}
		}
		return event.locals.db;
	}
	// Mixed context
	const db = browser ? browserDb : createServerClient();
	if (event) {
		let session: App.PageData['session'];
		if (event.data?.session) {
			session = event.data.session;
		} else {
			const parentData = await event.parent();
			session = parentData?.session;
		}
		if (session) {
			const dbSession = (await db.auth.getSession()).data.session;
			if (!dbSession || dbSession.user.id !== session.user.id) {
				await db.auth.setSession(session);
			}
		}
	}
	return db;
}

/**
 * Retrieve translated error description.
 */
export function errmsg(error: AuthError | PostgrestError, fallback?: string) {
	if (error instanceof AuthError) {
		return (
			(ERROR_MESSAGE as Record<any, string>)[error.message] ??
			fallback ??
			`Il y a eu une erreur d’authentification. (${error.name}, ${error.status})`
		);
	} else if ('code' in error) {
		return (
			(ERROR_MESSAGE as Record<any, string>)[error.message] ?? fallback ?? JSON.stringify(error)
		);
	}
	return fallback ?? JSON.stringify(error);
}

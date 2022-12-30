import { browser } from '$app/environment';
import { invalidate } from '$app/navigation';
import { page } from '$app/stores';
// @ts-ignore:next-line
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { setSessionCookie, tokenData } from '$routes/api/auth/common';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { ValueOf } from 'ts-essentials';
import { LOAD_DEPENDENCIES, STORAGE_BUCKETS } from './enums';

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
			persistSession: true,
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
				const authsession = await event.locals.db.auth.setSession(event.locals.session);
				if (
					!authsession.error &&
					authsession.data.session &&
					event.locals.session.access_token !== authsession.data.session?.access_token
				) {
					setSessionCookie(event, {
						...event.locals.session,
						...tokenData(authsession.data.session),
					});
				}
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
 * Takes desired page range, page size, and returns tuple of start and end to be used with range
 * selector of db client.
 *
 * @param page Zero-based desired page, i.e. pagination start at index 0.
 */
export function pagination(page: number, size: number): [start: number, end: number] {
	const start = page * size;
	const end = start + size;
	return [start, end];
}

/**
 * Reduce inline verbosity of getting storage assets' public URL.
 */
export function publicurl(bucket: ValueOf<typeof STORAGE_BUCKETS>, name?: string | null) {
	if (!name) {
		return '';
	}
	return browserDb.storage.from(bucket).getPublicUrl(name).data.publicUrl;
}

/**
 * Helper to format a project gallery's colors as a flat array.
 */
export function projectcolors(gallery?: ProjectGalleryItem | ProjectGalleryItem[] | null) {
	if (!gallery) {
		return '';
	}
	if (!Array.isArray(gallery)) {
		gallery = [gallery];
	}
	return gallery.reduce((acc, curr) => {
		if (curr.color_dominant) {
			acc.push('rgb' + curr.color_dominant);
		}
		if (curr.color_mean) {
			acc.push('rgb' + curr.color_mean);
		}
		return acc;
	}, [] as string[]);
}
type ProjectGalleryItem = Partial<App.DatabaseSchema['public']['Tables']['projects_images']['Row']>;
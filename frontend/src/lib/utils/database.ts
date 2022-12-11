import { browser } from '$app/environment';
// @ts-ignore:next-line
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';

const EXPIRY_MARGIN = 1000;

export const browserDb = createClient<App.DatabaseSchema>(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: true,
			autoRefreshToken: true,
			detectSessionInUrl: false,
		},
	}
);

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

function createServerClient() {
	return createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
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
		}
		if (event.locals.session) {
			// const dbSession = (await event.locals.db.auth.getSession()).data.session;
			// if (!dbSession || dbSession.user.id !== event.locals.session.user.id) {
			await event.locals.db.auth.setSession(event.locals.session);
			// }
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
export function getPagination(page: number, size: number): [start: number, end: number] {
	const start = page * size;
	const end = start + size;
	return [start, end];
}

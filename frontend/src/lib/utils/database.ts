import { browser } from '$app/environment';
// @ts-ignore:next-line
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient, type SupportedStorage } from '@supabase/supabase-js';
import type { LoadEvent, RequestEvent, ServerLoadEvent } from '@sveltejs/kit';

const browserDb = createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: false,
	},
});

/**
 * Fill-in replacement for lack of local storage on server context.
 */
function sessionStorageProvider(): SupportedStorage {
	const storage = new Map();
	return {
		getItem: (key: string) => {
			return storage.get(key);
		},
		setItem: (key: string, value: string) => {
			storage.set(key, value);
		},
		removeItem: (key: string) => {
			storage.delete(key);
		},
	};
}

/**
 * Takes an event or a minimal session object (access token + refresh token) and returns the
 * contextually appropriate database client instance with auth session.
 */
export async function getDb(event?: LoadEvent | ServerLoadEvent | RequestEvent) {
	// Client-side instance
	if (browser) {
		return browserDb;
	}

	function createServerClient() {
		return createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			auth: {
				persistSession: true,
				autoRefreshToken: false,
				detectSessionInUrl: false,
				storage: sessionStorageProvider(),
			},
		});
	}

	// Server-only context
	if (event && 'locals' in event) {
		event.locals.db = event.locals.db ?? createServerClient();
		if (event.locals.session) {
			await event.locals.db.auth.setSession(event.locals.session);
		}
		return event.locals.db;
	}

	// Mixed context (load fns)
	const db = createServerClient();
	if (event) {
		let session: App.PageData['session'];
		if (event.data?.session) {
			session = event.data.session;
		} else {
			const parentData = await event.parent();
			session = parentData?.session;
		}
		if (session) {
			await db.auth.setSession(session);
		}
	}
	return db;
}

/**
 * !!! DEPRECATE !!! REPLACE WITH getDb(eventOrSession)
 *
 * Database client instance utils.
 */
export const dbClient = {
	/**
	 * Init a client-side supabase client instance to listen to auth state changes and more. //
	 */
	browser: createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
		},
	}),
	/**
	 * Db client instanciator to use on a per-request basis for server-side authed requests without
	 * unnecessary admin privileges.
	 */
	server: (accessToken?: string) => {
		return createClient<App.DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
			global: {
				headers: {
					Authorization: accessToken ? `Bearer ${accessToken}` : '',
				},
			},
		});
	},
	/**
	 * Helper to get the contextual database client in isomorphic scenarios (server/browser load
	 * functions) depending on if the query runs from server or browser.
	 */
	getForContext: (accessToken?: string) => {
		if (browser) return dbClient.browser;
		return dbClient.server(accessToken);
	},
};

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

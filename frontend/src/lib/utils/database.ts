import { browser } from '$app/environment';
// @ts-ignore:next-line
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$types/database';
import type { DatabaseRpc } from '$types/databaseRpc';
import { createClient } from '@supabase/supabase-js';

type DatabaseSchema = Database & DatabaseRpc;

/**
 * Database client instance utils.
 */
export const dbClient = {
	/**
	 * Init a client-side supabase client instance to listen to auth state changes and more. //
	 */
	browser: createClient<DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		auth: {
			persistSession: true,
			autoRefreshToken: true,
		},
	}),
	/**
	 * Db client instanciator to use on a per-request basis for server-side authed requests without unnecessary admin
	 * privileges.
	 */
	server: (accessToken?: string) => {
		return createClient<DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
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
	 * Helper to get the contextual database client in isomorphic scenarios (server/browser load functions) depending on
	 * if the query runs from server or browser.
	 */
	getForContext: (accessToken?: string) => {
		if (browser) return dbClient.browser;
		return dbClient.server(accessToken);
	},
};

/**
 * Takes desired page range, page size, and returns tuple of start and end to be used with range selector of db client.
 *
 * @param page Zero-based desired page, i.e. pagination start at index 0.
 */
export function getPagination(page: number, size: number): [start: number, end: number] {
	const start = page * size;
	const end = start + size;
	return [start, end];
}

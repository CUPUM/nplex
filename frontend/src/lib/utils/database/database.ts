import { browser } from '$app/environment';
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
	forBrowser: createClient<DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		db: {
			schema: 'public',
		},
		auth: {
			persistSession: true,
			autoRefreshToken: true,
		},
	}),
	/**
	 * Db client instanciator to use on a per-request basis for server-side authed requests without unnecessary admin
	 * privileges.
	 */
	createForServer: (accessToken?: string) => {
		return createClient<DatabaseSchema>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			db: {
				schema: 'public',
			},
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
			global: {
				headers: {
					Authorization: accessToken ? `Bearer ${accessToken}` : null,
				},
			},
		});
	},
	/**
	 * Helper to get the contextual database client in isomorphic scenarios (server/browser load functions) depending on
	 * if the query runs from server or browser.
	 */
	getForContext: (accessToken?: string) => {
		return browser ? dbClient.forBrowser : dbClient.createForServer(accessToken);
	},
};

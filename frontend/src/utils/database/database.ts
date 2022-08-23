import { browser } from '$app/env';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$types/database';
import { createClient } from '@supabase/supabase-js';

// /**
//  * Server side admin db client to use only where truly necessary. This db client can overrule RLS policies and has
//  * extended permissions.
//  */
// export const adminDbClient = browser
// 	? null
// 	: createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, {
// 			db: {
// 				schema: 'public',
// 			},
// 			auth: {
// 				persistSession: false,
// 				autoRefreshToken: false,
// 			},
// 	  });

/**
 * Init a client-side supabase client instance to listen to auth state changes and more. //
 */
export const browserDbClient = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	db: {
		schema: 'public',
	},
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
});

/**
 * Db client instanciator to use on a per-request basis for server-side authed requests without unnecessary admin privileges.
 */
export function createServerDbClient(accessToken?: string) {
	return createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
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
				Authotization: accessToken ? `Bearer ${accessToken}` : null,
			},
		},
	});
}

/**
 * Helper to get the contextual database client in isomorphic scenarios (server/browser load functions) depending on if
 * the query runs from server or browser.
 */
export function getContextualDbClient(accessToken?: string) {
	return browser ? browserDbClient : createServerDbClient(accessToken);
}

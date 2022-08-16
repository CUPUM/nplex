import { browser } from '$app/env';
import { createClient } from '@supabase/supabase-js';

// 1 day
const COOKIE_LIFETIME = 3600000 * 24;

/**
 * Instanciate a disposable single-request-lived db client. Useful for authed server side requests.
 */
export function createDisposableDbClient(accessToken?: string) {
	const client = createClient(
		import.meta.env.PUBLIC_SUPABASE_URL as string,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
		{
			persistSession: false,
			autoRefreshToken: false,
			cookieOptions: {
				lifetime: COOKIE_LIFETIME,
			},
			// fetch: // Custom fetch function, if needed
		}
	);
	if (accessToken) {
		client.auth.setAuth(accessToken);
	}
	return client;
}

/**
 * Init a client-side supabase client instance to listen to auth state changes and more.
 */
export const browserDbClient = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL as string,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
	{
		persistSession: false,
		autoRefreshToken: true,
		cookieOptions: {
			lifetime: COOKIE_LIFETIME,
		},
	}
);

/**
 * Helper to get the proper Supabase client instance depending on the detected context of execution.
 */
export function getContextualDbClient(accessToken?: string) {
	return browser ? browserDbClient : createDisposableDbClient(accessToken);
}

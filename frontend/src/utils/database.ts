import type { definitions } from '$types/database';
import { createClient } from '@supabase/supabase-js';

// 1 hour
export const DB_COOKIE_LIFETIME = 3600000;

/**
 * Db client instance to use for making queries.
 */
export const db = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL as string,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
	{
		cookieOptions: {
			lifetime: DB_COOKIE_LIFETIME,
		},
	}
);

/**
 * Until server-side authentication handling (request cookie parsing and forwarding) is in place, we cannot use api
 * endpoints since they would not take into consideration the client's specific user status. Thus, use the following
 * helper functions to handle queries.
 */

/**
 * Retrieving a user's role as defined in the public.users_roles table.
 */
export async function getUserRole() {
	try {
		const user = db.auth.user();
		let { data, error, status } = await db
			.from<definitions['users_roles']>('users_roles')
			.select('role')
			.eq('user_id', user.id)
			.single();

		if (error) {
			if (status !== 406) {
				throw error;
			}
			console.error(error);
		}
		if (data) {
			return data['role'];
		}
	} catch (error) {
		alert(error.message);
	}
}

// export async function getUserProfile();

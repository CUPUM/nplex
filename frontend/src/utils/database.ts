import { createClient } from '@supabase/supabase-js';

/**
 * Centralised dictionnary of the database's tables' names to be used when building queries.
 */
export enum TableName {
	Projects = 'projects',
	Users = 'users',
	UsersRoles = 'users_roles',
}

/**
 * Db client instance to use for making queries.
 */
export const db = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL as string,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string
);

/**
 * Until server-side authentication handling (request cookie parsing and forwarding) is in place,
 * we cannot use api endpoints since they would not take into consideration the client's specific user status.
 * Thus, use the following helper functions to handle queries.
 */

/**
 * Getting a user's profile data by id.
 */
export async function getUserProfile() {
	try {
		const user = db.auth.user();
		let { data, error, status } = await db.from(TableName.Users)
			.select(`
				*,
				role:users_roles(role)
			`)
			.eq('user_id', user.id)
			.single();

		if (error && status !== 406) {
			throw error;
		}

		if (data) {
			data.role = data.role[0].role;
			console.log(data);
			return data;
		}
	} catch (error) {
		alert(error.message);
	}
}
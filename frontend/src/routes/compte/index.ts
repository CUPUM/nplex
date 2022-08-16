import type { definitions } from '$types/database';
import { createDisposableDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { RequestHandler } from './__types/index';

export const GET: RequestHandler = async ({ locals }) => {
	const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);

	try {
		// Get auth.users row
		const { user, error: userError } = await db.auth.api.getUser(locals[Cookie.DbAccessToken]);
		if (userError) throw userError;

		// Get extended user profile with collections and their contents
		const { data: profile, error: profileError } = await db
			.from<definitions['users_profiles']>('users_profiles')
			.select(
				`
				*,
				projects!projects_created_by_id_fkey(*)
			`
			)
			// shared_projects:...
			// shared_organisations...
			// shared_actors...
			// projects_collections:users_projects_collections(*)
			.eq('user_id', user.id)
			.single();
		if (profileError) throw profileError;
		return {
			body: {
				profile,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			body: {
				profile: {},
			},
		};
	}
};

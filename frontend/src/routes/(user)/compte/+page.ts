import { dbClient } from '$utils/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, depends }) => {
	// Setting a custom dep for limited refresh after form submission.
	// depends(LoadDependency.DbUserProfile);
	const { session } = await parent();
	if (!session?.access_token) return {};
	const db = dbClient.getForContext(session.access_token);
	// Get extended user profile with collections and their contents.
	const profile = await db
		.from('users')
		.select('*')
		// .select(
		// 	`
		// 		*,
		// 		role:users_roles!users_roles_user_id_fkey(
		// 			role
		// 		)
		// 	`
		// )
		.eq('id', session.user.id)
		.single();
	if (profile.error) {
		throw error(+profile.error.code, JSON.stringify(profile.error));
	}
	const role = await db.from('users_roles').select('*').eq('user_id', session.user.id).single();
	if (role.error) {
		throw error(+role.error.code, JSON.stringify(role.error));
	}

	return {
		profile: {
			...profile.data,
			role: role.data.role,
		},
	};
};

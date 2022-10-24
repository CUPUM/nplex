import { dbClient } from '$utils/database/database';
import { CustomLoadDependencies } from '$utils/values/keys';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, depends }) => {
	// Setting a custom dep for limited refresh after form submission.
	depends(CustomLoadDependencies.DbUserProfile);

	const { session } = await parent();

	if (!session?.access_token) throw error(303, '/');

	const db = dbClient.getForContext(session.access_token);

	// Get extended user profile with collections and their contents.
	const { data: profile, error: profileError } = await db
		.from('users')
		.select(
			`
				*,
				role:users_roles!users_roles_user_id_fkey(
					role
				)
			`
		)
		.eq('id', session.user.id)
		.single();

	if (profileError) throw error(404, JSON.stringify(profileError));

	// const { data: projectsPreview, error: projcetsError } = await db
	// 	.from('projects')
	// 	.select(
	// 		`
	// 				*
	// 			`
	// 	)
	// 	.order('updated_at', { ascending: false })
	// 	.range(...getPagination(0, 5));

	// if (projcetsError) throw error(404, projcetsError.message);

	return {
		...profile,
		projectsPreview: [],
	};
};

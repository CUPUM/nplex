import { getContextualDbClient } from '$utils/database/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session?.jwt) throw redirect(303, '/');

	// Get user's id form access token to avoid unecessary db query.
	const db = getContextualDbClient(session.jwt);

	// Get extended user profile with collections and their contents.
	const { data: profile, error: profileError } = await db
		.from('users_profiles')
		.select(
			`
				*,
				role:users_roles!users_roles_user_id_fkey(*)
			`
		)
		.eq('user_id', session.user.id)
		.single();

	if (profileError) throw error(404, profileError.message);

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
		profile,
		projectsPreview: [],
	};
};

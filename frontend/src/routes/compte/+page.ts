import { getContextualDbClient } from '$utils/database/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session?.jwt) throw redirect(303, '/');
	console.log('This shouldnt run');

	// Get user's id form access token to avoid unecessary db query.
	const db = getContextualDbClient(session.jwt);

	// Get extended user profile with collections and their contents.
	const { data: profile, error: profileError } = await db
		.from('users_profiles')
		.select(
			`
				*,
				users_roles (
					role
				)
			`
		)
		.eq('user_id', session.user.id)
		.single();

	if (profileError) throw error(404, profileError.message);
	return {
		profile,
	};
};

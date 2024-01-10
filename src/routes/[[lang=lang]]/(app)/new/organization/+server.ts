import { dbhttp } from '$lib/db/db.server';
import { organizations } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		error(STATUS_CODES.UNAUTHORIZED);
	}
	const [org] = await dbhttp
		.insert(organizations)
		.values({
			createdById: session.user.id,
			updatedById: session.user.id,
		})
		.returning({ id: organizations.id });
	redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/organizations/${org.id}`);
};

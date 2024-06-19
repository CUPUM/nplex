import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	authorize(event);
	console.log(event);
	redirect(STATUS_CODES.TEMPORARY_REDIRECT, '/');
	// const [organization] = await db
	// 	.insert(organizations)
	// 	.values({
	// 		createdById: event.locals.user.id,
	// 		updatedById: event.locals.user.id,
	// 	})
	// 	.returning({ id: organizations.id });
	// if (!organization) {
	// 	error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	// }
	// redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/organizations/${organization.id}`);
};

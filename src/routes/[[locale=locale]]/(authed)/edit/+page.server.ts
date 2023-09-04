import { dbhttp } from '$lib/db/db.server.js';
import { organizations } from '$lib/db/schema/organizations.js';
import { projects } from '$lib/db/schema/projects.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {};

export const actions = {
	createProject: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			return fail(STATUS_CODES.UNAUTHORIZED, { message: 'No session found.' });
		}
		const projectId = await dbhttp
			.insert(projects)
			.values({ createdById: session.user.id, updatedById: session.user.id })
			.returning({ id: projects.id });
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, `/edit/projects/${projectId}`);
	},
	createOrganization: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			return fail(STATUS_CODES.UNAUTHORIZED, { message: 'No session found.' });
		}
		const organizationId = await dbhttp
			.insert(organizations)
			.values({ createdById: session.user.id, updatedById: session.user.id });
		throw event.locals.redirect(
			STATUS_CODES.MOVED_TEMPORARILY,
			`/edit/organizations/${organizationId}`
		);
	},
};

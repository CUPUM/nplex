import * as m from '$i18n/messages';
import { auth } from '$lib/auth/authentication.server';
import { db } from '$lib/db/db.server';
import { organizations, projects, projectsImages } from '$lib/db/schema/public';
import { random } from '$lib/db/sql.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const randomImages = db.select().from(projectsImages).orderBy(random()).limit(10);
	const featuredProjects = db.select().from(projects).limit(10);
	const featuredOrganizations = db.select().from(organizations).limit(10);
	return {
		randomImages,
		featuredProjects,
		featuredOrganizations,
		navbar: {
			noBackground: true,
		},
	};
};

export const actions = {
	logout: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) {
			return fail(STATUS_CODES.UNAUTHORIZED, { message: m.auth_no_session() });
		}
		await auth.invalidateSession(session.sessionId);
		event.locals.auth.setSession(null);
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { dbpool } from '$lib/db/db.server';
import { organizations, projects, projectsImages } from '$lib/db/schema/public';
import { random } from '$lib/db/sql.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const randomImages = dbpool.select().from(projectsImages).orderBy(random()).limit(10);
	const featuredProjects = dbpool.select().from(projects).limit(10);
	const featuredOrganizations = dbpool.select().from(organizations).limit(10);
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
		event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

import { auth } from '$lib/auth/auth.server';
import { dbpool } from '$lib/db/db.server';
import { organizations, projects, projectsImages } from '$lib/db/schema/public';
import { random } from '$lib/db/sql.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	const randomImages = dbpool.select().from(projectsImages).orderBy(random()).limit(10);
	const featuredProjects = dbpool.select().from(projects).limit(10);
	const featuredOrganizations = dbpool.select().from(organizations).limit(10);
	const sessionPromise = event.locals.auth.validate();
	const editableProjects = sessionPromise.then(async (s) => {
		if (s) {
			return await dbpool.select().from(projects).where(eq(projects.createdById, s.user.id));
		}
	});
	const editableOrganizations = sessionPromise.then(async (s) => {
		if (s) {
			return await dbpool.select().from(projects).where(eq(projects.createdById, s.user.id));
		}
	});
	return {
		randomImages,
		featuredProjects,
		featuredOrganizations,
		editable: {
			projects: editableProjects,
			organizations: editableOrganizations,
		},
	};
};

export const actions = {
	logout: async (event) => {
		const session = await event.locals.auth.validate();
		const t = event.locals.createTranslations({
			fr: {
				noSession: 'Aucune session trouvée.',
			},
			en: {
				noSession: 'No session found.',
			},
		});
		if (!session) {
			return fail(STATUS_CODES.UNAUTHORIZED, { message: t.noSession });
		}
		await auth.invalidateSession(session.sessionId);
		event.locals.auth.setSession(null);
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

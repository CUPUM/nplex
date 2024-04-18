import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import { organizations, projects } from '$lib/db/schema/public';
import { fail, redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const featuredProjects = await db
		.select()
		.from(projects)
		.limit(10)
		.orderBy(desc(projects.createdAt));
	const featuredOrganizations = await db
		.select()
		.from(organizations)
		.limit(10)
		.orderBy(desc(organizations.createdAt));
	return {
		featuredProjects,
		featuredOrganizations,
	};
};

export const actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(STATUS_CODES.UNAUTHORIZED, { message: m.auth_no_session() });
		}
		await auth.invalidateSession(event.locals.session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

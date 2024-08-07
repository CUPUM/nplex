import { auth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import {
	organizations,
	organizationsTranslations,
	projects,
	projectsImages,
	projectsTranslations,
} from '$lib/db/schema/public.server';
import { redirect } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';

export const load = async (event) => {
	const featuredProjects = await joinTranslation(
		db
			.select({
				title: projectsTranslations.title,
				bannerStorageName: projectsImages.storageName,
				...getColumns(projects),
			})
			.from(projects)
			.leftJoin(projectsImages, eq(projects.bannerId, projectsImages.id))
			.limit(15)
			.orderBy(desc(projects.createdAt))
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	const featuredOrganizations = await joinTranslation(
		db
			.select({
				...getColumns(organizationsTranslations),
				...getColumns(organizations),
			})
			.from(organizations)
			.limit(15)
			.orderBy(desc(organizations.createdAt))
			.$dynamic(),
		organizationsTranslations,
		eq(organizations.id, organizationsTranslations.id)
	);
	return {
		featuredProjects,
		featuredOrganizations,
	};
};

export const actions = {
	logout: async (event) => {
		authorize(event);
		await auth.invalidateSession(event.locals.session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	},
};

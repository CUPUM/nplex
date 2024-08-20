import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { canEditProject } from '$lib/crud/queries/projects';
import { projectsFiltersSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects, projectsImages, projectsTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	const filtersForm = await superValidate(event.url.searchParams, zod(projectsFiltersSchema));
	if (!filtersForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid projects filters.');
	}
	const results = await joinTranslation(
		db
			.select({
				...getColumns(projectsTranslations),
				...getColumns(projects),
				bannerStorageName: projectsImages.storageName,
			})
			.from(projects)
			.where(canEditProject(event.locals.user))
			.leftJoin(projectsImages, eq(projectsImages.id, projects.bannerId))
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	return {
		filtersForm,
		results,
	};
};

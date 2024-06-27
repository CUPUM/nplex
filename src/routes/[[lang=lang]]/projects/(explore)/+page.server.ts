import { STATUS_CODES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { matchesProjectsFilters } from '$lib/crud/queries/projects';
import { projectsFiltersSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import {
	projects,
	projectsExemplarityMarkers,
	projectsImages,
	projectsInterventions,
	projectsTranslations,
} from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const filtersForm = await superValidate(event.url.searchParams, zod(projectsFiltersSchema));
	if (!filtersForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid project filters.');
	}
	const result = await joinTranslation(
		db
			.select({
				id: projects.id,
				bannerStorageName: projectsImages.storageName,
				title: projectsTranslations.title,
				summary: projectsTranslations.summary,
			})
			.from(projects)
			.where(and(matchesProjectsFilters(filtersForm.data)))
			.leftJoin(projectsImages, eq(projectsImages.id, projects.bannerId))
			.leftJoin(projectsInterventions, eq(projectsInterventions.projectId, projects.id))
			.leftJoin(projectsExemplarityMarkers, eq(projectsExemplarityMarkers.projectId, projects.id))
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id),
		event
	);
	return {
		filtersForm,
		result,
	};
};

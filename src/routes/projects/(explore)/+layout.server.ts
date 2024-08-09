import { LOAD_DEPENDENCIES, STATUS_CODES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import {
	matchesProjectsFilters,
	projectExemplarityMarkersByCategoriesList,
	projectExemplarityMarkersList,
	projectInterventionsByCategoriesList,
	projectTypesList,
} from '$lib/crud/queries/projects';
import { projectsFiltersSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import {
	projects,
	projectsExemplarityMarkers,
	projectsImages,
	projectsInterventions,
	projectsLikes,
	projectsTranslations,
} from '$lib/db/schema/public.server';
import { PRESENTATIONS } from '$lib/presentation/constants';
import { setEventPresentation } from '$lib/presentation/event';
import { error } from '@sveltejs/kit';
import { and, count, eq, exists } from 'drizzle-orm';
import { $false, coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAggBuildObject } from 'drizzle-orm-helpers/pg';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	event.depends(LOAD_DEPENDENCIES.LANG);
	const filtersForm = await superValidate(event.url.searchParams, zod(projectsFiltersSchema));
	if (!filtersForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid projects filters.');
	}
	const exemplarityMarkers = db.$with('exemplarity_markers').as(projectExemplarityMarkersList);
	const result = await joinTranslation(
		db
			.with(exemplarityMarkers)
			.select({
				id: projects.id,
				bannerStorageName: projectsImages.storageName,
				title: projectsTranslations.title,
				summary: projectsTranslations.summary,
				siteOwnershipId: projects.siteOwnershipId,
				updatedAt: projects.updatedAt,
				publishedAt: projects.publishedAt,
				exemplarityMarkers: coalesce(
					jsonAggBuildObject(getColumns(exemplarityMarkers)),
					$emptyJsonArray
				),
				likes: count(projectsLikes),
				liked: event.locals.user
					? exists(
							db
								.select()
								.from(projectsLikes)
								.where(
									and(
										eq(projectsLikes.projectId, projects.id),
										eq(projectsLikes.userId, event.locals.user.id)
									)
								)
						).mapWith(Boolean)
					: $false,
			})
			.from(projects)
			.where(and(matchesProjectsFilters(filtersForm.data)))
			.leftJoin(projectsImages, eq(projectsImages.id, projects.bannerId))
			.leftJoin(projectsInterventions, eq(projectsInterventions.projectId, projects.id))
			.leftJoin(projectsExemplarityMarkers, eq(projectsExemplarityMarkers.projectId, projects.id))
			.leftJoin(exemplarityMarkers, eq(exemplarityMarkers.id, projectsExemplarityMarkers.markerId))
			.leftJoin(projectsLikes, eq(projects.id, projectsLikes.projectId))
			.groupBy(
				projects.id,
				projectsImages.storageName,
				projectsTranslations.title,
				projectsTranslations.summary
			)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id)
	);
	return {
		...setEventPresentation(event, PRESENTATIONS.FULL_WIDTH),
		filtersForm,
		result,
		lists: {
			types: projectTypesList,
			interventionsByCategories: projectInterventionsByCategoriesList,
			exemplarityMarkersBycategories: projectExemplarityMarkersByCategoriesList,
		},
	};
};

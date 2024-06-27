import { ROLES } from '$lib/auth/constants';
import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { LANG_COLUMN_NAME } from '$lib/db/constants';
import { db } from '$lib/db/db.server';
import { langToRegconfig } from '$lib/db/helpers.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityMarkers,
	projectExemplarityMarkersTranslations,
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesToInterventions,
	projectTypesTranslations,
	projects,
	projectsExemplarityMarkers,
	projectsInterventions,
	projectsTranslations,
	projectsTranslationsTs,
	projectsUsers,
} from '$lib/db/schema/public.server';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { and, eq, exists, inArray, or, sql } from 'drizzle-orm';
import { $boolean, coalesce, getColumns } from 'drizzle-orm-helpers';
import {
	$emptyJsonArray,
	jsonAgg,
	jsonAggBuildObject,
	jsonBuildObject,
} from 'drizzle-orm-helpers/pg';
import type { User } from 'lucia';
import type { z } from 'zod';
import type { projectsFiltersSchema } from '../validation/projects';
import { joinTranslation } from './i18n';

export function isProjectCreator(user: Pick<User, 'id'>) {
	return eq(projects.createdById, user.id);
}

/**
 * Filter for projects editable by user based on role, authorship, and collaboration status. (add
 * more conditions if needed).
 *
 * @todo Replace with RLS.
 */
export function canEditProject(user: User) {
	return or(
		$boolean(user.role === ROLES.ADMIN),
		isProjectCreator(user),
		exists(
			db
				.select()
				.from(projectsUsers)
				.where(and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, user.id)))
		)
	);
}

/**
 * Filter clauses based on projectsFiltersSchema data.
 */
export function matchesProjectsFilters(filters: z.infer<typeof projectsFiltersSchema>) {
	return and(
		filters.search
			? exists(
					db
						.select()
						.from(projectsTranslations)
						.where(
							and(
								eq(projects.id, projectsTranslations.id),
								sql`${projectsTranslationsTs(projectsTranslations[LANG_COLUMN_NAME], projectsTranslations.title, projectsTranslations.summary)} @@ to_tsquery(${langToRegconfig(projectsTranslations[LANG_COLUMN_NAME])}, ${filters.search})`
							)
						)
				)
			: undefined,
		filters.types.length ? inArray(projects.id, filters.types) : undefined,
		filters.interventions.length
			? inArray(projectsInterventions.interventionId, filters.interventions)
			: undefined,
		filters.markers.length
			? inArray(projectsExemplarityMarkers.exemplarityMarkerId, filters.markers)
			: undefined
	);
}

export function getProjectTypesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectTypesTranslations),
				...getColumns(projectTypes),
			})
			.from(projectTypes)
			.$dynamic(),
		projectTypesTranslations,
		eq(projectTypes.id, projectTypesTranslations.id),
		event
	);
}

export function getProjectSiteOwnershipsList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectSiteOwnerships),
				...getColumns(projectSiteOwnershipsTranslations),
			})
			.from(projectSiteOwnerships)
			.$dynamic(),
		projectSiteOwnershipsTranslations,
		eq(projectSiteOwnerships.id, projectSiteOwnershipsTranslations.id),
		event
	);
}

export function getProjectInterventionsList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectInterventionsTranslations),
				...getColumns(projectInterventions),
				typeIds: jsonAgg(projectTypesToInterventions.typeId).as('types_ids'),
			})
			.from(projectInterventions)
			.leftJoin(
				projectTypesToInterventions,
				eq(projectInterventions.id, projectTypesToInterventions.interventionId)
			)
			.groupBy(
				...[
					...Object.values(getColumns(projectInterventionsTranslations)),
					...Object.values(getColumns(projectInterventions)),
				]
			)
			.$dynamic(),
		projectInterventionsTranslations,
		eq(projectInterventions.id, projectInterventionsTranslations.id),
		event
	);
}

export function getProjectInterventionCategoriesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectInterventionsCategoriesTranslations),
				...getColumns(projectInterventionsCategories),
			})
			.from(projectInterventionsCategories)
			.$dynamic(),
		projectInterventionsCategoriesTranslations,
		eq(projectInterventionsCategories.id, projectInterventionsCategoriesTranslations.id),
		event
	);
}

export function getProjectInterventionsByCategoriesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	const interventions = getProjectInterventionsList(event).as('interventions');
	// Aggregating as json so we can later coalesce to empty arrays instead of json_build_object's null-fielded object when no rows match.
	const interventionsJson = db
		.select({
			lang: interventions.lang,
			categoryId: interventions.categoryId,
			json: jsonBuildObject(getColumns(interventions)).as('json'),
		})
		.from(interventions)
		.as('interventions_json');
	const categories = getProjectInterventionCategoriesList(event).as('intervention_categories');
	const categoriesColumns = getColumns(categories);
	return db
		.select({
			...categoriesColumns,
			interventions: coalesce(jsonAgg(interventionsJson.json), $emptyJsonArray),
		})
		.from(categories)
		.groupBy(...Object.values(categoriesColumns))
		.leftJoin(
			interventionsJson,
			and(
				eq(categories.id, interventionsJson.categoryId),
				eq(categories.lang, interventionsJson.lang)
			)
		);
}

export function getProjectImplantationTypesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectImplantationTypes),
				...getColumns(projectImplantationTypesTranslations),
			})
			.from(projectImplantationTypes)
			.$dynamic(),
		projectImplantationTypesTranslations,
		eq(projectImplantationTypes.id, projectImplantationTypesTranslations.id),
		event
	);
}

export function getProjectExemplarityCategoriesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectExemplarityCategoriesTranslations),
				...getColumns(projectExemplarityCategories),
			})
			.from(projectExemplarityCategories)
			.$dynamic(),
		projectExemplarityCategoriesTranslations,
		eq(projectExemplarityCategories.id, projectExemplarityCategoriesTranslations.id),
		event
	);
}

export function getProjectExemplarityMarkersList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectExemplarityMarkers),
				...getColumns(projectExemplarityMarkersTranslations),
			})
			.from(projectExemplarityMarkers)
			.$dynamic(),
		projectExemplarityMarkersTranslations,
		eq(projectExemplarityMarkers.id, projectExemplarityMarkersTranslations.id),
		event
	);
}

export function getProjectExemplarityMarkersByCategoriesList(event: ServerLoadEvent) {
	const markers = getProjectExemplarityMarkersList(event).as('markers');
	const markersColumns = getColumns(markers);
	const categories = getProjectExemplarityCategoriesList(event).as('categories');
	const categoriesColumns = getColumns(categories);
	return db
		.select({
			...categoriesColumns,
			markers: jsonAggBuildObject(markersColumns),
		})
		.from(categories)
		.groupBy(...Object.values(categoriesColumns))
		.leftJoin(
			markers,
			and(eq(categories.id, markers.categoryId), eq(categories.lang, markers.lang))
		);
}

export function getProjectImageTypesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectImageTypes),
				...getColumns(projectImageTypesTranslations),
			})
			.from(projectImageTypes)
			.$dynamic(),
		projectImageTypesTranslations,
		eq(projectImageTypes.id, projectImageTypesTranslations.id),
		event
	);
}

export function getProjectImageTemporalitiesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectImageTemporalities),
				...getColumns(projectImageTemporalitiesTranslations),
			})
			.from(projectImageTemporalities)
			.$dynamic(),
		projectImageTemporalitiesTranslations,
		eq(projectImageTemporalities.id, projectImageTemporalitiesTranslations.id),
		event
	);
}

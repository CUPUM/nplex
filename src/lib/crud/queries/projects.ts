import { ROLES } from '$lib/auth/constants';
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
	projectsUsers,
} from '$lib/db/schema/public.server';
import { and, asc, eq, exists, inArray, lte, or, sql } from 'drizzle-orm';
import { $boolean, coalesce, getColumns } from 'drizzle-orm-helpers';
import {
	$emptyJsonArray,
	jsonAgg,
	jsonAggBuildObject,
	jsonBuildObject,
	now,
} from 'drizzle-orm-helpers/pg';
import type { PgSelect } from 'drizzle-orm/pg-core';
import type { User } from 'lucia';
import type { z } from 'zod';
import type { projectsFiltersSchema } from '../validation/projects';
import { joinTranslation } from './i18n';

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
								sql`${projectsTranslations.ts} @@ to_tsquery(${langToRegconfig(projectsTranslations[LANG_COLUMN_NAME])}, ${filters.search})`
							)
						)
				)
			: undefined,
		filters.types.length ? inArray(projects.id, filters.types) : undefined,
		filters.interventions.length
			? inArray(projectsInterventions.interventionId, filters.interventions)
			: undefined,
		filters.markers.length
			? inArray(projectsExemplarityMarkers.markerId, filters.markers)
			: undefined
	);
}

/**
 * Apply filters, pagination, and ordering to a project query.
 */
export function filterProjects<TSelect extends PgSelect>(
	select: TSelect,
	filters: z.infer<typeof projectsFiltersSchema>
) {
	return select.where(matchesProjectsFilters(filters)).orderBy();
}

/**
 * Check if a user is the creator of project(s)
 */
export function isProjectCreator(user: Pick<User, 'id'>) {
	return eq(projects.createdById, user.id);
}

/**
 * Check if a user is listed as an editor for project(s)
 */
export function isProjectEditor(user: Pick<User, 'id'>) {
	return exists(
		db
			.select()
			.from(projectsUsers)
			.where(and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, user.id)))
	);
}

/**
 * Filter for projects editable by user based on role, authorship, and collaboration status. (add
 * more conditions if needed).
 *
 * @todo Replace with RLS.
 */
export function canEditProject(user: Pick<User, 'id' | 'role'>) {
	return or($boolean(user.role === ROLES.ADMIN), isProjectCreator(user), isProjectEditor(user));
}

/**
 * Check if project(s) are published and publicly viewable.
 */
export function isPublicProject() {
	return lte(projects.publishedAt, now());
}

/**
 * Check if client can view project, wether by being an allowed editor or by the project being
 * public.
 */
export function canViewProject(user: Pick<User, 'id' | 'role'> | null) {
	return or(user ? canEditProject(user) : undefined, isPublicProject());
}

/**
 * Get the complete list, localized, of project types.
 */
export const projectTypesList = joinTranslation(
	db
		.select({
			...getColumns(projectTypesTranslations),
			...getColumns(projectTypes),
		})
		.from(projectTypes)
		.$dynamic(),
	projectTypesTranslations,
	eq(projectTypes.id, projectTypesTranslations.id)
);

/**
 * Get the complete list, localized, of project site ownerships.
 */
export const projectSiteOwnershipsList = joinTranslation(
	db
		.select({
			...getColumns(projectSiteOwnerships),
			...getColumns(projectSiteOwnershipsTranslations),
		})
		.from(projectSiteOwnerships)
		.$dynamic(),
	projectSiteOwnershipsTranslations,
	eq(projectSiteOwnerships.id, projectSiteOwnershipsTranslations.id)
);

/**
 * Get the complete list, localized, of project interventions.
 */
export const projectInterventionsList = joinTranslation(
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
		.orderBy(asc(projectInterventionsTranslations.title))
		.$dynamic(),
	projectInterventionsTranslations,
	eq(projectInterventions.id, projectInterventionsTranslations.id)
);

/**
 * Get the complete list, localized, of project interventions categories.
 */
export const projectInterventionCategoriesList = joinTranslation(
	db
		.select({
			...getColumns(projectInterventionsCategoriesTranslations),
			...getColumns(projectInterventionsCategories),
		})
		.from(projectInterventionsCategories)
		.$dynamic(),
	projectInterventionsCategoriesTranslations,
	eq(projectInterventionsCategories.id, projectInterventionsCategoriesTranslations.id)
);

/**
 * Get the complete list, localized, of project interventions organized by their categories.
 */
export const projectInterventionsByCategoriesList = (() => {
	const interventions = projectInterventionsList.as('interventions');
	// Aggregating as json so we can later coalesce to empty arrays instead of
	// json_build_object's null-fielded object when no rows match.
	const interventionsJson = db
		.select({
			lang: interventions.lang,
			categoryId: interventions.categoryId,
			json: jsonBuildObject(getColumns(interventions)).as('json'),
		})
		.from(interventions)
		.as('interventions_json');
	const categories = projectInterventionCategoriesList.as('intervention_categories');
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
})();

/**
 * Get the complete list, localized, of project implantation types.
 */
export const projectImplantationTypesList = joinTranslation(
	db
		.select({
			...getColumns(projectImplantationTypes),
			...getColumns(projectImplantationTypesTranslations),
		})
		.from(projectImplantationTypes)
		.$dynamic(),
	projectImplantationTypesTranslations,
	eq(projectImplantationTypes.id, projectImplantationTypesTranslations.id)
);

/**
 * Get the complete list, localized, of project exemplarity markers.
 */
export const projectExemplarityMarkersList = joinTranslation(
	db
		.select({
			...getColumns(projectExemplarityMarkersTranslations),
			...getColumns(projectExemplarityMarkers),
		})
		.from(projectExemplarityMarkers)
		.$dynamic(),
	projectExemplarityMarkersTranslations,
	eq(projectExemplarityMarkers.id, projectExemplarityMarkersTranslations.id)
);

/**
 * Get the complete list, localized, of project exemplarity categories.
 */
export const projectExemplarityCategoriesList = joinTranslation(
	db
		.select({
			...getColumns(projectExemplarityCategoriesTranslations),
			...getColumns(projectExemplarityCategories),
		})
		.from(projectExemplarityCategories)
		.$dynamic(),
	projectExemplarityCategoriesTranslations,
	eq(projectExemplarityCategories.id, projectExemplarityCategoriesTranslations.id)
);

/**
 * Get the complete list, localized, of project exemplarity markers organized by their categories.
 */
export const projectExemplarityMarkersByCategoriesList = (() => {
	const markers = projectExemplarityMarkersList.as('markers');
	const markersColumns = getColumns(markers);
	const categories = projectExemplarityCategoriesList.as('categories');
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
})();

export const projectImageTypesList = joinTranslation(
	db
		.select({
			...getColumns(projectImageTypes),
			...getColumns(projectImageTypesTranslations),
		})
		.from(projectImageTypes)
		.$dynamic(),
	projectImageTypesTranslations,
	eq(projectImageTypes.id, projectImageTypesTranslations.id)
);

/**
 * Get the complete list, localized, of project image temporalities.
 */
export const projectImageTemporalitiesList = joinTranslation(
	db
		.select({
			...getColumns(projectImageTemporalities),
			...getColumns(projectImageTemporalitiesTranslations),
		})
		.from(projectImageTemporalities)
		.$dynamic(),
	projectImageTemporalitiesTranslations,
	eq(projectImageTemporalities.id, projectImageTemporalitiesTranslations.id)
);

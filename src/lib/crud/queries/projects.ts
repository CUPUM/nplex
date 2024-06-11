import { ROLES } from '$lib/auth/constants';
import { LOAD_DEPENDENCIES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import {
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
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
	projectsUsers,
} from '$lib/db/schema/public.server';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { and, eq, exists, or } from 'drizzle-orm';
import { $boolean, $true, coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg, jsonAggBuildObject } from 'drizzle-orm-helpers/pg';
import type { User } from 'lucia';
import type { z } from 'zod';
import type { projectsSearchSchema } from '../validation/projects';
import { joinTranslation } from './i18n';

export function isCreatedProject(user: Pick<User, 'id'>) {
	return eq(projects.createdById, user.id);
}

/**
 * Filter for projects editable by user based on role, authorship, and collaboration status. (add
 * more conditions if needed).
 *
 * @todo Replace with RLS.
 */
export function isEditableProject(user: User) {
	return or(
		$boolean(user.role === ROLES.ADMIN),
		isCreatedProject(user),
		exists(
			db
				.select()
				.from(projectsUsers)
				.where(and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, user.id)))
		)
	);
}

export function getCreatedProjects(user: Parameters<typeof isCreatedProject>[0]) {
	return db.select().from(projects).where(isCreatedProject(user));
}

/**
 * Filter clauses based on projectsSearchSchema data.
 */
export function matchesProjectSearch(filters: z.infer<typeof projectsSearchSchema>) {
	return $true;
}

export async function getProjectTypesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectTypes),
				...getColumns(projectTypesTranslations),
			})
			.from(projectTypes)
			.$dynamic(),
		projectTypesTranslations,
		eq(projectTypes.id, projectTypesTranslations.id),
		event
	);
}

export async function getProjectSiteOwnershipsList(event: ServerLoadEvent) {
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
				...getColumns(projectInterventions),
				...getColumns(projectInterventionsTranslations),
			})
			.from(projectInterventions)
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
				...getColumns(projectInterventionsCategories),
				...getColumns(projectInterventionsCategoriesTranslations),
			})
			.from(projectInterventionsCategories)
			.$dynamic(),
		projectInterventionsCategoriesTranslations,
		eq(projectInterventionsCategories.id, projectInterventionsCategoriesTranslations.id),
		event
	);
}

export async function getProjectInterventionsByCategoriesList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	const interventions = getProjectInterventionsList(event).as('interventions');
	const interventionsColumns = getColumns(interventions);
	const interventionsWithTypes = db
		.select({
			...getColumns(interventions),
			typeIds: coalesce(jsonAgg(projectTypesToInterventions.typeId), $emptyJsonArray).as(
				'types_ids'
			),
		})
		.from(interventions)
		.leftJoin(
			projectTypesToInterventions,
			eq(interventions.id, projectTypesToInterventions.interventionId)
		)
		.groupBy(...Object.values(interventionsColumns))
		.as('interventions_with_types');
	const interventionsWithTypesColumns = getColumns(interventionsWithTypes);
	const categories = getProjectInterventionCategoriesList(event).as('intervention_categories');
	const categoriesColumns = getColumns(categories);
	return db
		.select({
			...categoriesColumns,
			interventions: jsonAggBuildObject(interventionsWithTypesColumns),
		})
		.from(categories)
		.groupBy(...Object.values(categoriesColumns))
		.leftJoin(
			interventionsWithTypes,
			and(
				eq(categories.id, interventionsWithTypes.categoryId),
				eq(categories.lang, interventionsWithTypes.lang)
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

export function getProjectExemplarityIndicatorsList(event: ServerLoadEvent) {
	event.depends(LOAD_DEPENDENCIES.LANG);
	return joinTranslation(
		db
			.select({
				...getColumns(projectExemplarityIndicators),
				...getColumns(projectExemplarityIndicatorsTranslations),
			})
			.from(projectExemplarityIndicators)
			.$dynamic(),
		projectExemplarityIndicatorsTranslations,
		eq(projectExemplarityIndicators.id, projectExemplarityIndicatorsTranslations.id),
		event
	);
}

export function getProjectIndicatorsByCategoriesList(event: ServerLoadEvent) {
	const indicators = getProjectExemplarityIndicatorsList(event).as('indicators');
	const indicatorsColumns = getColumns(indicators);
	const categories = getProjectExemplarityCategoriesList(event).as('categories');
	const categoriesColumns = getColumns(categories);
	return db
		.select({
			...categoriesColumns,
			indicators: jsonAggBuildObject(indicatorsColumns),
		})
		.from(categories)
		.groupBy(...Object.values(categoriesColumns))
		.leftJoin(
			indicators,
			and(eq(categories.id, indicators.categoryId), eq(categories.lang, indicators.lang))
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

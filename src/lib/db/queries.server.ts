import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { dbpool } from './db.server';
import { userRoles, userRolesTranslations } from './schema/accounts';
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
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesToInterventions,
	projectTypesTranslations,
} from './schema/public';
import { arrayAgg, coalesce, emptyJsonArray, jsonAggBuildObject } from './sql.server';
import { getSubqueryColumns, withTranslation } from './utils';

export function getProjectTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectInterventionsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectInterventions, projectInterventionsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectInterventionCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectInterventionCategories,
		projectInterventionCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export async function getProjectCategorizedInterventionsList(
	event: RequestEvent | ServerLoadEvent
) {
	const interventions = getProjectInterventionsList(event).as('interventions');
	const interventionsColumns = getSubqueryColumns(interventions);
	const categories = getProjectInterventionCategoriesList(event).as('categories');
	const categoriesColumns = getSubqueryColumns(categories);
	return dbpool
		.select({
			...categoriesColumns,
			interventions: jsonAggBuildObject({
				...interventionsColumns,
				projectTypes: projectTypesToInterventions.typeId,
			}),
		})
		.from(categories)
		.groupBy(...Object.values(categoriesColumns))
		.leftJoin(
			interventions,
			and(eq(categories.id, interventions.categoryId), eq(categories.locale, interventions.locale))
		)
		.leftJoin(
			projectTypesToInterventions,
			eq(projectTypesToInterventions.interventionId, interventions.id)
		);
}

export function getProjectSiteOwnershipsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectSiteOwnerships, projectSiteOwnershipsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectImplantationTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImplantationTypes, projectImplantationTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectExemplarityCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function getProjectExemplarityIndicatorsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function getProjectCategorizedIndicatorsList(event: RequestEvent | ServerLoadEvent) {
	const indicators = getProjectExemplarityIndicatorsList(event).as('indicators');
	const categories = getProjectExemplarityCategoriesList(event).as('categories');
	return dbpool
		.select({
			...getSubqueryColumns(categories),
			indicators: coalesce(arrayAgg(getSubqueryColumns(indicators)), emptyJsonArray()),
		})
		.from(categories)
		.leftJoin(indicators, eq(categories.id, indicators.categoryId));
}

export function getProjectImageTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImageTypes, projectImageTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectImageTemporalitiesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImageTemporalities, projectImageTemporalitiesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getUserRolesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, userRoles, userRolesTranslations, {
		field: (t) => t.role,
		reference: (tt) => tt.role,
	});
}

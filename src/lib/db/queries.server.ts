import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { db } from './db.server';
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
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesToInterventions,
	projectTypesTranslations,
} from './schema/public';
import { jsonAggBuildObject } from './sql.server';
import { getSubqueryColumns, joinTranslation } from './utils.server';

export function getProjectTypesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectInterventionsList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectInterventions, projectInterventionsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectInterventionCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(
		event,
		projectInterventionsCategories,
		projectInterventionsCategoriesTranslations,
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
	return db
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
			and(eq(categories.id, interventions.categoryId), eq(categories.lang, interventions.lang))
		)
		.leftJoin(
			projectTypesToInterventions,
			eq(projectTypesToInterventions.interventionId, interventions.id)
		);
}

export function getProjectSiteOwnershipsList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectSiteOwnerships, projectSiteOwnershipsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectImplantationTypesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectImplantationTypes, projectImplantationTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectExemplarityCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(
		event,
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function getProjectExemplarityIndicatorsList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(
		event,
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function getProjectCategorizedIndicatorsList(event: RequestEvent | ServerLoadEvent) {
	const indicators = getProjectExemplarityIndicatorsList(event).as('indicators');
	const indicatorsColumns = getSubqueryColumns(indicators);
	const categories = getProjectExemplarityCategoriesList(event).as('categories');
	const categoriesColumns = getSubqueryColumns(categories);
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

export function getProjectImageTypesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectImageTypes, projectImageTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getProjectImageTemporalitiesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, projectImageTemporalities, projectImageTemporalitiesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function getUserRolesList(event: RequestEvent | ServerLoadEvent) {
	return joinTranslation(event, userRoles, userRolesTranslations, {
		field: (t) => t.role,
		reference: (tt) => tt.role,
	});
}

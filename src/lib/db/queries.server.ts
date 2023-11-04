import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
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
	projectTypesTranslations,
} from './schema/public';
import { arrayAgg, coalesce, emptyJsonArray } from './sql.server';
import { getSubqueryColumns, withTranslation } from './utils';

// Project descriptors

export function selectProjectTypes(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectTypes, projectTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectProjectInterventions(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectInterventions, projectInterventionsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectProjectInterventionCategories(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectInterventionCategories,
		projectInterventionCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export async function selectProjectCategorizedInterventions(event: RequestEvent | ServerLoadEvent) {
	const interventions = selectProjectInterventions(event).as('interventions');
	const categories = selectProjectInterventionCategories(event).as('categories');
	return await dbpool
		.select({
			...getSubqueryColumns(categories),
			interventions: coalesce(arrayAgg(getSubqueryColumns(interventions)), emptyJsonArray()),
		})
		.from(categories)
		.leftJoin(interventions, eq(categories.id, interventions.categoryId));
}

export function selectProjectSiteOwnerships(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectSiteOwnerships, projectSiteOwnershipsTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectProjectImplantationTypes(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImplantationTypes, projectImplantationTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectProjectExemplarityCategories(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function selectProjectExemplarityIndicators(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
	);
}

export function selectProjectCategorizedIndicators(event: RequestEvent | ServerLoadEvent) {
	const indicators = selectProjectExemplarityIndicators(event).as('indicators');
	const categories = selectProjectExemplarityCategories(event).as('categories');
	return dbpool
		.select({
			...getSubqueryColumns(categories),
			indicators: coalesce(arrayAgg(getSubqueryColumns(indicators)), emptyJsonArray()),
		})
		.from(categories)
		.leftJoin(indicators, eq(categories.id, indicators.categoryId));
}

export function selectProjectImageTypes(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImageTypes, projectImageTypesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectProjectImageTemporalities(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImageTemporalities, projectImageTemporalitiesTranslations, {
		field: (t) => t.id,
		reference: (tt) => tt.id,
	});
}

export function selectUserRoles(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, userRoles, userRolesTranslations, {
		field: (t) => t.role,
		reference: (tt) => tt.role,
	});
}

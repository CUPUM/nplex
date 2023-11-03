import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { dbpool, type DbHttp, type DbPool } from './db.server';
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
	projects,
	projectsTranslations,
} from './schema/public';
import { arrayAgg, coalesce, emptyJsonArray } from './sql.server';
import { getSubqueryColumns, withTranslation } from './utils';

export function selectProjectTypes(event: RequestEvent | ServerLoadEvent, db?: DbHttp | DbPool) {
	return withTranslation(
		event,
		projectTypes,
		projectTypesTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		}),
		db
	);
}

export function selectProjectInterventions(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectInterventions,
		projectInterventionsTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		}),
		db
	);
}

export function selectProjectInterventionCategories(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectInterventionCategories,
		projectInterventionCategoriesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

/**
 * THIS SHIT'S BROKEN.
 */
export async function selectProjectCategorizedInterventions(
	event: RequestEvent | ServerLoadEvent,
	db?: DbPool
) {
	const interventions = selectProjectInterventions(event, db).as('interventions');
	const categories = selectProjectInterventionCategories(event, db).as('categories');
	return await dbpool
		.select({
			...getSubqueryColumns(categories),
			interventions: coalesce(arrayAgg(getSubqueryColumns(interventions)), emptyJsonArray()),
		})
		.from(categories)
		.leftJoin(interventions, eq(categories.id, interventions.categoryId));
}

export function selectProjectSiteOwnerships(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectSiteOwnerships,
		projectSiteOwnershipsTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjectImplantationTypes(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectImplantationTypes,
		projectImplantationTypesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjectExemplarityCategories(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjectExemplarityIndicators(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjectCategorizedIndicators(
	event: RequestEvent | ServerLoadEvent,
	db?: DbPool
) {
	return (db ?? dbpool).transaction(async (tx) => {
		const indicators = selectProjectExemplarityIndicators(event, tx).as('indicators');
		const categories = selectProjectExemplarityCategories(event, tx).as('categories');
		return tx
			.select({
				...getSubqueryColumns(categories),
				indicators: coalesce(arrayAgg(getSubqueryColumns(indicators)), emptyJsonArray()),
			})
			.from(categories)
			.leftJoin(indicators, eq(categories.id, indicators.categoryId));
	});
}

export function selectProjectImageTypes(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectImageTypes,
		projectImageTypesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjectImageTemporalities(
	event: RequestEvent | ServerLoadEvent,
	db?: DbHttp | DbPool
) {
	return withTranslation(
		event,
		projectImageTemporalities,
		projectImageTemporalitiesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

export function selectProjects(event: RequestEvent | ServerLoadEvent, db?: DbHttp | DbPool) {
	return withTranslation(
		event,
		projects,
		projectsTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id }),
		db
	);
}

import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { dbpool, type DbHttp, type DbPool } from './db.server';
import {
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
	projectTypes,
	projectTypesTranslations,
	projects,
	projectsTranslations,
} from './schema/public';
import { arrayAgg, jsonBuildObject } from './sql.server';
import { withTranslation } from './utils';

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

/**
 * Deprecated??? tbd.
 */
export function interventionCategoriesQ(event: RequestEvent | ServerLoadEvent) {
	const interventionSq = dbpool
		.select({
			categoryId: projectInterventions.categoryId,
			agg: arrayAgg(
				jsonBuildObject({
					...getTableColumns(projectInterventions),
					...getTableColumns(projectInterventionsTranslations),
				})
			).as('agg'),
		})
		.from(projectInterventions)
		.groupBy(projectInterventions.categoryId)
		.leftJoin(
			projectInterventionsTranslations,
			and(
				eq(projectInterventionsTranslations.id, projectInterventions.id),
				eq(projectInterventionsTranslations.locale, event.locals.locale)
			)
		)
		.as('interventions_sq');
	return dbpool
		.select({
			...getTableColumns(projectInterventionCategoriesTranslations),
			...getTableColumns(projectInterventionCategories),
			interventions: interventionSq.agg,
		})
		.from(projectInterventionCategories)
		.leftJoin(
			projectInterventionCategoriesTranslations,
			and(
				eq(projectInterventionCategories.id, projectInterventionCategoriesTranslations.id),
				eq(projectInterventionCategoriesTranslations.locale, event.locals.locale)
			)
		)
		.leftJoin(interventionSq, eq(projectInterventionCategories.id, interventionSq.categoryId))
		.as('intervention_categories_q');
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

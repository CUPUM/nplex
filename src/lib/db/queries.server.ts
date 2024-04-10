import { USER_ROLES } from '$lib/auth/constants';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import type { AnyTable, ColumnsSelection, TableConfig } from 'drizzle-orm';
import { and, eq, exists, or } from 'drizzle-orm';
import type { InferColumns } from 'drizzle-orm-helpers';
import { bool, coalesce, getColumns, getNameOrAlias, tru } from 'drizzle-orm-helpers';
import {
	emptyJsonArray,
	jsonAgg,
	jsonAggBuildObject,
	jsonBuildObject,
	jsonObjectAgg,
} from 'drizzle-orm-helpers/pg';
import type { SubqueryWithSelection } from 'drizzle-orm/pg-core';
import type { User } from 'lucia';
import type { Entries, ValueOf } from 'type-fest';
import type { LangColumn } from './constants';
import { LANG_COLUMN_NAME } from './constants';
import { db } from './db.server';
import { userRoles, userRolesTranslations } from './schema/auth';
import { languages } from './schema/i18n';
import {
	organizations,
	organizationsUsers,
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
	projectsTranslations,
	projectsUsers,
} from './schema/public';

/**
 * Query helper to get rows with translations corresponding to request event's locale.
 */
export function withTranslation<
	T extends AnyTable<TableConfig> | SubqueryWithSelection<ColumnsSelection, string>,
	TT extends
		| (AnyTable<TableConfig> & LangColumn)
		| SubqueryWithSelection<ColumnsSelection & LangColumn, string>,
	F extends ValueOf<InferColumns<T>>,
	R extends ValueOf<InferColumns<TT>>,
>(
	event: ServerLoadEvent | RequestEvent,
	base: T,
	translations: TT,
	config: { field: F; reference: R } | ((base: T, translations: TT) => { field: F; reference: R })
) {
	// Attaching a load dependency to re-run when locale changes.
	if ('depends' in event) {
		event.depends(LOAD_DEPENDENCIES.Lang);
	}
	const { field, reference } = config instanceof Function ? config(base, translations) : config;
	const baseColumns = getColumns(base);
	const translationColumns = getColumns(translations);
	return db
		.select({ ...translationColumns, ...baseColumns })
		.from(base)
		.$dynamic()
		.leftJoin(
			translations,
			and(eq(translations[LANG_COLUMN_NAME], event.locals.lang), eq(field, reference))
		);
}

/**
 * Aggregate an entity's translations into a `translations` record field. Also automatically
 * coalesces missing translation rows to records with pre-populated locale and foreign key columns.
 */
export function withTranslations<
	T extends AnyTable<TableConfig>,
	TT extends AnyTable<TableConfig> & LangColumn,
	F extends ValueOf<InferColumns<T>>,
	R extends ValueOf<InferColumns<TT>>,
>(
	base: T,
	translations: TT,
	config: { field: F; reference: R } | ((base: T, translations: TT) => { field: F; reference: R })
) {
	const { field, reference } = config instanceof Function ? config(base, translations) : config;
	const baseColumns = getColumns(base);
	const translationsColumns = getColumns(translations);
	const translationsName = getNameOrAlias(translations);
	const translationColumnsEntries = Object.entries(translationsColumns) as Entries<
		typeof translationsColumns
	>;
	const translationsKey = translationColumnsEntries.find(([_k, v]) => v === reference)![0];
	return db
		.select({
			...baseColumns,
			translations: jsonObjectAgg(
				languages.lang,
				jsonBuildObject({
					...translationsColumns,
					lang: languages.lang,
					[translationsKey]: field,
				})
			).as(`${translationsName}_alias`),
		})
		.from(base)
		.leftJoin(languages, tru)
		.leftJoin(
			translations,
			and(eq(field, reference), eq(languages.lang, translations[LANG_COLUMN_NAME]))
		)
		.groupBy(field)
		.$dynamic();
}

const sq = db.select({id: projectsTranslations.id, title: projectsTranslations.id}).from(projectsTranslations).as('sq')
const t = await withTranslations(projects, projectsTranslations, (t,tt) => ({field: t.id, reference: tt.id}))
const tt = t[0]?.translations

/**
 * Filter for projects created by user.
 */
export function isCreatedProject(user: User) {
	return eq(projects.createdById, user.id);
}

/**
 * Helper getter for projects created by user.
 *
 * @see isCreatedProject
 */
export function getCreatedProjects(user: User) {
	return db.select().from(projects).where(isCreatedProject(user));
}

/**
 * Filter for projects editable by user based on role, authorship, and collaboration status. (add
 * more conditions if needed).
 */
export function isEditableProject(user: User) {
	return or(
		bool(user.role === USER_ROLES.ADMIN),
		isCreatedProject(user),
		exists(
			db
				.select()
				.from(projectsUsers)
				.where(and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, user.id)))
		)
	);
}

export function getCreatedOrganizations(user: User) {
	return db.select().from(organizations).where(eq(organizations.createdById, user.id));
}

export function getEditableOrganizations(user: User) {
	return db
		.select({
			...getColumns(organizations),
		})
		.from(organizations)
		.where(
			or(
				bool(user.role === USER_ROLES.ADMIN),
				eq(organizations.createdById, user.id),
				exists(
					db
						.select()
						.from(organizationsUsers)
						.where(
							and(
								eq(organizationsUsers.organizationId, organizations.id),
								eq(organizationsUsers.userId, user.id)
							)
						)
				)
			)
		);
}

export function getProjectTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectTypes, projectTypesTranslations, (t, tt) => ({
		field: t.id,
		reference: tt.id,
	}));
}

export function getProjectInterventionsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectInterventions,
		projectInterventionsTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		})
	);
}

export function getProjectInterventionCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectInterventionsCategories,
		projectInterventionsCategoriesTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		})
	);
}

export async function getProjectCategorizedInterventionsList(
	event: RequestEvent | ServerLoadEvent
) {
	const interventions = getProjectInterventionsList(event).as('interventions');
	const interventionsColumns = getColumns(interventions);
	const interventionsWithTypes = db
		.select({
			...getColumns(interventions),
			typesIds: coalesce(jsonAgg(projectTypesToInterventions.typeId), emptyJsonArray).as(
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
	const categories = getProjectInterventionCategoriesList(event).as('categories');
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

export function getProjectSiteOwnershipsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectSiteOwnerships,
		projectSiteOwnershipsTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		})
	);
}

export function getProjectImplantationTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectImplantationTypes,
		projectImplantationTypesTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		})
	);
}

export function getProjectExemplarityCategoriesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityCategories,
		projectExemplarityCategoriesTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id })
	);
}

export function getProjectExemplarityIndicatorsList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectExemplarityIndicators,
		projectExemplarityIndicatorsTranslations,
		(t, tt) => ({ field: t.id, reference: tt.id })
	);
}

export function getProjectCategorizedIndicatorsList(event: RequestEvent | ServerLoadEvent) {
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

export function getProjectImageTypesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, projectImageTypes, projectImageTypesTranslations, (t, tt) => ({
		field: t.id,
		reference: tt.id,
	}));
}

export function getProjectImageTemporalitiesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(
		event,
		projectImageTemporalities,
		projectImageTemporalitiesTranslations,
		(t, tt) => ({
			field: t.id,
			reference: tt.id,
		})
	);
}

export function getUserRolesList(event: RequestEvent | ServerLoadEvent) {
	return withTranslation(event, userRoles, userRolesTranslations, (t, tt) => ({
		field: t.role,
		reference: tt.role,
	}));
}

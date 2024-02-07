import { USER_ROLES } from '$lib/auth/constants';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import {
	SQL,
	and,
	eq,
	exists,
	getTableColumns,
	or,
	type AnyColumn,
	type AnyTable,
	type TableConfig,
} from 'drizzle-orm';
import {
	bool,
	coalesce,
	emptyJsonArray,
	getColumns,
	jsonAgg,
	jsonAggBuildObject,
	jsonBuildObject,
	jsonObjectAgg,
	tru,
} from 'drizzle-orm-helpers';
import { getTableConfig, type SelectedFields } from 'drizzle-orm/pg-core';
import type { User } from 'lucia';
import type { Entries, Merge, ValueOf } from 'type-fest';
import { db } from './db.server';
import { userRoles, userRolesTranslations } from './schema/auth';
import { langs, type TranslationLangColumn } from './schema/i18n';
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
	projectsUsers,
} from './schema/public';

/**
 * Query helper to get rows with translations corresponding to request event's locale.
 */
export function withTranslation<
	T extends AnyTable<TableConfig>,
	TT extends AnyTable<TableConfig> & { [K in keyof TranslationLangColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	M = Merge<TT['_']['columns'], T['_']['columns']>,
	S extends SelectedFields = Merge<TT['_']['columns'], T['_']['columns']>,
>(
	event: ServerLoadEvent | RequestEvent,
	table: T,
	translationsTable: TT,
	{
		field: f,
		reference: r,
		selection: s = (f) => f as unknown as S,
	}: {
		field: F | ((selection: T) => F);
		reference: R | ((translationsSelection: TT) => R);
		selection?: S | ((columns: M) => S);
	}
) {
	// Attaching a load dependency to re-run when locale changes.
	if ('depends' in event) {
		event.depends(LOAD_DEPENDENCIES.Lang);
	}
	const field = f instanceof Function ? f(table) : f;
	const reference = r instanceof Function ? r(translationsTable) : r;
	const columns = getTableColumns(table);
	const translationColumns = getTableColumns(translationsTable);
	const selection = s instanceof Function ? s({ ...translationColumns, ...columns } as M) : s;
	return db
		.select(selection)
		.from(table)
		.$dynamic()
		.leftJoin(
			translationsTable,
			and(eq(translationsTable.lang, event.locals.lang), eq(field, reference))
		);
}

/**
 * Aggregate an entity's translations into a `translations` record field. Also automatically
 * coalesces missing translation rows to records with pre-populated locale and foreign key columns.
 */
export function withTranslations<
	T extends AnyTable<TableConfig>,
	TT extends AnyTable<TableConfig> & { [K in keyof TranslationLangColumn]: AnyColumn },
	F extends ValueOf<T['_']['columns']>,
	R extends ValueOf<TT['_']['columns']>,
	TS = T['_']['columns'],
	TTS extends Record<string, AnyColumn | SQL | SQL.Aliased> = TT['_']['columns'],
>(
	table: T,
	translationsTable: TT,
	{
		field: f,
		reference: r,
		selection: ts = (t) => t as TS,
		translationsSelection: tts = (tt) => tt as TTS,
	}: {
		field: F | ((selection: T) => F);
		reference: R | ((translationsSelection: TT) => R);
		selection?: TS | ((columns: T['_']['columns']) => TS);
		translationsSelection?: TTS | ((columns: TT['_']['columns']) => TTS);
	}
) {
	const field = f instanceof Function ? f(table) : f;
	const reference = r instanceof Function ? r(translationsTable) : r;
	const selection = ts instanceof Function ? ts(getTableColumns(table)) : ts;
	const { name: translationsTableName } = getTableConfig(translationsTable);
	const translationsColumns = getTableColumns(translationsTable);
	const translationsSelection = tts instanceof Function ? tts(translationsColumns) : tts;
	const translationsEntries = Object.entries(translationsColumns) as Entries<
		typeof translationsColumns
	>;
	const translationsKey = translationsEntries.find(([_k, v]) => v === reference)![0];
	return db
		.select({
			...selection,
			translations: jsonObjectAgg(
				langs.lang,
				jsonBuildObject({
					...translationsSelection,
					lang: langs.lang,
					[translationsKey]: field,
				})
			).as(`${translationsTableName}_alias`),
		})
		.from(table)
		.leftJoin(langs, tru)
		.leftJoin(translationsTable, and(eq(field, reference), eq(langs.lang, translationsTable.lang)))
		.groupBy(field)
		.$dynamic();
}

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
			...getTableColumns(organizations),
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
		projectInterventionsCategories,
		projectInterventionsCategoriesTranslations,
		{ field: (t) => t.id, reference: (tt) => tt.id }
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

import { USER_ROLES } from '$lib/auth/constants';
import type { RequestEvent, ServerLoadEvent } from '@sveltejs/kit';
import { and, eq, exists, getTableColumns, or } from 'drizzle-orm';
import type { Session } from 'lucia';
import { db } from './db.server';
import { userRoles, userRolesTranslations } from './schema/accounts';
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
import {
	coalesce,
	emptyJsonArray,
	getColumns,
	jsonAgg,
	jsonAggBuildObject,
	sqlBool,
	withTranslation,
} from './utils.server';

/**
 * Filter for projects created by session user.
 */
export function isCreatedProject(session: Session) {
	return eq(projects.createdById, session.user.id);
}

/**
 * Helper getter for projects created by session user.
 *
 * @see isCreatedProject
 */
export function getCreatedProjects(session: Session) {
	return db.select().from(projects).where(isCreatedProject(session));
}

/**
 * Filter for projects editable by session user based on role, authorship, and collaboration status.
 * (add more conditions if needed).
 */
export function isEditableProject(session: Session) {
	return or(
		sqlBool(session.user.role === USER_ROLES.ADMIN),
		isCreatedProject(session),
		exists(
			db
				.select()
				.from(projectsUsers)
				.where(
					and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, session.user.id))
				)
		)
	);
}

export function getCreatedOrganizations(session: Session) {
	return db.select().from(organizations).where(eq(organizations.createdById, session.user.id));
}

export function getEditableOrganizations(session: Session) {
	return db
		.select({
			...getTableColumns(organizations),
		})
		.from(organizations)
		.where(
			or(
				sqlBool(session.user.role === USER_ROLES.ADMIN),
				eq(organizations.createdById, session.user.id),
				exists(
					db
						.select()
						.from(organizationsUsers)
						.where(
							and(
								eq(organizationsUsers.organizationId, organizations.id),
								eq(organizationsUsers.userId, session.user.id)
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

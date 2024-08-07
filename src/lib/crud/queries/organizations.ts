import { ROLES } from '$lib/auth/constants';
import { db } from '$lib/db/db.server';
import {
	organizationExpertises,
	organizationExpertisesTranslations,
	organizationTypes,
	organizationTypesTranslations,
	organizations,
	organizationsUsers,
} from '$lib/db/schema/public.server';
import { and, eq, exists, or, type SQLWrapper } from 'drizzle-orm';
import { $boolean, $true, getColumns } from 'drizzle-orm-helpers';
import type { User } from 'lucia';
import type { z } from 'zod';
import type { organizationsFiltersSchema } from '../validation/organizations';
import { joinTranslation } from './i18n';

export function isOrganizationCreator(user: Pick<User, 'id'>) {
	return eq(organizations.createdById, user.id);
}

export function isPublicOrganization(organization: SQLWrapper) {
	return $true;
}

/**
 * Filter for projects editable by user based on role, authorship, and collaboration status. (add
 * more conditions if needed).
 *
 * @todo Replace with RLS.
 */
export function canEditOrganization(user: User) {
	return or(
		$boolean(user.role === ROLES.ADMIN),
		isOrganizationCreator(user),
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
	);
}

/**
 * Filter clauses based on organizationsFiltersSchema data.
 */
export function matchesOrganizationsFilters(filters: z.infer<typeof organizationsFiltersSchema>) {
	return $true;
}

export const organizationTypesList = joinTranslation(
	db
		.select({
			...getColumns(organizationTypesTranslations),
			...getColumns(organizationTypes),
		})
		.from(organizationTypes)
		.$dynamic(),
	organizationTypesTranslations,
	eq(organizationTypes.id, organizationTypesTranslations.id)
);

export const organizationExpertisesList = joinTranslation(
	db
		.select({
			...getColumns(organizationExpertisesTranslations),
			...getColumns(organizationExpertises),
		})
		.from(organizationExpertises)
		.$dynamic(),
	organizationExpertisesTranslations,
	eq(organizationExpertises.id, organizationExpertisesTranslations.id)
);

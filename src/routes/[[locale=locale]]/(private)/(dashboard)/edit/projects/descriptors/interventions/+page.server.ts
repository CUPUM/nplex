import { USER_ROLES } from '$lib/auth/constants';
import { withRole } from '$lib/auth/guard.server';
import { dbpool } from '$lib/db/db.server';
import { locales } from '$lib/db/schema/i18n';
import {
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
} from '$lib/db/schema/public';
import { boolean, jsonObjectAgg } from '$lib/db/sql';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { z } from 'zod';

const interventionCategoriesUpdateSchema = z.object({});

const interventionsUpdateSchema = z.object({});

export const load = async (event) => {
	const session = await withRole(event, USER_ROLES.ADMIN);

	const interventionCategories = await dbpool
		.select({
			...getTableColumns(projectInterventionCategories),
			translations: jsonObjectAgg(locales.locale, projectInterventionCategoriesTranslations),
		})
		.from(projectInterventionCategories)
		.leftJoin(locales, boolean(true))
		.leftJoin(
			projectInterventionCategoriesTranslations,
			and(
				eq(projectInterventionCategories.id, projectInterventionCategoriesTranslations.id),
				eq(locales.locale, projectInterventionCategoriesTranslations.locale)
			)
		)
		.groupBy(projectInterventionCategories.id);

	const interventions = await dbpool
		.select({
			...getTableColumns(projectInterventions),
			translations: jsonObjectAgg(locales.locale, projectInterventionsTranslations),
		})
		.from(projectInterventions)
		.leftJoin(locales, boolean(true))
		.leftJoin(
			projectInterventionsTranslations,
			and(
				eq(projectInterventions.id, projectInterventionsTranslations.id),
				eq(locales.locale, projectInterventionsTranslations.locale)
			)
		)
		.groupBy(projectInterventions.id);

	return { interventionCategories, interventions };
};

export const actions = {};

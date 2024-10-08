import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { aggTranslations, joinTranslations } from '$lib/crud/queries/i18n';
import {
	canEditOrganization,
	organizationExpertisesList,
	organizationTypesList,
} from '$lib/crud/queries/organizations';
import { organizationGeneralSchema } from '$lib/crud/validation/organizations';
import { db } from '$lib/db/db.server';
import {
	organizations,
	organizationsExpertises,
	organizationsTranslations,
} from '$lib/db/schema/public.server';
import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { coalesce, getColumns } from 'drizzle-orm-helpers';
import { $emptyJsonArray, jsonAgg, toExcluded } from 'drizzle-orm-helpers/pg';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	authorize(event);
	const [organization] = await joinTranslations(
		db
			.select({
				...getColumns(organizations),
				...aggTranslations(getColumns(organizationsTranslations)),
				expertisesIds: coalesce(jsonAgg(organizationsExpertises.expertiseId), $emptyJsonArray).as(
					'expertises_ids'
				),
			})
			.from(organizations)
			.where(
				and(
					canEditOrganization(event.locals.user),
					eq(organizations.id, event.params.organizationId)
				)
			)
			.limit(1)
			.leftJoin(
				organizationsExpertises,
				eq(organizations.id, organizationsExpertises.organizationId)
			)
			.groupBy(organizations.id)
			.$dynamic(),
		organizationsTranslations,
		eq(organizations.id, organizationsTranslations.id)
	);
	if (!organization) {
		error(STATUS_CODES.NOT_FOUND, m.project_not_found());
	}
	const form = await superValidate(organization, zod(organizationGeneralSchema));
	return {
		form,
		types: organizationTypesList,
		expertises: organizationExpertisesList,
	};
};

export const actions = {
	update: async (event) => {
		authorize(event);
		const form = await superValidate(event, zod(organizationGeneralSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const { translations, expertisesIds, ...organization } = form.data;
		await db.transaction(async (tx) => {
			await Promise.all([
				tx
					.update(organizations)
					.set(organization)
					.where(eq(organizations.id, event.params.organizationId)),
				tx
					.insert(organizationsTranslations)
					.values(
						Object.values(translations).map((tt) => ({ ...tt, id: event.params.organizationId }))
					)
					.onConflictDoUpdate({
						target: [organizationsTranslations.id, organizationsTranslations.lang],
						set: toExcluded(getColumns(organizationsTranslations)),
					}),
			]);
		});
		return {
			form,
		};
	},
};

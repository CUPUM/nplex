import { STATUS_CODES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { organizationsFiltersSchema } from '$lib/crud/validation/organizations';
import { db } from '$lib/db/db.server';
import { organizations, organizationsTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	const form = await superValidate(event.url.searchParams, zod(organizationsFiltersSchema));
	if (!form.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid organizations filters');
	}
	const result = await joinTranslation(
		db
			.select({
				...getColumns(organizationsTranslations),
				...getColumns(organizations),
			})
			.from(organizations)
			.$dynamic(),
		organizationsTranslations,
		eq(organizations.id, organizationsTranslations.id)
	);
	return {
		form,
		result,
	};
};

export const actions = {};

import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
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
	authorize(event);
	const filtersForm = await superValidate(event.url.searchParams, zod(organizationsFiltersSchema));
	if (!filtersForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid organizations filters.');
	}
	const results = await joinTranslation(
		db
			.select({
				...getColumns(organizationsTranslations),
				...getColumns(organizations),
			})
			.from(organizations)
			.$dynamic(),
		organizationsTranslations,
		eq(organizations.id, organizationsTranslations.id),
		event
	);
	return {
		filtersForm,
		results,
	};
};

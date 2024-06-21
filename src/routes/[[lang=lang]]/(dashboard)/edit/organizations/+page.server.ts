import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { matchesProjectsFilters } from '$lib/crud/queries/projects';
import { organizationsFiltersSchema } from '$lib/crud/validation/organizations';
import { db } from '$lib/db/db.server';
import { organizations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	const filtersForm = await superValidate(event.url.searchParams, zod(organizationsFiltersSchema));
	if (!filtersForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid organizations filters.');
	}
	const results = await db
		.select()
		.from(organizations)
		.where(matchesProjectsFilters(filtersForm.data));
	return {
		filtersForm,
		results,
	};
};

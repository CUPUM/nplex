import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { matchesProjectsSearch } from '$lib/crud/queries/projects';
import { organizationsSearchSchema } from '$lib/crud/validation/organizations';
import { db } from '$lib/db/db.server';
import { organizations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	const searchForm = await superValidate(event.url.searchParams, zod(organizationsSearchSchema));
	if (!searchForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid organizations filters.');
	}
	const searchResults = await db
		.select()
		.from(organizations)
		.where(matchesProjectsSearch(searchForm.data));
	return {
		searchForm,
		searchResults,
	};
};

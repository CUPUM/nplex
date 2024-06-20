import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { matchesProjectsFilters } from '$lib/crud/queries/projects';
import { projectsFiltersSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	const searchForm = await superValidate(event.url.searchParams, zod(projectsFiltersSchema));
	if (!searchForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid projects filters.');
	}
	const searchResults = await db
		.select()
		.from(projects)
		.where(matchesProjectsFilters(searchForm.data));
	return {
		searchForm,
		searchResults,
	};
};

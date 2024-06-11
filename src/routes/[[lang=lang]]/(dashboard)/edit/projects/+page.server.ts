import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { matchesProjectSearch } from '$lib/crud/queries/projects';
import { projectsSearchSchema } from '$lib/crud/validation/projects';
import { db } from '$lib/db/db.server';
import { projects } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	const searchForm = await superValidate(event.url.searchParams, zod(projectsSearchSchema));
	if (!searchForm.valid) {
		error(STATUS_CODES.BAD_REQUEST, 'Invalid project filters.');
	}
	const searchResults = await db
		.select()
		.from(projects)
		.where(matchesProjectSearch(searchForm.data));
	return {
		searchForm,
		searchResults,
	};
};

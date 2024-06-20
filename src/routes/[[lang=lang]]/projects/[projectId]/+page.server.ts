import { STATUS_CODES } from '$lib/common/constants';
import { joinTranslation } from '$lib/crud/queries/i18n';
import { db } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getColumns } from 'drizzle-orm-helpers';

export const load = async (event) => {
	const [project] = await joinTranslation(
		db
			.select({
				...getColumns(projectsTranslations),
				...getColumns(projects),
			})
			.from(projects)
			.$dynamic(),
		projectsTranslations,
		eq(projects.id, projectsTranslations.id),
		event
	);
	if (!project) {
		error(STATUS_CODES.NOT_FOUND);
	}
	return {
		project,
	};
};

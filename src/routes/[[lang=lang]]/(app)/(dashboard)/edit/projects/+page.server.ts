import { authorizeSession } from '$lib/auth/authorization.server';
import { authorizeProjectUpdate } from '$lib/db/authorization.server';
import { dbpool } from '$lib/db/db.server';
import { projects, projectsTranslations } from '$lib/db/schema/public';
import { getSubqueryColumns } from '$lib/db/utils.server';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import { and, eq, getTableColumns, ilike } from 'drizzle-orm';

export const load = async (event) => {
	const session = await authorizeSession(event);
	event.depends(LOAD_DEPENDENCIES.Lang);
	const search = event.url.searchParams.get('search') ?? '';
	const match = dbpool
		.select()
		.from(projectsTranslations)
		.where(search ? ilike(projectsTranslations.title, `%${search}%`) : undefined)
		.as('match');
	const { title, summary } = getSubqueryColumns(match);
	const { id, bannerId } = getTableColumns(projects);
	const searchProjects = dbpool
		.select({ id, bannerId, title, summary })
		.from(projects)
		.rightJoin(match, eq(projects.id, match.id))
		.where(and(authorizeProjectUpdate(session), eq(match.lang, event.locals.lang)));
	return { searchProjects, search };
};

export const actions = {};

import type { TableRow } from '$types/database/utils.js';
import { getDb } from '$utils/database/client.js';
import { STATUS_CODES } from '$utils/enums.js';
import { error } from '@sveltejs/kit';

type ExploreProject = TableRow<'projects'> & {
	location: Pick<TableRow<'projects_location'>, 'obfuscated'> | null;
};

export const load = async (event) => {
	const db = await getDb(event);
	const projects = db
		.from('explore_projects')
		.select(
			`
			*
		`
		)
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});
	return {
		showFooter: false,
		projects,
	};
};

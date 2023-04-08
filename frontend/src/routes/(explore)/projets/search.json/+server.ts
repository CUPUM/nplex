import { dbAdmin } from '$utils/database/admin.js';
import { STATUS_CODES } from '$utils/enums.js';
import { error, json } from '@sveltejs/kit';

export const GET = async (event) => {
	const projects = dbAdmin
		.from('projects')
		.select(
			`
			*,
			location:projects_locations (
				*
			)
	`
		)
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	return json(projects);
};

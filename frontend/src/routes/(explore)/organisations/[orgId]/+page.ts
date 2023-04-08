import { getDb } from '$utils/database/client.js';
import { STATUS_CODES } from '$utils/enums.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const organisation = db
		.from('organisations')
		.select(
			`
			*,
			projects:projects_organisations (
				*
			)
	`
		)
		.eq('id', event.params.orgId)
		.limit(1)
		.single()
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});

	return {
		organisation,
	};
};

import { getDb } from '$utils/database/client.js';
import { STATUS_CODES } from '$utils/enums.js';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const organisations = db
		.from('organisations')
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
		organisations,
	};
};

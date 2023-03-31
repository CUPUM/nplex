import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);
	const interventions = db
		.from('project_intervention')
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
	const categories = db
		.from('project_intervention_category')
		.select(`*`)
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, res.error);
			}
			return res.data;
		});
	const types = db
		.from('project_type')
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
		types,
		categories,
		interventions,
	};
};

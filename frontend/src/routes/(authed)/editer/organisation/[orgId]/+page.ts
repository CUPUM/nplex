import { getDb } from '$utils/database/client';
import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const db = await getDb(event);

	const orgTypes = db
		.from('organisation_type')
		.select(
			`
		 *
	`
		)
		.then((res) => {
			if (res.error) throw error;
			return res.data;
		});

	return { orgTypes };
};

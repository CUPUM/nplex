import { getDb } from '$utils/database';
import { safeJsonParse } from '$utils/json';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const db = await getDb(event);
	const dRes = await db.rpc('get_project_descriptors').single();
	if (dRes.error) {
		throw error(500, dRes.error);
	}
	const pRes = await db
		.from('projects')
		.select(
			`
			*,
			work_ids:projects_works (
				work_id
			),
			updated_by:updated_by_id (
				*,
				role:users_roles!users_roles_user_id_fkey (
					*
				)
			),
			created_by:created_by_id (
				*,
				role:users_roles!users_roles_user_id_fkey (
					*
				)
			)
		`
		)
		.eq('id', event.params.projectId)
		.single();
	if (pRes.error) {
		throw error(500, pRes.error);
	}
	// Doing some transformations to format data for the client.
	const pTransform = {
		...pRes.data,
		cost_range: safeJsonParse<[number, number]>(pRes.data.cost_range, [0, 0]),
		work_ids: Array.isArray(pRes.data.work_ids)
			? pRes.data.work_ids.map((w) => w.work_id)
			: [pRes.data?.work_ids?.work_id],
	};
	return {
		project: pTransform,
		descriptors: dRes.data,
	};
};

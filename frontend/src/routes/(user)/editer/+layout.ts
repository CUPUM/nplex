import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { pagination } from '$utils/format';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session } = await event.parent();
	if (!session) {
		throw error(STATUS_CODES.Unauthorized);
	}
	const db = await getDb(event);
	const projectsRes = await db
		.from('editable_projects')
		.select(
			`
			*,
			type:project_type(*),
			banner:projects_images!banner_id(*),
			gallery:projects_images!project_id(*)
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10));
	if (projectsRes.error) {
		throw error(STATUS_CODES.NotFound, projectsRes.error);
	}
	return {
		projects: projectsRes.data,
	};
}) satisfies LayoutLoad;

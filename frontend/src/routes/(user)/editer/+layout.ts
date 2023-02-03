import { maybeSingle } from '$types/utils';
import { getDb } from '$utils/database/client';
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
	const projects = db
		.from('editable_projects')
		.select(
			`
				*,
				type:project_type(*),
				banner:projects_images!banner_id(*),
				gallery:projects_images!project_id(*),
				publication_status:projects_publication_status(*)
			`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10))
		.then((res) => {
			if (res.error) {
				throw error(STATUS_CODES.InternalServerError, { ...res.error });
			}
			return res.data.map((p) => {
				return {
					...p,
					publication_status: maybeSingle(p.publication_status),
				};
			});
		});
	return {
		projects,
	};
}) satisfies LayoutLoad;

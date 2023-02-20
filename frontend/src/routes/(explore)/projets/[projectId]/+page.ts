import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb(event);
	const projectRes = await db
		.from('projects')
		.select('*', { count: 'exact' })
		.eq('id', event.params.projectId)
		.limit(1)
		.maybeSingle();
	if (projectRes.error) {
		throw error(STATUS_CODES.InternalServerError, {
			message: 'Erreur de la base de données',
			// database: projectRes.error,
		});
	}
	if (!projectRes.count) {
		throw error(STATUS_CODES.BadRequest, {
			message: "Ce projet n'exsite pas ou vous n'y avez pas accès.",
		});
	}

	return {
		categoryIsResetable: true,
		project: projectRes.data,
		showFooter: true,
	};
}) satisfies PageLoad;

import { getDb } from '$utils/database';
import { dbAdmin } from '$utils/databaseAdmin';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
			database: projectRes.error,
		});
	}
	if (!projectRes.count) {
		const existsRes = await dbAdmin
			.from('projects')
			.select('id', { count: 'exact' })
			.eq('id', event.params.projectId)
			.limit(1)
			.maybeSingle();
		if (!existsRes.count) {
			throw error(STATUS_CODES.BadRequest, { message: 'Oops. Ce projet ne semble pas exister.' });
		}
		throw error(STATUS_CODES.BadRequest, {
			message: "Vous n'avez pas accès à ce projet.",
			proposeAuth: false,
		});
	}

	return {
		categoryIsResetable: true,
		project: projectRes.data,
		showFooter: true,
	};
}) satisfies PageServerLoad;

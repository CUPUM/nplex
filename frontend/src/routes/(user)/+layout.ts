import { queryMessage } from '$routes/MessagesOutlet.svelte';
import { getDb, pagination } from '$utils/database';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const { session } = await event.parent();
	if (!session) {
		throw redirect(
			302,
			queryMessage('/', {
				content: 'Désolé, un compte est requis pour accéder à cette section de Nplex.',
			})
		);
	}
	const db = await getDb(event);
	const projectsRes = await db
		.from('editable_projects')
		.select(
			`
			*,
			type:project_type(*)
		`
		)
		.order('updated_at', { ascending: false })
		.range(...pagination(0, 10));
	if (projectsRes.error) {
		throw error(404, projectsRes.error);
	}
	return {
		projects: projectsRes.data,
	};
};

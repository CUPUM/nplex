import { appendMessageParam } from '$routes/MessagesOutlet.svelte';
import { dbClient, getPagination } from '$utils/database';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.access_token)
		throw redirect(
			302,
			appendMessageParam('/', { content: 'Désolé, un compte est requis pour accéder à cette section de Nplex.' })
		);

	const db = dbClient.getForContext(session.access_token);
	const projectsRes = await db
		.from('projects')
		.select('*')
		.order('updated_at', { ascending: false })
		.range(...getPagination(0, 10));
	if (projectsRes.error) throw error(404, projectsRes.error);

	return {
		projects: projectsRes.data,
	};
};

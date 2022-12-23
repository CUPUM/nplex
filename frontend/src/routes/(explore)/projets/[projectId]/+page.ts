import { queryMessage } from '$routes/MessagesOutlet.svelte';
import { getDb } from '$utils/database';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const db = await getDb(event);
	const projectRes = await db
		.from('projects')
		.select('*')
		.eq('id', event.params.projectId)
		.single();
	if (projectRes.error)
		throw redirect(
			302,
			queryMessage('/projets', {
				content: `Un problème est survenu lors de la requête du projet (id: ${event.params.projectId}).`,
				type: 'error',
			})
		);

	return {
		categoryIsResetable: true,
		project: projectRes.data,
	};
}) satisfies PageLoad;

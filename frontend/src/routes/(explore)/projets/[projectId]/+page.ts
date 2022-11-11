import { queryMessage } from '$routes/MessagesOutlet.svelte';
import { dbClient } from '$utils/database';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const { session } = await parent();
	const db = dbClient.getForContext(session?.access_token);
	const projectRes = await db.from('projects').select('*').eq('id', params.projectId).single();
	if (projectRes.error)
		throw redirect(
			302,
			queryMessage('/projets', {
				content: `Un problème est survenu lors de la requête du projet (id: ${params.projectId}).`,
				type: 'error',
			})
		);

	return {
		categoryIsResetable: true,
		project: projectRes.data,
	};
};

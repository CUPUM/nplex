import { appendMessageParam } from '$routes/MessagesOutlet.svelte';
import { dbClient } from '$utils/database';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent, url }) => {
	// If no projectId, return empty for new project.
	if (!params.projectId) return {};
	const { session } = await parent();
	if (!session?.access_token) return {};
	const db = dbClient.getForContext(session.access_token);
	const projectRes = await db.from('projects').select('*').eq('id', params.projectId).single();
	if (projectRes.error) {
		throw redirect(
			302,
			appendMessageParam('/editer/projet', {
				content: `Erreur lors du chargement du projet (${JSON.stringify(projectRes.error)})`,
				type: 'error',
			})
		);
	}
	return {
		project: projectRes.data,
	};
};

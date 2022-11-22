import { queryMessage } from '$routes/AppMessagesOutlet.svelte';
import { dbClient } from '$utils/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent, url }) => {
	const { session } = await parent();
	if (!session?.access_token) throw error(500);
	const db = dbClient.getForContext(session.access_token);
	const descriptorsRes = await db.rpc('get_project_descriptors').single();
	if (descriptorsRes.error) throw error(500, descriptorsRes.error);
	if (!params.projectId)
		return {
			project: {} as any,
			descriptors: descriptorsRes.data,
		};
	const projectRes = await db.from('projects').select('*').eq('id', params.projectId).single();
	if (projectRes.error) {
		throw redirect(
			302,
			queryMessage('/editer/projet', {
				content: `Erreur lors du chargement du projet (${JSON.stringify(
					projectRes.error
				)})`,
				type: 'error',
			})
		);
	}
	return {
		project: projectRes.data,
		descriptors: descriptorsRes.data,
	};
};

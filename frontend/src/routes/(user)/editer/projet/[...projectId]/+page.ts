import { queryMessage } from '$routes/AppMessagesOutlet.svelte';
import { getDb } from '$utils/database';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { session } = await event.parent();
	const db = await getDb(event);
	const descriptorsRes = await db.rpc('get_project_descriptors').single();
	if (descriptorsRes.error) {
		throw error(500, descriptorsRes.error);
	}
	if (!event.params.projectId)
		return {
			project: {} as any,
			descriptors: descriptorsRes.data,
		};
	const projectRes = await db
		.from('projects')
		.select(
			`
			*
		`
		)
		// Do some other joins here to complete the data.
		.eq('id', event.params.projectId)
		.single();
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

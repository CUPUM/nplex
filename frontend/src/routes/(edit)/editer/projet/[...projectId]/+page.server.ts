import { dbClient } from '$utils/database';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	upsert: async (event) => {
		if (!event.locals.session) return invalid(401);
		const formData = Object.fromEntries(await event.request.formData()) as any;
		if (event.params.projectId) formData.id = event.params.projectId;
		// Do some validation with zod.
		const db = dbClient.createForServer(event.locals.session.access_token);
		const project = await db.from('projects').upsert(formData).select('id').single();
		if (project.error) {
			throw error(project.status, project.error.message);
		}
		// If newly added project, redirect to proper url param.
		if (!event.params.projectId) {
			throw redirect(302, '/editer/projet/' + project.data.id);
		}
	},
};

import { dbClient } from '$utils/database/database';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const db = dbClient.createForServer(event.locals.session.access_token);

		const project = await db
			.from('projects')
			.upsert({
				id: event.params.projectId || undefined,
				title: formData.get('title') as string,
				category_id: formData.has('category_id') ? +formData.get('category_id') : undefined,
				type_id: formData.has('type_id') ? +formData.get('type_id') : undefined,
			})
			.select()
			.single();

		if (project.error) {
			console.log(project.error);
			throw error(project.status, project.error.message);
		}

		throw redirect(302, '/editer/projet/' + project.data.id);
	},
};

import { dbClient } from '$utils/database';
import { safeJsonParse } from '$utils/json';
import { projectLocationSchema } from '$utils/validation';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const upsertSchema = zfd
	.formData({
		id: zfd.text(z.string().optional()),
		title: zfd.text(),
		location: zfd.text(z.string().optional()),
	})
	.transform((u) => {
		const { location, ...r } = u;
		const l = projectLocationSchema.safeParse(safeJsonParse(location));
		if (l.success) {
			return { ...l.data, ...r };
		}
		return { location_geometry: null, location_radius: null, ...r };
	});

export const actions: Actions = {
	upsert: async (event) => {
		if (!event.locals.session) return invalid(401);
		const validated = upsertSchema.safeParse(await event.request.formData());
		if (!validated.success) {
			throw error(500, validated.error);
		}
		if (event.params.projectId) validated.data.id = event.params.projectId;
		const db = dbClient.createForServer(event.locals.session.access_token);
		const project = await db.from('projects').upsert(validated.data).select('id').single();
		if (project.error) {
			throw invalid(500, project.error);
		}
		// If newly added project, redirect to proper url param.
		if (!event.params.projectId) {
			throw redirect(302, '/editer/projet/' + project.data.id);
		}
	},
	publish: async (event) => {},
	delete: async (event) => {},
};

import { getDb } from '$utils/database';
import { safeJsonParse } from '$utils/json';
import { projectLocationSchema } from '$utils/validation';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const actions: Actions = {
	/**
	 * Insert new project or update existing project.
	 */
	upsert: async (event) => {
		if (!event.locals.session) {
			return invalid(401);
		}
		const v = zfd
			.formData(
				z
					.object({
						id: zfd.text(z.string().optional()),
						title: zfd.text(),
						location: zfd.text(z.string().optional()),
					})
					.passthrough()
			)
			.transform((u) => {
				const { location, ...r } = u;
				const l = projectLocationSchema.safeParse(safeJsonParse(location));
				if (l.success) {
					return { ...l.data, ...r };
				}
				return { location_geometry: null, location_radius: null, ...r };
			})
			.safeParse(await event.request.formData());
		if (!v.success) {
			throw error(500, v.error);
		}
		console.log(v.data);
		if (event.params.projectId) v.data.id = event.params.projectId;
		const db = await getDb(event);
		const projectRes = await db.from('projects').upsert(v.data).select('id').single();
		if (projectRes.error) {
			throw invalid(500, projectRes.error);
		}
		// If newly added project, redirect to proper url param.
		if (!event.params.projectId) {
			throw redirect(302, '/editer/projet/' + projectRes.data.id);
		}
	},
	refresh: async (event) => {
		if (!event.locals.session) return invalid(401);
		if (!event.params.projectId) return invalid(401);
		return {};
	},
	publish: async (event) => {},
	delete: async (event) => {
		if (!event.locals.session) return invalid(401);
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.id) return invalid(401);
		const db = await getDb(event);
		const deleteRes = await db.from('projects').delete().eq('id', formData.id);
		if (deleteRes.error) throw error(500, deleteRes.error);
		throw redirect(301, '/editer');
	},
};

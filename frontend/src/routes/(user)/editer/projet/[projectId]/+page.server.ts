import { getDb } from '$utils/database';
import { pgarr } from '$utils/format';
import { error, invalid, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

// const v = zfd
// 	.formData(
// 		z
// 			.object({
// 				title: zfd.text(),
// 				location: zfd.text(z.string().optional()),
// 			})
// 			.passthrough()
// 	)
// 	.transform((u) => {
// 		const { location, ...r } = u;
// 		const l = projectLocationSchema.safeParse(safeJsonParse(location));
// 		if (l.success) {
// 			return { ...l.data, ...r };
// 		}
// 		return { location_geometry: null, location_radius: null, ...r };
// 	})
// 	.safeParse(await event.request.formData());
// if (!v.success) {
// 	throw error(500, v.error);
// }

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const data = await event.request.formData();
		const db = await getDb(event);
		// Updating the main project table;
		const p = zfd
			.formData(
				z.object({
					title: zfd.text(),
					type_id: zfd.numeric(z.number().optional()),
					description: zfd.text(z.string().optional()),
					cost_range: zfd.json(
						z.tuple([z.number().nonnegative(), z.number().nonnegative()])
					),
				})
			)
			.safeParse(data);
		if (p.success) {
			const pUp = await db
				.from('projects')
				.update({
					...p.data,
					id: event.params.projectId,
				})
				.single();
		}
		// Update project works
		const w = zfd
			.formData(
				z.object({
					work_id: zfd.repeatableOfType(zfd.numeric()),
				})
			)
			.safeParse(data);
		if (w.success) {
			const wDel = await db
				.from('projects_works')
				.delete()
				.eq('project_id', event.params.projectId)
				.not('work_id', 'in', pgarr(w.data.work_id));
			const wUp = await db.from('projects_works').upsert(
				w.data.work_id.map((wid) => {
					return {
						project_id: event.params.projectId!,
						work_id: wid,
					};
				})
			);
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

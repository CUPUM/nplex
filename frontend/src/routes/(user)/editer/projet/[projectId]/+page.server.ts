import { getDb } from '$utils/database';
import { pgarr } from '$utils/format';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const data = await event.request.formData();
		const db = await getDb(event);
		// General project data;
		const g = zfd
			.formData(
				z.object({
					title: zfd.text(),
					type_id: zfd.numeric(z.number().optional()),
					cost_range: zfd.json(
						z.tuple([z.number().nonnegative(), z.number().nonnegative()])
					),
					description: zfd.text(z.string().optional()),
				})
			)
			.safeParse(data);
		if (g.success) {
			const pUp = await db
				.from('projects')
				.update({
					...g.data,
					id: event.params.projectId,
				})
				.single();
		}
		// Project works
		const w = zfd
			.formData(
				z.object({
					work_id: zfd.repeatableOfType(zfd.numeric()),
				})
			)
			.safeParse(data);
		if (w.success) {
			// Remove any absent
			const wDel = await db
				.from('projects_works')
				.delete()
				.eq('project_id', event.params.projectId)
				.not('work_id', 'in', pgarr(w.data.work_id));
			if (wDel.error) {
				console.log(wDel.error);
			}
			// Append new ones
			const project_id = event.params.projectId;
			const wUp = await db.from('projects_works').upsert(
				w.data.work_id.map((wid) => {
					return {
						project_id,
						work_id: wid,
					};
				})
			);
			if (wUp.error) {
				console.log(wUp.error);
			}
		}
	},
	delete: async (event) => {
		if (!event.locals.session) return fail(401);
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.id) return fail(401);
		const db = await getDb(event);
		const deleteRes = await db.from('projects').delete().eq('id', formData.id);
		if (deleteRes.error) throw error(500, deleteRes.error);
		throw redirect(301, '/editer');
	},
};

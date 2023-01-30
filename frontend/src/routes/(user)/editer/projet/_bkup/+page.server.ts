import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { titleSchema } from '../common';

export const actions: Actions = {
	title: async (event) => {
		if (!event.params.projectId) return;
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				title: titleSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const titleUpdate = await db
			.from('projects')
			.update({ title: parsed.data.title })
			.eq('id', event.params.projectId);
		if (titleUpdate.error) {
			return fail(STATUS_CODES.InternalServerError, titleUpdate.error);
		}
	},
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		const db = await getDb(event);
		const parsed = zfd
			.formData({
				type_id: zfd.numeric(z.number().optional()),
				cost_range: zfd
					.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()]))
					.transform((minmax) => toPgArr(minmax) as `[${number},${number}]`),
				description: zfd.text(z.string().optional()),
				work_id: zfd.repeatableOfType(zfd.numeric()),
			})
			.transform((parsed) => {
				const { work_id, ...project } = parsed;
				return {
					project,
					work_id,
				};
			})
			.safeParse(formData);
		console.log(parsed);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		// General project data.
		db.from('projects')
			.update(parsed.data.project)
			.eq('id', event.params.projectId)
			.single()
			.then((up) => {
				if (up.error) {
					return fail(STATUS_CODES.InternalServerError, up.error);
				}
			});
		// Project works.
		// Remove any works row not present in formData.
		await db
			.from('projects_works')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('work_id', 'in', toPgArr(parsed.data.work_id))
			.then((del) => {
				if (del.error) {
					return fail(STATUS_CODES.InternalServerError, del.error);
				} else {
					db.from('projects_works')
						.upsert(
							parsed.data.work_id.map((wid) => {
								return {
									project_id: event.params.projectId!,
									work_id: wid,
								};
							})
						)
						.then((up) => {
							if (up.error) {
								return fail(STATUS_CODES.InternalServerError, up.error);
							}
						});
				}
			});
		return { success: true };
	},
	delete: async (event) => {
		if (!event.locals.session) return fail(401);
		const formData = Object.fromEntries(await event.request.formData());
		if (!formData.id) return fail(401);
		const db = await getDb(event);
		const deleteRes = await db.from('projects').delete().eq('id', formData.id).single();
		if (deleteRes.error) throw error(500, deleteRes.error);
		throw redirect(301, '/editer');
	},
};

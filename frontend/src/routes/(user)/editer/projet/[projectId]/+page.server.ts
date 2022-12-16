import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { pgarr } from '$utils/format';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const updateSchema = zfd
	.formData({
		title: zfd.text(),
		type_id: zfd.numeric(z.number().optional()),
		cost_range: zfd.json(z.tuple([z.number().nonnegative(), z.number().nonnegative()])),
		description: zfd.text(z.string().optional()),
		work_id: zfd.repeatableOfType(zfd.numeric()),
	})
	.transform((parsed) => {
		const { work_id, ...project } = parsed;
		return {
			project,
			work_id,
		};
	});

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		const db = await getDb(event);
		const parsed = updateSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		// General project data.
		const projectUpdate = await db.from('projects').update(parsed.data.project).single();
		if (projectUpdate.error) {
			return fail(STATUS_CODES.InternalServerError, projectUpdate.error);
		}
		// Project works.
		// Remove any works row not present in formData.
		const worksDelete = await db
			.from('projects_works')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('work_id', 'in', pgarr(parsed.data.work_id));
		if (worksDelete.error) {
			return fail(STATUS_CODES.InternalServerError, worksDelete.error);
		}
		// Append new ones
		const worksUpsert = await db.from('projects_works').upsert(
			parsed.data.work_id.map((wid) => {
				return {
					project_id: event.params.projectId!,
					work_id: wid,
				};
			})
		);
		if (worksUpsert.error) {
			return fail(STATUS_CODES.InternalServerError, worksUpsert.error);
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

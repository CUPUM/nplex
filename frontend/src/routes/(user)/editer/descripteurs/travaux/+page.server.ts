import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { error, fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { workIdsSchema } from '../../projet/[projectId]/common';
import type { Actions } from './$types';
import { workSchema } from './common';

export const actions: Actions = {
	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd.formData({}).safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const insert = db.from('');
	},
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = workSchema
			.transform(({ types_ids, id, ...w }) => {
				return {
					types_ids,
					id,
					w,
				};
			})
			.safeParse(formData);
		console.log(parsed);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const workUpdate = db.from('project_work').update(parsed.data.w).eq('id', parsed.data.id);
		const relationDelete = db
			.from('project_type_work')
			.delete()
			.eq('work_id', parsed.data.id)
			.not('type_id', 'in', toPgArr(parsed.data.types_ids));
		const relationInsert = db
			.from('project_type_work')
			.upsert(parsed.data.types_ids.map((t) => ({ work_id: parsed.data.id, type_id: t })));
		(await Promise.all([workUpdate, relationDelete, relationInsert])).reduce((acc, curr) => {
			if (curr.error) {
				acc.push(curr.error.message);
			}
			return acc;
		}, Array<string>(0));
	},
	delete: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				id: workIdsSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		console.log(parsed);
		const db = await getDb(event);
		const del = db
			.from('project_work')
			.delete({ count: 'exact' })
			.eq('id', parsed.data.id)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, { message: res.error.message });
				}
			});
	},
};

import { getDb } from '$utils/database/client';
import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { error, fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { EDITOR_FORM_ACTION } from '../../common';
import type { Actions } from './$types';
import {
	costRangeSchema,
	descriptionSchema,
	titleSchema,
	typeIdSchema,
	workIdsSchema,
} from './common';

export const actions: Actions = {
	/**
	 * Update full project and related tables.
	 */
	[EDITOR_FORM_ACTION]: async (event) => {
		const formData = await event.request.formData();
		console.log(formData.get('cost_range'));
		const parsed = zfd
			.formData({
				title: titleSchema,
				description: descriptionSchema,
				type_id: typeIdSchema,
				work_id: workIdsSchema,
				cost_range: costRangeSchema,
			})
			.transform(({ work_id, ...project }) => {
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
		const db = await getDb(event);
		// projects table
		const projectUpdate = db
			.from('projects')
			.update(parsed.data.project)
			.eq('id', event.params.projectId)
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, { ...res.error });
				}
			});
		// project_works table
		const worksDelete = db
			.from('projects_works')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('work_id', 'in', toPgArr(parsed.data.work_id))
			.then((del) => {
				if (del.error) {
					console.error(del.error);
					return fail(STATUS_CODES.InternalServerError, { ...del.error });
				}
				return db
					.from('projects_works')
					.upsert(
						parsed.data.work_id.map((work_id) => ({
							project_id: event.params.projectId,
							work_id,
						}))
					)
					.then((up) => {
						if (up.error) {
							console.error(up.error);
							return fail(STATUS_CODES.InternalServerError, { ...up.error });
						}
					});
			});
	},
};

import { STATUS_CODES } from '$utils/enums';
import { toPgArr } from '$utils/format';
import { errorMessages } from '$utils/validation';
import { fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { EDITOR_FORM_ACTION } from '../../../common';

const projectIndicatorsSchema = zfd.formData({
	indicator_id: zfd.repeatableOfType(zfd.numeric()),
});

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const formData = await event.request.formData();
		const parsed = projectIndicatorsSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}

		const del = event.locals.db
			.from('projects_exemplarity_indicators')
			.delete()
			.eq('project_id', event.params.projectId)
			.not('exemplarity_indicator_id', 'in', toPgArr(parsed.data.indicator_id))
			.then((res) => {
				// console.log(res);
				if (res.error) throw res.error;
			});

		const up = event.locals.db
			.from('projects_exemplarity_indicators')
			.upsert(
				parsed.data.indicator_id.map((ind) => ({
					exemplarity_indicator_id: ind,
					project_id: event.params.projectId,
				}))
			)
			.then((res) => {
				// console.log(res);
				if (res.error) throw res.error;
			});

		await Promise.all([del, up]).catch((rej) => console.error(rej));

		// // project_works table
		// const worksDelete = db
		// 	.from('projects_works')
		// 	.delete()
		// 	.eq('project_id', event.params.projectId)
		// 	.not('work_id', 'in', toPgArr(parsed.data.work_id))
		// 	.then((del) => {
		// 		if (del.error) {
		// 			console.error(del.error);
		// 			return fail(STATUS_CODES.InternalServerError, { ...del.error });
		// 		}
		// 		return db
		// 			.from('projects_works')
		// 			.upsert(
		// 				parsed.data.work_id.map((work_id) => ({
		// 					project_id: event.params.projectId,
		// 					work_id,
		// 				}))
		// 			)
		// 			.then((up) => {
		// 				if (up.error) {
		// 					console.error(up.error);
		// 					return fail(STATUS_CODES.InternalServerError, { ...up.error });
		// 				}
		// 			});
	},
};

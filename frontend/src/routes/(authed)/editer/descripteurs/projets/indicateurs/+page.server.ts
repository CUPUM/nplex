import { STATUS_CODES } from '$utils/enums';
import { failureMessages } from '$utils/validation';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { INDICATORS_KEY, INDICATORS_KEY_NEW } from './constants';

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				[INDICATORS_KEY]: z
					.record(
						z.string(),
						indicatorBaseSchema.extend({
							id: zfd.numeric(),
						})
					)
					.transform((o) => Object.values(o)),
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { messages: { error: failureMessages(parsed.error) } });
		}
		const up = event.locals.db
			.from('project_exemplarity_indicator')
			.upsert(parsed.data[INDICATORS_KEY])
			.then((res) => {
				if (res.error) {
					throw error(STATUS_CODES.InternalServerError, res.error);
				}
				return { updated: true };
			});

		return await up;
	},

	create: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				[INDICATORS_KEY_NEW]: indicatorBaseSchema,
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadGateway, { messages: { error: failureMessages(parsed.error) } });
		}
		const ins = await event.locals.db
			.from('project_exemplarity_indicator')
			.insert(parsed.data[INDICATORS_KEY_NEW]);
		if (ins.error) {
			throw error(STATUS_CODES.InternalServerError, ins.error);
		}
		return { created: true };
	},

	delete: async (event) => {
		const indicatorId = event.url.searchParams.get('id');
		if (!indicatorId) {
			fail(STATUS_CODES.BadRequest, {
				messages: {
					error: ["Aucun identificateur d'indicateur trouvé dans la requête pour supprimer."],
				},
			});
		}
		const del = await event.locals.db
			.from('project_exemplarity_indicator')
			.delete()
			.eq('id', indicatorId);
		if (del.error) {
			throw error(STATUS_CODES.InternalServerError, del.error);
		}
		return { deleted: true };
	},
};

import { getDb } from '$utils/database';
import { STATUS_CODES } from '$utils/enums';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

const updateSchema = zfd
	.formData({
		site_ownership_id: zfd.numeric(z.number().optional()),
		site_usage_category_id: zfd.numeric(z.number().optional()),
		site_usage_id: zfd.numeric(z.number().optional()),
		secondary_usages: zfd.numeric(z.number()),
	})
	.refine((data) => {
		if (typeof data.site_usage_id === 'number' && typeof data.site_usage_category_id !== 'number') {
			return "Vous devez définir une catégorie d'usage pour pouvoir assigner un usage au site";
		}
	})
	.transform((parsed) => {
		const { ...project } = parsed;
		return {
			project,
		};
	});

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const formData = await event.request.formData();
		const parsed = updateSchema.safeParse(formData);
		if (!parsed.success) {
			throw error(STATUS_CODES.InternalServerError, parsed.error);
			// return fail(STATUS_CODES.BadRequest, parsed.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const projectUpdate = await db
			.from('projects')
			.update({
				id: event.params.projectId,
				...parsed.data.project,
				test: '',
			})
			.eq('id', event.params.projectId)
			.single();
		if (projectUpdate.error) {
			throw error(STATUS_CODES.InternalServerError, projectUpdate.error);
		}
	},
};

import {
	INDICATOR_LABEL_MAX,
	INDICATOR_TITLE_MAX,
} from '$routes/(authed)/editer/(editor)/descripteurs/projets/indicateurs/common';
import { STATUS_CODES } from '$utils/enums';
import { errorMessages } from '$utils/validation';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const indicatorBaseSchema = z.object({
	category_id: zfd.numeric(),
	title: zfd.text(
		z
			.string()
			.max(
				INDICATOR_TITLE_MAX,
				`Le titre d‘un indicateur ne peut pas comporter plus que ${INDICATOR_TITLE_MAX} caractères.`
			)
	),
	label: zfd.text(
		z
			.string()
			.max(
				INDICATOR_LABEL_MAX,
				`Le titre court d‘un indicateur ne peut pas comporter plus que ${INDICATOR_LABEL_MAX} caractères.`
			)
	),
	description: zfd.text(z.string().nullable().default(null)),
});

const indicatorsSchema = zfd.formData({
	indicators: z
		.record(
			z.string(),
			indicatorBaseSchema.extend({
				id: zfd.numeric(),
			})
		)
		.transform((o) => Object.values(o)),
	new: zfd.repeatableOfType(indicatorBaseSchema),
});

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = indicatorsSchema.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}

		const promises = [
			event.locals.db
				.from('project_exemplarity_indicator')
				.upsert(parsed.data.indicators)
				.then((res) => {
					if (res.error) {
						throw error(STATUS_CODES.InternalServerError, res.error);
					}
				}),
		];

		if (parsed.data.new.length) {
			promises.push(
				event.locals.db
					.from('project_exemplarity_indicator')
					.insert(parsed.data.new)
					.then((res) => {
						if (res.error) {
							throw error(STATUS_CODES.InternalServerError, res.error);
						}
					})
			);
		}

		await Promise.all(promises);
	},
	delete: async (event) => {
		const indicatorId = event.url.searchParams.get('id');
		if (!indicatorId) {
			fail(STATUS_CODES.BadRequest, {
				errorMessages: ["Aucun identificateur d'indicateur trouvé dans la requête pour supprimer."],
			});
		}
		const del = await event.locals.db
			.from('project_exemplarity_indicator')
			.delete()
			.eq('id', indicatorId);
		if (del.error) {
		}
	},
};

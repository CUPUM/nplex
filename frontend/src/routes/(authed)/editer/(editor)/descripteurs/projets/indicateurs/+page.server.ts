import { STATUS_CODES } from '$utils/enums';
import { errorMessages } from '$utils/validation';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const TITLE_MAX = 150;
const LABEL_MAX = 135;

const indicatorTitleSchema = zfd.text(
	z
		.string()
		.min(1, 'Les indicateurs doivent obligatoirement porter un titre.')
		.max(
			TITLE_MAX,
			`Le titre d‘un indicateur ne peut pas comporter plus que ${TITLE_MAX} caractères.`
		)
);

const indicatorLabelSchema = zfd.text(
	z
		.string()
		.min(1, 'Les indicateurs doivent obligatoirement porter un titre court.')
		.max(
			LABEL_MAX,
			`Le titre court d‘un indicateur ne peut pas comporter plus que ${LABEL_MAX} caractères.`
		)
);

const indicatorDescriptionSchema = zfd.text(z.string().optional());

const indicatorsSchema = zfd.formData({
	indicators: z
		.record(
			z.string(),
			z.object({
				id: zfd.numeric(),
				title: indicatorTitleSchema,
				label: indicatorLabelSchema,
				description: indicatorDescriptionSchema,
			})
		)
		.transform((o) => Object.values(o)),
	new: zfd.repeatableOfType(
		z.object({
			title: indicatorTitleSchema,
			label: indicatorLabelSchema,
			description: indicatorDescriptionSchema,
		})
	),
});

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = indicatorsSchema.safeParse(formData);
		if (!parsed.success) {
			console.error(parsed.error.formErrors.fieldErrors);
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}
		console.log(parsed.data.indicators);

		const indicators = event.locals.db
			.from('project_exemplarity_indicator')
			.upsert(parsed.data.indicators);
	},
};

import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
	INDICATORS_KEY,
	INDICATORS_KEY_NEW,
	INDICATOR_LABEL_MAX,
	INDICATOR_TITLE_MAX,
} from './constants';

const indicatorCategorySchema = zfd.numeric();

const indicatorTitleSchema = zfd.text(
	z
		.string()
		.max(
			INDICATOR_TITLE_MAX,
			`Le titre d‘un indicateur ne peut pas comporter plus que ${INDICATOR_TITLE_MAX} caractères.`
		)
);

const indicatorShortTitleSchema = zfd.text(
	z
		.string()
		.max(
			INDICATOR_LABEL_MAX,
			`Le titre court d‘un indicateur ne peut pas comporter plus que ${INDICATOR_LABEL_MAX} caractères.`
		)
);

const indicatorDescriptionSchema = zfd.text(z.string().nullable().default(null));

const indicatorBaseSchema = z.object({
	category: indicatorCategorySchema,
	title: indicatorTitleSchema,
	short_title: indicatorShortTitleSchema,
	description: indicatorDescriptionSchema,
});

export const desciptorIndicatorsUpdateSchema = zfd.formData({
	[INDICATORS_KEY]: z
		.record(
			z.string(),
			indicatorBaseSchema.extend({
				id: zfd.numeric(),
			})
		)
		.transform((o) => Object.values(o)),
});

export const descriptorIndicatorCreateSchema = zfd.formData({
	[INDICATORS_KEY_NEW]: indicatorBaseSchema,
});

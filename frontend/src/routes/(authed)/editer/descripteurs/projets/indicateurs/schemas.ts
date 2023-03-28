import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { INDICATOR_LABEL_MAX, INDICATOR_TITLE_MAX } from './constants';

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

export const descriptorIndicatorBaseSchema = z.object({
	category_id: indicatorCategorySchema,
	title: indicatorTitleSchema,
	short_label: indicatorShortTitleSchema,
	description: indicatorDescriptionSchema,
});

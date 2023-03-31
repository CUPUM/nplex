import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
	INTERVENTION_DESCRIPTION_MAX,
	INTERVENTION_TITLE_MAX,
	INTERVENTION_TITLE_MIN,
} from './common';

const interventionTitleSchema = zfd.text(
	z
		.string()
		.min(
			INTERVENTION_TITLE_MIN,
			`Les interventions de projet doivent avoir un titre comportant au minimum ${INTERVENTION_TITLE_MIN} caractères.`
		)
		.max(
			INTERVENTION_TITLE_MAX,
			`Les interventions de projet doivent avoir un titre qui ne dépasse pas ${INTERVENTION_TITLE_MAX} caractères.`
		)
);

const interventionDescriptionSchema = zfd.text(
	z
		.string()
		.max(
			INTERVENTION_DESCRIPTION_MAX,
			`La description d'une intervention ne peut pas dépasser ${INTERVENTION_DESCRIPTION_MAX} caractères.`
		)
		.optional()
);

const interventionMaybePermitSchema = z.boolean().default(false);

const interventionCategorySchema = zfd.numeric(z.number());

export const interventionUpdateSchema = zfd.formData({
	intervention: z
		.record(
			z.string(),
			z.object({
				title: interventionTitleSchema,
				description: interventionDescriptionSchema,
				maybe_permit: interventionMaybePermitSchema,
				category: interventionCategorySchema,
			})
		)
		.transform((o) => Object.entries(o).map(([k, v]) => ({ id: k, ...v }))),
});

export const interventionCreateSchema = zfd.formData({});

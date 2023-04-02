import { strictCoerceBooleanSchema } from '$utils/validation';
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
		.nullable()
		.default(null)
);

const interventionMaybePermitSchema = strictCoerceBooleanSchema.default(false);

const interventionIdSchema = zfd.numeric(z.number());

const interventionCategorySchema = zfd.numeric(z.number());

const projectTypeIdSchema = zfd.numeric(z.number());

const interventionByTypeSchema = zfd.repeatableOfType(projectTypeIdSchema);

export const interventionUpdateSchema = zfd.formData({
	intervention: z
		.record(
			z.string(),
			z.object({
				id: interventionIdSchema,
				title: interventionTitleSchema,
				description: interventionDescriptionSchema,
				maybe_permit: interventionMaybePermitSchema,
				category: interventionCategorySchema,
			})
		)
		.transform((o) => Object.values(o)),
	// project_types: z
	// 	.record(z.string(), interventionByTypeSchema)
	// 	.transform((pt) =>
	// 		Object.entries(pt).flatMap(([it, types]) =>
	// 			types.flatMap((t) => ({ type: t, intervention: Number(it) }))
	// 		)
	// 	),
});

export const interventionTypeSchema = zfd.formData({
	intervention: interventionIdSchema,
	type: projectTypeIdSchema,
});

export const interventionCreateSchema = zfd.formData({
	title: interventionTitleSchema,
	description: interventionDescriptionSchema,
	maybe_permit: interventionMaybePermitSchema,
	category: interventionCategorySchema,
	types: interventionByTypeSchema,
});

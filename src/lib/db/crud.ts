import { LOCALES_ARR } from '$lib/i18n/constants';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
	projectTypes,
	projectTypesTranslations,
	projects,
	projectsTranslations,
} from './schema/public';
import { withTranslationsSchema } from './utils';

// Descriptors

export const projectTypeInsertSchema = createInsertSchema(projectTypes, {});

export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations, {
	title: (s) => s.title.default(''),
});

export const projectTypesUpdateSchema = z.object({
	types: z
		.array(
			withTranslationsSchema(projectTypeInsertSchema, projectTypeTranslationInsertSchema).transform(
				(v) => {
					const translations = LOCALES_ARR.reduce((acc, locale) => {
						acc[locale].id = v.id;
						acc[locale].locale = locale;
						return acc;
					}, v.translations);
					return { ...v, translations };
				}
			)
		)
		.transform((v) => {
			v.forEach((d, i) => {
				d.index ??= i;
			});
			return v;
		}),
});

export const projectInterventionCategoryInsertSchema = createInsertSchema(
	projectInterventionCategories,
	{}
);

export const projectInterventionCategoryTranslationInsertSchema = createInsertSchema(
	projectInterventionCategoriesTranslations,
	{}
);

export const projectInterventionCategoriesUpdateSchema = z.object({
	interventionCategories: z.array(
		withTranslationsSchema(
			projectInterventionCategoryInsertSchema,
			projectInterventionCategoryTranslationInsertSchema
		)
	),
});

export const projectInterventionInsertSchema = createInsertSchema(projectInterventions, {});

export const projectInterventionTranslationInsertSchema = createInsertSchema(
	projectInterventionsTranslations,
	{}
);

export const projectInterventionsUpdateSchema = z.object({
	interventions: z.array(
		withTranslationsSchema(
			projectInterventionInsertSchema,
			projectInterventionTranslationInsertSchema
		)
	),
});

export const projectInterventionCategoriesAndInterventionsUpdateSchema =
	projectInterventionCategoriesUpdateSchema.merge(projectInterventionsUpdateSchema);

// Projects

export const projectInsertSchema = createInsertSchema(projects, {
	adjacentStreets: (s) => s.adjacentStreets.positive().max(5),
	adjacentAlleys: (s) => s.adjacentAlleys.positive().max(5),
});

export const projectTranslationInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(250),
	summary: (s) => s.summary.max(1500),
	description: (s) => s.description.max(5000),
});

export const projectUpdateSchema = withTranslationsSchema(
	projectInsertSchema,
	projectTranslationInsertSchema
);

// Organizations

// Users

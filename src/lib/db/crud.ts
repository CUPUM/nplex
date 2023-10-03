import { localeSchema } from '$lib/i18n/constants';
import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './schema/accounts';
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

export const projectTypeInsertSchema = createInsertSchema(projectTypes).required({ id: true });
export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations, {
	locale: localeSchema,
});
export const projectTypesUpdateSchema = z.object({
	types: z.array(
		withTranslationsSchema(projectTypeInsertSchema, projectTypeTranslationInsertSchema)
	),
});

export const projectInterventionCategoryInsertSchema = createInsertSchema(
	projectInterventionCategories,
	{}
).required({ id: true });
export const projectInterventionCategoryTranslationInsertSchema = createInsertSchema(
	projectInterventionCategoriesTranslations,
	{ locale: localeSchema }
);
export const projectInterventionCategoriesUpdateSchema = z.object({
	interventionCategories: z.array(
		withTranslationsSchema(
			projectInterventionCategoryInsertSchema,
			projectInterventionCategoryTranslationInsertSchema
		)
	),
});

export const projectInterventionInsertSchema = createInsertSchema(
	projectInterventions,
	{}
).required({ id: true, categoryId: true });
export const projectInterventionTranslationInsertSchema = createInsertSchema(
	projectInterventionsTranslations,
	{ locale: localeSchema }
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
}).required({ id: true });
export const projectTranslationsInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(250),
	summary: (s) => s.summary.max(1500),
	description: (s) => s.description.max(5000),
	locale: localeSchema,
});

export const projectUpdateSchema = withTranslationsSchema(
	projectInsertSchema,
	projectTranslationsInsertSchema
);

// Organizations

// Users

export type SelectUser = InferSelectModel<typeof users>;

export const usersInsertSchema = createInsertSchema(users, {
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});

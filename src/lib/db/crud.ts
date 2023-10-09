import { localeSchema } from '$lib/i18n/constants';
import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './schema/accounts';
import {
	organizationTypes,
	organizationTypesTranslations,
	organizations,
	organizationsTranslations,
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventionCategories,
	projectInterventionCategoriesTranslations,
	projectInterventions,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesTranslations,
	projects,
	projectsTranslations,
} from './schema/public';
import { withTranslationsSchema } from './utils';

/** Project type. */
export const projectTypeInsertSchema = createInsertSchema(projectTypes).required({ id: true });
export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations, {
	locale: localeSchema,
});
export const projectTypesUpdateSchema = z.object({
	types: z.array(
		withTranslationsSchema(projectTypeInsertSchema, projectTypeTranslationInsertSchema)
	),
});

/** Project intervention. */
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

/** Project intervention category. */
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

export const projectInterventionCategoriesWithInterventionsUpdateSchema = z.object({
	interventionCategories: z.array(
		withTranslationsSchema(
			projectInterventionCategoryInsertSchema,
			projectInterventionCategoryTranslationInsertSchema
		).merge(projectInterventionsUpdateSchema)
	),
});

// export const projectInterventionCategoriesAndInterventionsUpdateSchema =
// 	projectInterventionCategoriesUpdateSchema.merge(projectInterventionsUpdateSchema);

/** Project exemplarity category. */
export const projectExemplarityCategoryInsertSchema = createInsertSchema(
	projectExemplarityCategories
).required({ id: true });
export const projectExemplarityCategoryTranslationInsertSchema = createInsertSchema(
	projectExemplarityCategoriesTranslations,
	{ locale: localeSchema }
);
export const projectExemplarityCategoriesUpdateSchema = z.object({
	exemplarityCategories: z.array(
		withTranslationsSchema(
			projectExemplarityCategoryInsertSchema,
			projectExemplarityCategoryTranslationInsertSchema
		)
	),
});

/** Project Exemplarity indicator. */
export const projectExemplarityIndicatorInsertSchema = createInsertSchema(
	projectExemplarityIndicators
).required({ id: true, categoryId: true });
export const projectExemplarityIndicatorTranslationInsertSchema = createInsertSchema(
	projectExemplarityIndicatorsTranslations,
	{ locale: localeSchema }
);
export const projectExemplarityIndicatorsUpdateSchema = z.object({
	indicators: z.array(
		withTranslationsSchema(
			projectExemplarityIndicatorInsertSchema,
			projectExemplarityIndicatorTranslationInsertSchema
		)
	),
});

// export const projectExemplarityCategoriesAndIndicatorsUpdateSchema =
// 	projectExemplarityCategoriesUpdateSchema.merge(projectExemplarityIndicatorsUpdateSchema);

export const projectExemplarityCategoriesWithIndicatorsUpdateSchema = z.object({
	exemplarityCategories: z.array(
		withTranslationsSchema(
			projectExemplarityCategoryInsertSchema,
			projectExemplarityCategoryTranslationInsertSchema
		).merge(projectExemplarityIndicatorsUpdateSchema)
	),
});

/** Project site ownership. */
export const projectSiteOwnershipInsertSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});
export const projectSiteOwnershipTranslationInsertSchema = createInsertSchema(
	projectSiteOwnershipsTranslations,
	{ locale: localeSchema }
);
export const projectSiteOwnershipsUpdateSchema = z.object({
	siteOwnerships: z.array(
		withTranslationsSchema(
			projectSiteOwnershipInsertSchema,
			projectSiteOwnershipTranslationInsertSchema
		)
	),
});

/** Project building implantation. */
export const projectImplantationTypeInsertSchema = createInsertSchema(
	projectImplantationTypes
).required({
	id: true,
});
export const projectImplantationTypeTranslationInsertSchema = createInsertSchema(
	projectImplantationTypesTranslations,
	{ locale: localeSchema }
);
export const projectImplantationTypesUpdateSchema = z.object({
	implantationTypes: z.array(
		withTranslationsSchema(
			projectImplantationTypeInsertSchema,
			projectImplantationTypeTranslationInsertSchema
		)
	),
});

/** Project image type. */
export const projectImageTypeInsertSchema = createInsertSchema(projectImageTypes).required({
	id: true,
});
export const projectImageTypeTranslationInsertSchema = createInsertSchema(
	projectImageTypesTranslations,
	{ locale: localeSchema }
);
export const projectImageTypesUpdateSchema = z.object({
	imageTypes: z.array(
		withTranslationsSchema(projectImageTypeInsertSchema, projectImageTypeTranslationInsertSchema)
	),
});

/** Project image type. */
export const projectImageTemporalityInsertSchema = createInsertSchema(
	projectImageTemporalities
).required({
	id: true,
});
export const projectImageTemporalityTranslationInsertSchema = createInsertSchema(
	projectImageTemporalitiesTranslations,
	{ locale: localeSchema }
);
export const projectImageTemporalitiesUpdateSchema = z.object({
	imageTemporalities: z.array(
		withTranslationsSchema(
			projectImageTemporalityInsertSchema,
			projectImageTemporalityTranslationInsertSchema
		)
	),
});

/** Project building level type. */
export const projectBuildingLevelTypeInsertSchema = createInsertSchema(
	projectBuildingLevelTypes
).required({
	id: true,
});
export const projectBuildingLevelTypeTranslationInsertSchema = createInsertSchema(
	projectBuildingLevelTypesTranslations,
	{ locale: localeSchema }
);
export const projectBuildingLevelTypesUpdateSchema = z.object({
	buildingLevelTypes: z.array(
		withTranslationsSchema(
			projectBuildingLevelTypeInsertSchema,
			projectBuildingLevelTypeTranslationInsertSchema
		)
	),
});

/** Projects. */
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

export const projectGeneralUpdateSchema = withTranslationsSchema(
	projectInsertSchema.pick({ id: true, typeId: true, costRange: true, siteOwnershipId: true }),
	projectTranslationsInsertSchema
);
// export const projectPlaceUpdateSchema =

/** Projects interventions. */

/** Projects exemplarity indicators. */

/** Projects images credits. */

/** Organization types. */
export const organizationTypeInsertSchema = createInsertSchema(organizationTypes).required({
	id: true,
});
export const organizationTypeTranslationInsertSchema = createInsertSchema(
	organizationTypesTranslations,
	{ locale: localeSchema }
);
export const organizationTypesUpdateSchema = z.object({
	types: z.array(
		withTranslationsSchema(organizationTypeInsertSchema, organizationTypeTranslationInsertSchema)
	),
});

/** Organizations. */
export const organizationInsertSchema = createInsertSchema(organizations).required({
	id: true,
});
export const organizationTranslationInsertSchema = createInsertSchema(organizationsTranslations, {
	locale: localeSchema,
});
export const organizationsUpdateSchema = withTranslationsSchema(
	organizationInsertSchema,
	organizationTranslationInsertSchema
);

/** User. */
export const usersInsertSchema = createInsertSchema(users, {
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});
export type SelectUser = InferSelectModel<typeof users>;

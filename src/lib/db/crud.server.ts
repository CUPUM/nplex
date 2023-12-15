import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
	PROJECT_COST_MAX,
	PROJECT_COST_MIN,
	PROJECT_DESCRIPTION_MAX,
	PROJECT_SUMMARY_MAX,
	PROJECT_TITLE_MAX,
} from './constants';
import { users, usersRolesRequests } from './schema/accounts';
import { rangeSchema } from './schema/custom-types';
import { translationLangColumnSchema } from './schema/i18n';
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
	projects,
	projectsExemplarityIndicators,
	projectsImages,
	projectsImagesTranslations,
	projectsInterventions,
	projectsOrganizations,
	projectsTranslations,
} from './schema/public';
import { withTranslationsSchema } from './validation.server';

/**
 * Project intervention.
 */
export const projectInterventionInsertSchema = createInsertSchema(
	projectInterventions,
	{}
).required({ id: true, categoryId: true });
export const projectInterventionTranslationInsertSchema = createInsertSchema(
	projectInterventionsTranslations,
	{ ...translationLangColumnSchema }
);
export const projectInterventionsUpdateSchema = z.object({
	interventions: withTranslationsSchema(
		projectInterventionInsertSchema,
		projectInterventionTranslationInsertSchema
	).array(),
});

/**
 * Project intervention category.
 */
export const projectInterventionCategoryInsertSchema = createInsertSchema(
	projectInterventionCategories,
	{}
).required({ id: true });
export const projectInterventionCategoryTranslationInsertSchema = createInsertSchema(
	projectInterventionCategoriesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectInterventionCategoriesUpdateSchema = z.object({
	interventionCategories: withTranslationsSchema(
		projectInterventionCategoryInsertSchema,
		projectInterventionCategoryTranslationInsertSchema
	).array(),
});

export const projectInterventionCategoriesWithInterventionsUpdateSchema = z.object({
	interventionCategories: withTranslationsSchema(
		projectInterventionCategoryInsertSchema,
		projectInterventionCategoryTranslationInsertSchema
	)
		.merge(projectInterventionsUpdateSchema)
		.array(),
});

// export const projectInterventionCategoriesAndInterventionsUpdateSchema =
// 	projectInterventionCategoriesUpdateSchema.merge(projectInterventionsUpdateSchema);

/**
 * Project exemplarity category.
 */
export const projectExemplarityCategoryInsertSchema = createInsertSchema(
	projectExemplarityCategories
).required({ id: true });
export const projectExemplarityCategoryTranslationInsertSchema = createInsertSchema(
	projectExemplarityCategoriesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectExemplarityCategoriesUpdateSchema = z.object({
	exemplarityCategories: withTranslationsSchema(
		projectExemplarityCategoryInsertSchema,
		projectExemplarityCategoryTranslationInsertSchema
	).array(),
});

/**
 * Project Exemplarity indicator.
 */
export const projectExemplarityIndicatorInsertSchema = createInsertSchema(
	projectExemplarityIndicators
).required({ id: true, categoryId: true });
export const projectExemplarityIndicatorTranslationInsertSchema = createInsertSchema(
	projectExemplarityIndicatorsTranslations,
	{ ...translationLangColumnSchema }
);
export const projectExemplarityIndicatorsUpdateSchema = z.object({
	indicators: withTranslationsSchema(
		projectExemplarityIndicatorInsertSchema,
		projectExemplarityIndicatorTranslationInsertSchema
	).array(),
});

// export const projectExemplarityCategoriesAndIndicatorsUpdateSchema =
// 	projectExemplarityCategoriesUpdateSchema.merge(projectExemplarityIndicatorsUpdateSchema);

export const projectExemplarityCategoriesWithIndicatorsUpdateSchema = z.object({
	exemplarityCategories: withTranslationsSchema(
		projectExemplarityCategoryInsertSchema,
		projectExemplarityCategoryTranslationInsertSchema
	)
		.merge(projectExemplarityIndicatorsUpdateSchema)
		.array(),
});

export const projectSiteOwnershipsSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});

export const projectSiteOwnershipsTranslationsSchema = createInsertSchema(
	projectSiteOwnershipsTranslations,
	{ ...translationLangColumnSchema }
);

/**
 * Project building implantation.
 */
export const projectImplantationTypeInsertSchema = createInsertSchema(
	projectImplantationTypes
).required({
	id: true,
});
export const projectImplantationTypeTranslationInsertSchema = createInsertSchema(
	projectImplantationTypesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectImplantationTypesUpdateSchema = z.object({
	implantationTypes: withTranslationsSchema(
		projectImplantationTypeInsertSchema,
		projectImplantationTypeTranslationInsertSchema
	).array(),
});

/**
 * Project image type.
 */
export const projectImageTypeInsertSchema = createInsertSchema(projectImageTypes).required({
	id: true,
});
export const projectImageTypeTranslationInsertSchema = createInsertSchema(
	projectImageTypesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectImageTypesUpdateSchema = z.object({
	imageTypes: withTranslationsSchema(
		projectImageTypeInsertSchema,
		projectImageTypeTranslationInsertSchema
	).array(),
});

/**
 * Project image type.
 */
export const projectImageTemporalityInsertSchema = createInsertSchema(
	projectImageTemporalities
).required({
	id: true,
});
export const projectImageTemporalityTranslationInsertSchema = createInsertSchema(
	projectImageTemporalitiesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectImageTemporalitiesUpdateSchema = z.object({
	imageTemporalities: withTranslationsSchema(
		projectImageTemporalityInsertSchema,
		projectImageTemporalityTranslationInsertSchema
	).array(),
});

/**
 * Project building level type.
 */
export const projectBuildingLevelTypeInsertSchema = createInsertSchema(
	projectBuildingLevelTypes
).required({
	id: true,
});
export const projectBuildingLevelTypeTranslationInsertSchema = createInsertSchema(
	projectBuildingLevelTypesTranslations,
	{ ...translationLangColumnSchema }
);
export const projectBuildingLevelTypesUpdateSchema = z.object({
	buildingLevelTypes: withTranslationsSchema(
		projectBuildingLevelTypeInsertSchema,
		projectBuildingLevelTypeTranslationInsertSchema
	).array(),
});

/**
 * Projects.
 */
export const projectsInsertSchema = createInsertSchema(projects, {
	adjacentStreets: (s) => s.adjacentStreets.positive().max(5),
	adjacentAlleys: (s) => s.adjacentAlleys.positive().max(5),
	costRange: () =>
		rangeSchema({ min: PROJECT_COST_MIN, max: PROJECT_COST_MAX, ordered: true }).default([
			null,
			null,
		]),
}).required({ id: true, costRange: true });
export const projectsTranslationsInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(PROJECT_TITLE_MAX),
	summary: (s) => s.summary.max(PROJECT_SUMMARY_MAX),
	description: (s) => s.description.max(PROJECT_DESCRIPTION_MAX),
	...translationLangColumnSchema,
}).omit({ ts: true });
export const projectsUpdateSchema = withTranslationsSchema(
	projectsInsertSchema,
	projectsTranslationsInsertSchema
);

export const projectsInterventionsInsertSchema = createInsertSchema(projectsInterventions);

export const projectGeneralUpdateSchema = projectsUpdateSchema
	.pick({ id: true, typeId: true, costRange: true, siteOwnershipId: true, translations: true })
	.extend({ interventionIds: projectsInterventionsInsertSchema.shape.interventionId.array() });

/**
 * Projects exemplarity indicators.
 */
export const projectsExemplarityIndicatorsInsertSchema = createInsertSchema(
	projectsExemplarityIndicators
);
export const projectsExemplarityIndicatorsUpdateSchema = z.object({
	indicatorIds: projectsExemplarityIndicatorsInsertSchema.shape.exemplarityIndicatorId.array(),
});

/**
 * Projects images.
 */
export const projectsImagesInsertSchema = createInsertSchema(projectsImages);
export const projectsImagesTranslationInsertSchema = createInsertSchema(
	projectsImagesTranslations,
	{
		...translationLangColumnSchema,
	}
);
export const projectsImagesUpdateSchema = withTranslationsSchema(
	projectsImagesInsertSchema,
	projectsImagesTranslationInsertSchema
);

/**
 * Appending new project images.
 */
export const projectsImagesInsertManySchema = z.object({
	images: projectsImagesInsertSchema
		.pick({
			storageName: true,
			palette: true,
			height: true,
			width: true,
		})
		.array()
		.min(1),
});

/**
 * Updating general project gallery.
 *
 * - Toggle image as project banner.
 * - Delete image(s).
 * - ...add as needed.
 */
export const projectsGalleryUpdateSchema = z.object({
	deleteId: projectsImagesUpdateSchema.shape.id.optional(),
	bannerId: projectsUpdateSchema.shape.bannerId.optional(),
});
export type ProjectsGalleryUpdateSchema = typeof projectsGalleryUpdateSchema;

/**
 * Projects organizations.
 */
export const projectsOrganizationInsertSchema = createInsertSchema(projectsOrganizations);
// export const projectsUsersInsertSchema = createInsertSchema(projectsUsers);
export const projectsContributionsUpdateSchema = z.object({
	organizationIds: projectsOrganizationInsertSchema.shape.organizationId.array(),
});

/**
 * Organization types.
 */
export const organizationTypeInsertSchema = createInsertSchema(organizationTypes).required({
	id: true,
});
export const organizationTypeTranslationInsertSchema = createInsertSchema(
	organizationTypesTranslations,
	{ ...translationLangColumnSchema }
);
export const organizationTypesUpdateSchema = z.object({
	types: z.array(
		withTranslationsSchema(organizationTypeInsertSchema, organizationTypeTranslationInsertSchema)
	),
});

/**
 * Organizations.
 */
export const organizationInsertSchema = createInsertSchema(organizations).required({
	id: true,
});
export const organizationTranslationInsertSchema = createInsertSchema(organizationsTranslations, {
	...translationLangColumnSchema,
});
export const organizationGeneralUpdateSchema = withTranslationsSchema(
	organizationInsertSchema,
	organizationTranslationInsertSchema
);

export const usersSchema = createInsertSchema(users, {
	firstName: (s) => s.firstName.trim(),
	middleName: (s) => s.middleName.trim(),
	lastName: (s) => s.lastName.trim(),
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});

export type SelectUser = InferSelectModel<typeof users>;

export const usersRolesRequestSchema = createInsertSchema(usersRolesRequests);

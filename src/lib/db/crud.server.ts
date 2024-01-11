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
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
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

// TO DO: progressively deprecate in favor of validation.server.ts

/**
 * Project intervention.
 *
 * @deprecated
 */
export const projectInterventionInsertSchema = createInsertSchema(
	projectInterventions,
	{}
).required({ id: true, categoryId: true });
/**
 * @deprecated
 */
export const projectInterventionTranslationInsertSchema = createInsertSchema(
	projectInterventionsTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
	projectInterventionsCategories,
	{}
).required({ id: true });
/**
 * @deprecated
 */
export const projectInterventionCategoryTranslationInsertSchema = createInsertSchema(
	projectInterventionsCategoriesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
export const projectInterventionCategoriesUpdateSchema = z.object({
	interventionCategories: withTranslationsSchema(
		projectInterventionCategoryInsertSchema,
		projectInterventionCategoryTranslationInsertSchema
	).array(),
});

/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectExemplarityCategoryTranslationInsertSchema = createInsertSchema(
	projectExemplarityCategoriesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectExemplarityIndicatorTranslationInsertSchema = createInsertSchema(
	projectExemplarityIndicatorsTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
export const projectExemplarityIndicatorsUpdateSchema = z.object({
	indicators: withTranslationsSchema(
		projectExemplarityIndicatorInsertSchema,
		projectExemplarityIndicatorTranslationInsertSchema
	).array(),
});

// export const projectExemplarityCategoriesAndIndicatorsUpdateSchema =
// 	projectExemplarityCategoriesUpdateSchema.merge(projectExemplarityIndicatorsUpdateSchema);

/**
 * @deprecated
 */
export const projectExemplarityCategoriesWithIndicatorsUpdateSchema = z.object({
	exemplarityCategories: withTranslationsSchema(
		projectExemplarityCategoryInsertSchema,
		projectExemplarityCategoryTranslationInsertSchema
	)
		.merge(projectExemplarityIndicatorsUpdateSchema)
		.array(),
});

/**
 * @deprecated
 */
export const projectSiteOwnershipsSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});

/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectImplantationTypeTranslationInsertSchema = createInsertSchema(
	projectImplantationTypesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectImageTypeTranslationInsertSchema = createInsertSchema(
	projectImageTypesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectImageTemporalityTranslationInsertSchema = createInsertSchema(
	projectImageTemporalitiesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectBuildingLevelTypeTranslationInsertSchema = createInsertSchema(
	projectBuildingLevelTypesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const projectsTranslationsInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(PROJECT_TITLE_MAX),
	summary: (s) => s.summary.max(PROJECT_SUMMARY_MAX),
	description: (s) => s.description.max(PROJECT_DESCRIPTION_MAX),
	...translationLangColumnSchema,
}).omit({ ts: true });
/**
 * @deprecated
 */
export const projectsUpdateSchema = withTranslationsSchema(
	projectsInsertSchema,
	projectsTranslationsInsertSchema
);

/**
 * @deprecated
 */
export const projectsInterventionsInsertSchema = createInsertSchema(projectsInterventions);

/**
 * @deprecated
 */
export const projectGeneralUpdateSchema = projectsUpdateSchema
	.pick({ id: true, typeId: true, costRange: true, siteOwnershipId: true, translations: true })
	.extend({ interventionIds: projectsInterventionsInsertSchema.shape.interventionId.array() });

/**
 * Projects exemplarity indicators.
 */
export const projectsExemplarityIndicatorsInsertSchema = createInsertSchema(
	projectsExemplarityIndicators
);
/**
 * @deprecated
 */
export const projectsExemplarityIndicatorsUpdateSchema = z.object({
	indicatorIds: projectsExemplarityIndicatorsInsertSchema.shape.exemplarityIndicatorId.array(),
});

/**
 * Projects images.
 */
export const projectsImagesInsertSchema = createInsertSchema(projectsImages);
/**
 * @deprecated
 */
export const projectsImagesTranslationInsertSchema = createInsertSchema(
	projectsImagesTranslations,
	{
		...translationLangColumnSchema,
	}
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export type ProjectsGalleryUpdateSchema = typeof projectsGalleryUpdateSchema;

/**
 * Projects organizations.
 */
export const projectsOrganizationInsertSchema = createInsertSchema(projectsOrganizations);
// export const projectsUsersInsertSchema = createInsertSchema(projectsUsers);
/**
 * @deprecated
 */
export const projectsContributionsUpdateSchema = z.object({
	organizationIds: projectsOrganizationInsertSchema.shape.organizationId.array(),
});

/**
 * Organization types.
 */
export const organizationTypeInsertSchema = createInsertSchema(organizationTypes).required({
	id: true,
});
/**
 * @deprecated
 */
export const organizationTypeTranslationInsertSchema = createInsertSchema(
	organizationTypesTranslations,
	{ ...translationLangColumnSchema }
);
/**
 * @deprecated
 */
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
/**
 * @deprecated
 */
export const organizationTranslationInsertSchema = createInsertSchema(organizationsTranslations, {
	...translationLangColumnSchema,
});
/**
 * @deprecated
 */
export const organizationGeneralUpdateSchema = withTranslationsSchema(
	organizationInsertSchema,
	organizationTranslationInsertSchema
);

/**
 * @deprecated
 */
export const usersSchema = createInsertSchema(users, {
	firstName: (s) => s.firstName.trim(),
	middleName: (s) => s.middleName.trim(),
	lastName: (s) => s.lastName.trim(),
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});

export type SelectUser = InferSelectModel<typeof users>;

export const usersRolesRequestSchema = createInsertSchema(usersRolesRequests);

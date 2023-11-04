import { localeSchema } from '$lib/i18n/constants';
import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users, usersRolesRequests } from './schema/accounts';
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
	projectsExemplarityIndicators,
	projectsImages,
	projectsImagesTranslations,
	projectsInterventions,
	projectsOrganizations,
	projectsTranslations,
} from './schema/public';
import { withTranslationsSchema } from './validation.server';

/**
 * Project type.
 */
export const projectTypeInsertSchema = createInsertSchema(projectTypes).required({ id: true });
export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations, {
	locale: localeSchema,
});
export const projectTypesUpdateSchema = z.object({
	types: withTranslationsSchema(
		projectTypeInsertSchema,
		projectTypeTranslationInsertSchema
	).array(),
});

/**
 * Project intervention.
 */
export const projectInterventionInsertSchema = createInsertSchema(
	projectInterventions,
	{}
).required({ id: true, categoryId: true });
export const projectInterventionTranslationInsertSchema = createInsertSchema(
	projectInterventionsTranslations,
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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

/**
 * Project site ownership.
 */
export const projectSiteOwnershipInsertSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});
export const projectSiteOwnershipTranslationInsertSchema = createInsertSchema(
	projectSiteOwnershipsTranslations,
	{ locale: localeSchema }
);
export const projectSiteOwnershipsUpdateSchema = z.object({
	siteOwnerships: withTranslationsSchema(
		projectSiteOwnershipInsertSchema,
		projectSiteOwnershipTranslationInsertSchema
	).array(),
});

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
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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
	{ locale: localeSchema }
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
}).required({ id: true });
export const projectsTranslationsInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(250),
	summary: (s) => s.summary.max(1500),
	description: (s) => s.description.max(5000),
	locale: localeSchema,
});
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
		locale: localeSchema,
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
	images: projectsImagesInsertSchema.pick({ storageName: true }).array().min(1),
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
	{ locale: localeSchema }
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
	locale: localeSchema,
});
export const organizationGeneralUpdateSchema = withTranslationsSchema(
	organizationInsertSchema,
	organizationTranslationInsertSchema
);

/**
 * User.
 */
export const usersInsertSchema = createInsertSchema(users, {
	email: (s) => s.email.email(),
	publicEmail: (s) => s.publicEmail.email(),
});
export type SelectUser = InferSelectModel<typeof users>;

export const userGeneralUpdateSchema = usersInsertSchema.pick({
	firstName: true,
	middleName: true,
	lastName: true,
	publicEmail: true,
});

export const usersRolesRequestInsertSchema = createInsertSchema(usersRolesRequests);

export const userPermissionsUpdate = z.object({
	role: usersInsertSchema.shape.role,
	requestedAt: usersRolesRequestInsertSchema.shape.requestAt.nullable(),
	requestedRole: usersRolesRequestInsertSchema.shape.requestedRole.nullable(),
});

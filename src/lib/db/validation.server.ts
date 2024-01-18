import { availableLanguageTags } from '$i18n/runtime';
import type { langSchema } from '$lib/i18n/validation';
import { strictRecord } from '$lib/utils/zod';
import { createInsertSchema } from 'drizzle-zod';
import { type ZodObject, type ZodTypeAny } from 'zod';
import {
	PROJECT_BUILDING_LEVELS_HEIGHT_MAX,
	PROJECT_BUILDING_LEVELS_HEIGHT_MIN,
	PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MAX,
	PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MIN,
	PROJECT_COST_MAX,
	PROJECT_COST_MIN,
	PROJECT_DESCRIPTION_MAX,
	PROJECT_SUMMARY_MAX,
	PROJECT_TITLE_MAX,
} from './constants';
import { rangeSchema } from './schema/custom-types';
import {
	organizationTypes,
	organizationTypesTranslations,
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
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
	projectTypes,
	projectTypesTranslations,
	projects,
	projectsBuildingLevels,
	projectsExemplarityIndicators,
	projectsImages,
	projectsInterventions,
	projectsTranslations,
	projectsUsers,
} from './schema/public';

/**
 * Extend the insert schema of a given ressource table with its corresponding translations. The
 * resulting schema should be isomorphic with {@link withTranslationsRelations}.
 */
export function withTranslationsSchema<
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny> & { lang: typeof langSchema },
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({
		translations: strictRecord(availableLanguageTags, (l) =>
			translationSchema
				.omit({ lang: true })
				.extend({ lang: translationSchema.shape.lang.default(l) })
		),
	});
}

//
// Projects descriptors
//

export const projectTypesSchema = createInsertSchema(projectTypes).required({ id: true });
export const projectTypesTranslationsSchema = createInsertSchema(projectTypesTranslations);
export const projectTypesWithTranslationsSchema = withTranslationsSchema(
	projectTypesSchema,
	projectTypesTranslationsSchema.omit({ id: true })
);
export const newProjectTypeSchema = projectTypesWithTranslationsSchema.omit({ id: true });

export const projectInterventionsSchema = createInsertSchema(projectInterventions).required({
	id: true,
});
export const projectInterventionsTranslationsSchema = createInsertSchema(
	projectInterventionsTranslations
);
export const projectInterventionsWithTranslationsSchema = withTranslationsSchema(
	projectInterventionsSchema,
	projectInterventionsTranslationsSchema.omit({ id: true })
).extend({
	projectTypesIds: projectTypesSchema.shape.id.array(),
});
export const newProjectInterventionSchema = projectInterventionsWithTranslationsSchema.omit({
	id: true,
});

export const projectInterventionsCategoriesSchema = createInsertSchema(
	projectInterventionsCategories
).required({ id: true });
export const projectInterventionsCategoriesTranslationsSchema = createInsertSchema(
	projectInterventionsCategoriesTranslations
);
export const projectInterventionsCategoriesWithTranslationsSchema = withTranslationsSchema(
	projectInterventionsCategoriesSchema,
	projectInterventionsCategoriesTranslationsSchema.omit({ id: true })
);
export const newProjectInterventionCategorySchema =
	projectInterventionsCategoriesWithTranslationsSchema.omit({
		id: true,
	});

export const projectExemplarityIndicatorsSchema = createInsertSchema(
	projectExemplarityIndicators
).required({ id: true });
export const projectExemplarityIndicatorsTranslationsSchema = createInsertSchema(
	projectExemplarityIndicatorsTranslations
);
export const projectExemplarityIndicatorsWithTranslationsSchema = withTranslationsSchema(
	projectExemplarityIndicatorsSchema,
	projectExemplarityIndicatorsTranslationsSchema.omit({ id: true })
);
export const newProjectExemplarityIndicatorSchema =
	projectExemplarityIndicatorsWithTranslationsSchema.omit({ id: true });

export const projectExemplarityCategoriesSchema = createInsertSchema(
	projectExemplarityCategories
).required({ id: true });
export const projectExemplarityCategoriesTranslationsSchema = createInsertSchema(
	projectExemplarityCategoriesTranslations
);
export const projectExemplarityCategoriesWithTranslationsSchema = withTranslationsSchema(
	projectExemplarityCategoriesSchema,
	projectExemplarityCategoriesTranslationsSchema.omit({ id: true })
);
export const newProjectExemplarityCategorySchema =
	projectExemplarityCategoriesWithTranslationsSchema.omit({
		id: true,
	});

export const projectSiteOwnershipsSchema = createInsertSchema(projectSiteOwnerships).required({
	id: true,
});
export const projectSiteOwnershipsTranslationsSchema = createInsertSchema(
	projectSiteOwnershipsTranslations
);
export const projectSiteOwnershipsWithTranslationsSchema = withTranslationsSchema(
	projectSiteOwnershipsSchema,
	projectSiteOwnershipsTranslationsSchema.omit({ id: true })
);
export const newProjectSiteOwnershipSchema = projectSiteOwnershipsWithTranslationsSchema.omit({
	id: true,
});

export const projectImplantationTypesSchema = createInsertSchema(projectImplantationTypes).required(
	{ id: true }
);
export const projectImplantationTypesTranslationsSchema = createInsertSchema(
	projectImplantationTypesTranslations
);
export const projectImplantationTypesWithTranslationsSchema = withTranslationsSchema(
	projectImplantationTypesSchema,
	projectImplantationTypesTranslationsSchema.omit({ id: true })
);
export const newProjectImplantationTypeSchema = projectImplantationTypesWithTranslationsSchema.omit(
	{ id: true }
);

export const projectBuildingLevelTypesSchema = createInsertSchema(
	projectBuildingLevelTypes
).required({ id: true });
export const projectBuildingLevelTypesTranslationsSchema = createInsertSchema(
	projectBuildingLevelTypesTranslations
);
export const projectBuildingLevelTypesWithTranslationsSchema = withTranslationsSchema(
	projectBuildingLevelTypesSchema,
	projectBuildingLevelTypesTranslationsSchema.omit({ id: true })
);
export const newProjectBuildingLevelTypeSchema =
	projectBuildingLevelTypesWithTranslationsSchema.omit({ id: true });

export const projectImageTypesSchema = createInsertSchema(projectImageTypes).required({ id: true });
export const projectImageTypesTranslationsSchema = createInsertSchema(
	projectImageTypesTranslations
);
export const projectImageTypesWithTranslationsSchema = withTranslationsSchema(
	projectImageTypesSchema,
	projectImageTypesTranslationsSchema.omit({ id: true })
);
export const newProjectImageTypeSchema = projectImageTypesWithTranslationsSchema.omit({ id: true });

//
// Projects
//

export const projectsSchema = createInsertSchema(projects, {
	costRange: () => rangeSchema({ min: PROJECT_COST_MIN, max: PROJECT_COST_MAX, ordered: true }),
});
export const projectsTranslationsSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(PROJECT_TITLE_MAX),
	summary: (s) => s.summary.max(PROJECT_SUMMARY_MAX),
	description: (s) => s.description.max(PROJECT_DESCRIPTION_MAX),
});
export const projectsWithTranslationsSchema = withTranslationsSchema(
	projectsSchema,
	projectsTranslationsSchema.omit({ id: true })
);

export const projectsInterventionsSchema = createInsertSchema(projectsInterventions);

export const projectsBuildingLevelsSchema = createInsertSchema(projectsBuildingLevels, {
	verticalIndex: (s) =>
		s.verticalIndex
			.min(PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MIN)
			.max(PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MAX),
	height: (s) =>
		s.height.min(PROJECT_BUILDING_LEVELS_HEIGHT_MIN).max(PROJECT_BUILDING_LEVELS_HEIGHT_MAX),
});

export const projectsExemplarityIndicatorsSchema = createInsertSchema(
	projectsExemplarityIndicators
);

export const projectsImagesSchema = createInsertSchema(projectsImages, {
	index: (s) => s.index.positive(),
});

export const projectsUsersSchema = createInsertSchema(projectsUsers);

// Organizations descriptors

export const organizationTypesSchema = createInsertSchema(organizationTypes).required({ id: true });
export const organizationTypesTranslationsSchema = createInsertSchema(
	organizationTypesTranslations
);
export const organizationTypesWithTranslationsSchema = withTranslationsSchema(
	organizationTypesSchema,
	organizationTypesTranslationsSchema.omit({ id: true })
);
export const newOrganizationTypeSchema = organizationTypesWithTranslationsSchema.omit({ id: true });

// Organizations

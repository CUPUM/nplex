import { availableLanguageTags } from '$i18n/runtime';
import type { LangSchema } from '$lib/crud/validation/i18n';
import { strictRecord } from '$lib/crud/validation/utils';
import { intrangeSchema } from 'drizzle-orm-helpers/pg';
import { createInsertSchema } from 'drizzle-zod';
import type { ZodObject, ZodTypeAny } from 'zod';
import {
	LANG_COLUMN_NAME,
	PROJECT_ADJACENT_ALLEYS_MAX,
	PROJECT_ADJACENT_STREETS_MAX,
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
import { users } from './schema/auth';
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
 * resulting schema should be isomorphic with {@link withTranslations}.
 */
export function withTranslationsSchema<
	T extends Record<string, ZodTypeAny>,
	TT extends Record<string, ZodTypeAny> & { lang: LangSchema },
>(schema: ZodObject<T>, translationSchema: ZodObject<TT>) {
	return schema.extend({
		translations: strictRecord(availableLanguageTags, (lang) =>
			translationSchema
				.omit({ [LANG_COLUMN_NAME]: true })
				.extend({ [LANG_COLUMN_NAME]: translationSchema.shape[LANG_COLUMN_NAME].default(lang) })
		),
	});
}

// Projects descriptors

export const projectTypesSchema = createInsertSchema(projectTypes).required({ id: true });
export const projectTypesTranslationsSchema = createInsertSchema(projectTypesTranslations, {
	title: (s) => s.title.trim(),
	description: (s) => s.description.trim(),
});
export const projectTypesWithTranslationsSchema = withTranslationsSchema(
	projectTypesSchema,
	projectTypesTranslationsSchema.omit({ id: true })
);
export const newProjectTypeSchema = projectTypesWithTranslationsSchema.omit({ id: true });

export const projectInterventionsSchema = createInsertSchema(projectInterventions).required({
	id: true,
});
export const projectInterventionsTranslationsSchema = createInsertSchema(
	projectInterventionsTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectInterventionsCategoriesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectExemplarityIndicatorsTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectExemplarityCategoriesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectSiteOwnershipsTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectImplantationTypesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
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
	projectBuildingLevelTypesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);
export const projectBuildingLevelTypesWithTranslationsSchema = withTranslationsSchema(
	projectBuildingLevelTypesSchema,
	projectBuildingLevelTypesTranslationsSchema.omit({ id: true })
);
export const newProjectBuildingLevelTypeSchema =
	projectBuildingLevelTypesWithTranslationsSchema.omit({ id: true });

export const projectImageTypesSchema = createInsertSchema(projectImageTypes).required({ id: true });
export const projectImageTypesTranslationsSchema = createInsertSchema(
	projectImageTypesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);
export const projectImageTypesWithTranslationsSchema = withTranslationsSchema(
	projectImageTypesSchema,
	projectImageTypesTranslationsSchema.omit({ id: true })
);
export const newProjectImageTypeSchema = projectImageTypesWithTranslationsSchema.omit({ id: true });

// Projects

export const projectsSchema = createInsertSchema(projects, {
	adjacentStreets: (s) => s.adjacentStreets.positive().max(PROJECT_ADJACENT_STREETS_MAX),
	adjacentAlleys: (s) => s.adjacentAlleys.positive().max(PROJECT_ADJACENT_ALLEYS_MAX),
	costRange: () => intrangeSchema({ min: PROJECT_COST_MIN, max: PROJECT_COST_MAX }),
});
export const projectsTranslationsSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.trim().max(PROJECT_TITLE_MAX),
	summary: (s) => s.summary.trim().max(PROJECT_SUMMARY_MAX),
	description: (s) => s.description.trim().max(PROJECT_DESCRIPTION_MAX),
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
// export const newProjectsImagesSchema = projects

export const projectsUsersSchema = createInsertSchema(projectsUsers);

// Organizations descriptors

export const organizationTypesSchema = createInsertSchema(organizationTypes).required({ id: true });
export const organizationTypesTranslationsSchema = createInsertSchema(
	organizationTypesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);
export const organizationTypesWithTranslationsSchema = withTranslationsSchema(
	organizationTypesSchema,
	organizationTypesTranslationsSchema.omit({ id: true })
);
export const newOrganizationTypeSchema = organizationTypesWithTranslationsSchema.omit({ id: true });

// Organizations

export const organizationsSchema = createInsertSchema(organizations).required({ id: true });
export const organizationsTranslationsSchema = createInsertSchema(organizationsTranslations, {
	name: (s) => s.name.trim(),
	summary: (s) => s.summary.trim(),
	description: (s) => s.description.trim(),
});
export const organizationsWithTranslationsSchema = withTranslationsSchema(
	organizationsSchema,
	organizationsTranslationsSchema.omit({ id: true })
);

// Users

export const usersSchema = createInsertSchema(users, {
	firstName: (s) => s.firstName.trim(),
	middleName: (s) => s.middleName.trim(),
	lastName: (s) => s.lastName.trim(),
	email: (s) => s.email.trim().email(),
	publicEmail: (s) => s.publicEmail.trim().email(),
});

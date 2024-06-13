import {
	projects,
	projectsBuildingLevels,
	projectsExemplarityIndicators,
	projectsImages,
	projectsInterventions,
	projectsTranslations,
	projectsUsers,
} from '$lib/db/schema/public.server';
import { intrangeSchema } from 'drizzle-orm-helpers/pg';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
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
import { LANG_COLUMN_SCHEMA, withTranslationsSchema } from './i18n';

export const projectsSearchSchema = z.object({
	search: z.string().optional(),
});

export const projectsSchema = createInsertSchema(projects, {
	adjacentStreets: (s) => s.adjacentStreets.positive().max(PROJECT_ADJACENT_STREETS_MAX),
	adjacentAlleys: (s) => s.adjacentAlleys.positive().max(PROJECT_ADJACENT_ALLEYS_MAX),
	costRange: () => intrangeSchema({ min: PROJECT_COST_MIN, max: PROJECT_COST_MAX }),
});

export const projectsTranslationsSchema = createInsertSchema(projectsTranslations, {
	...LANG_COLUMN_SCHEMA,
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

export const projectsUsersSchema = createInsertSchema(projectsUsers);

export const projectsGeneralSchema = projectsWithTranslationsSchema
	.pick({
		id: true,
		typeId: true,
		costRange: true,
		siteOwnershipId: true,
		translations: true,
	})
	.extend({
		interventionIds: projectsInterventionsSchema.shape.interventionId.array(),
	});

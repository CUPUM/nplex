import {
	PROJECT_IMAGE_PALETTE_LENGTH,
	PROJECT_IMAGE_PALETTE_VECTOR_DIMENSIONS,
} from '$lib/db/constants';
import {
	projects,
	projectsBuildingLevels,
	projectsExemplarityMarkers,
	projectsImagesColumnsWithoutVectors,
	projectsInterventions,
	projectsTranslations,
	projectsUsers,
} from '$lib/db/schema/public.server';
import { intrangeSchema } from 'drizzle-orm-helpers/pg';
import { pgTable } from 'drizzle-orm/pg-core';
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
import {
	projectExemplarityMarkersSchema,
	projectInterventionsSchema,
	projectTypesSchema,
} from './projects-descriptors';

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

export const projectsExemplarityMarkersSchema = createInsertSchema(projectsExemplarityMarkers);

/**
 * Placeholder table to temporarily fix peer error when using drizzle-zod with pg_vector columns.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/issues/2424
 */
const projectsImagesWithoutVector = pgTable(
	'projects_images_without_vectors',
	projectsImagesColumnsWithoutVectors
);

export const projectsImagesSchema = createInsertSchema(projectsImagesWithoutVector, {
	index: (s) => s.index.positive(),
}).extend({
	colorPaletteLAB: z
		.number()
		.array()
		.length(PROJECT_IMAGE_PALETTE_VECTOR_DIMENSIONS)
		.array()
		.length(PROJECT_IMAGE_PALETTE_LENGTH),
});

export const projectsUsersSchema = createInsertSchema(projectsUsers);

// ************
// Form schemas
// ************

export const projectGeneralFormSchema = projectsWithTranslationsSchema
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

export const projectExemplarityMarkersFormSchema = z.object({
	markersIds: projectsExemplarityMarkersSchema.shape.exemplarityMarkerId.array(),
});

export const projectGalleryFormSchema = z.object({
	deleteId: projectsImagesSchema.shape.id,
	bannerId: projectsSchema.shape.bannerId.unwrap(),
});

export const projectImageFormSchema = projectsImagesSchema
	.pick({
		id: true,
		storageName: true,
		colorPaletteLAB: true,
	})
	.required({ id: true })
	.extend({ isBanner: z.boolean() });

export const projectNewImagesFormSchema = z.object({
	images: projectsImagesSchema
		.pick({
			storageName: true,
			colorPaletteLAB: true,
			height: true,
			width: true,
		})
		.array(),
});

export const projectsFiltersSchema = z.object({
	search: z.string().optional(),
	types: projectTypesSchema.shape.id.array(),
	interventions: projectInterventionsSchema.shape.id.array(),
	markers: projectExemplarityMarkersSchema.shape.id.array(),
});

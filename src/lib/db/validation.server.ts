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
	projects,
	projectsBuildingLevels,
	projectsExemplarityIndicators,
	projectsImages,
	projectsInterventions,
	projectsTranslations,
	projectsUsers,
	projectTypes,
	projectTypesTranslations,
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

// Project descriptors

export const projectTypesSchema = createInsertSchema(projectTypes).required({ id: true });

export const projectTypesTranslationsSchema = createInsertSchema(projectTypesTranslations);

export const projectTypesWithTranslationsSchema = withTranslationsSchema(
	projectTypesSchema,
	projectTypesTranslationsSchema
);

// export const projectInterventionTypesSchema = createInsertSchema();

// Projects

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
	projectsTranslationsSchema
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

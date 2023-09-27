import { createInsertSchema } from 'drizzle-zod';
import {
	projectTypes,
	projectTypesTranslations,
	projects,
	projectsTranslations,
} from './schema/public';

export const projectTypeInsertSchema = createInsertSchema(projectTypes, {});

export const projectTypeTranslationInsertSchema = createInsertSchema(projectTypesTranslations, {
	title: (s) => s.title.default(''),
});

export const projectsInsertSchema = createInsertSchema(projects, {
	adjacentStreets: (s) => s.adjacentStreets.positive().max(5),
	adjacentAlleys: (s) => s.adjacentAlleys.positive().max(5),
});

export const projectsTranslationsInsertSchema = createInsertSchema(projectsTranslations, {
	title: (s) => s.title.max(250),
	summary: (s) => s.summary.max(1500),
	description: (s) => s.description.max(5000),
});

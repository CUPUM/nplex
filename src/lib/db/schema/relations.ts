import { relations } from 'drizzle-orm';
import { locales } from './i18n';
import { projectTypes, projectTypesTranslations, projects, projectsTranslations } from './public';

export const projectTypesRelations = relations(projectTypes, ({ many }) => {
	return {
		projects: many(projects),
		translations: many(projectTypesTranslations),
	};
});

export const projectTypesTranslationsRelations = relations(projectTypesTranslations, ({ one }) => {
	return {
		locale: one(locales, {
			fields: [projectTypesTranslations.locale],
			references: [locales.locale],
		}),
		type: one(projectTypes, {
			fields: [projectTypesTranslations.id],
			references: [projectTypes.id],
		}),
	};
});

export const projectsRelations = relations(projects, ({ one }) => {
	return {
		type: one(projectTypes, {
			fields: [projects.typeId],
			references: [projectTypes.id],
		}),
	};
});

export const projectsTranslationsRelations = relations(projectsTranslations, ({ one }) => {
	return {
		project: one(projects, {
			fields: [projectsTranslations.id],
			references: [projects.id],
		}),
	};
});

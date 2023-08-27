import { pgTable, primaryKey, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { users } from './auth';
import { locales } from './i18n';

/**
 * Universal project descriptors.
 *
 * @note Differentiated form projects metadata by naming with singular form
 * of "project".
 */

export const projectTypes = pgTable('project_types', {
	id: serial('id').primaryKey(),
});

export const projectTypesTranslations = pgTable(
	'project_types_t',
	{
		id: serial('id').references(() => projectTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey(table.id, table.locale) };
	}
);

export const projectInterventionCategories = pgTable('project_intervention_categories', {});

export const projectInterventionTypes = pgTable('project_intervention_types', {});

export const projectTypesToInterventionTypes = pgTable('project_types_to_intervention_types', {});

export const projectEventTypes = pgTable('project_event_types', {});

export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {});

export const projectExemplarityTypes = pgTable('project_exemplarity_types', {});

export const projectImageTypes = pgTable('project_image_types', {});

export const projectImplantationTypes = pgTable('project_implantation_types', {});

// export const projectMaterialType

/**
 * Projects metadata.
 */

export const projects = pgTable('projects', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	createdBy: varchar('created_by')
		.notNull()
		.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
	updatedBy: varchar('updated_by')
		.notNull()
		.references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
	typeId: serial('type_id').references(() => projectTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

export const projectsTranslations = pgTable(
	'projects_t',
	{
		id: uuid('id').references(() => projects.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		title: text('title'),
		description: text('description'),
	},
	(table) => {
		return { pk: primaryKey(table.id, table.locale) };
	}
);

export const projectsUsers = pgTable('projects_users', {});

export const projectsLikes = pgTable('projects_likes', {});

export const projectsEvents = pgTable('projects_events', {});

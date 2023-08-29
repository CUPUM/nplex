import { pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { locales } from './i18n';

/**
 * Top-most categories of projects.
 */
export const projectTypes = pgTable('project_types', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectTypes}
 */
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
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Grouping of project intervention types.
 */
export const projectInterventionCategories = pgTable('project_intervention_categories', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectInterventionCategories}
 */
export const projectInterventionCategoriesTranslations = pgTable(
	'project_intervention_categories_t',
	{
		id: serial('id').references(() => projectInterventionCategories.id, {
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
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Sub classification of projects by their intervention(s)
 */
export const projectInterventionTypes = pgTable('project_intervention_types', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectInterventionTypes}
 */
export const projectInterventionTypesTranslations = pgTable(
	'project_intervention_types_t',
	{
		id: serial('id').references(() => projectInterventionTypes.id, {
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
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * The type of owner for the site where the projet occured.
 */
export const projectSiteOwnerships = pgTable('project_site_ownerships', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectSiteOwnerships}
 */
export const projectSiteOwnershipsTranslations = pgTable(
	'project_site_ownerships_t',
	{
		id: serial('id').references(() => projectSiteOwnerships.id, {
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
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectTypesToInterventionTypes = pgTable(
	'project_types_to_intervention_types',
	{
		typeId: serial('type_id').references(() => projectTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		interventionTypeId: serial('intervention_type_id').references(() => projectTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.typeId, table.interventionTypeId),
		};
	}
);

export const projectEventTypes = pgTable('project_event_types', {});

export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {});

export const projectExemplarityTypes = pgTable('project_exemplarity_types', {});

export const projectImageTypes = pgTable('project_image_types', {});

export const projectImplantationTypes = pgTable('project_implantation_types', {});

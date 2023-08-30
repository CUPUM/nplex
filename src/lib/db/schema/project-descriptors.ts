import { pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';
import { localefk } from '../helpers/i18n';

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
		locale: localefk(),
		title: text('title').notNull(),
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
		locale: localefk(),
		title: text('title').notNull(),
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
		locale: localefk(),
		title: text('title').notNull(),
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
		locale: localefk(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Restricting intervention types based on project types.
 *
 * @see {@link projectTypes}
 * @see {@link projectInterventionTypes}
 */
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

/**
 * How is the project's building integrated amongst the surrounding constructions.
 */
export const projectImplantationTypes = pgTable('project_implantation_types', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectImplantationTypes}
 */
export const projectImplantationTypesTranslations = pgTable(
	'project_implantation_types_t',
	{
		id: serial('id').references(() => projectImplantationTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Groupings of exemplarity indicators. Inspired by the City of Montreal's Design Agenda 2030.
 */
export const projectExemplarityCategories = pgTable('project_exemplarity_categories', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectExemplarityCategories}
 */
export const projectExemplarityCategoriesTranslations = pgTable(
	'project_exemplarity_categories_t',
	{
		id: serial('id').references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

export const projectExemplarityIndicators = pgTable('project_exemplarity_indicators', {
	id: serial('id').primaryKey(),
	categoryId: serial('category_id')
		.references(() => projectExemplarityCategories.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
});

export const projectExemplarityIndicatorsTranslations = pgTable(
	'project_exemplarity_indicators_t',
	{
		id: serial('id').references(() => projectExemplarityIndicators.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		title: text('title').notNull(),
		shortTitle: text('short_title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * Various types of items that can be added to project galleries.
 */
export const projectImageTypes = pgTable('project_image_types', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectImageTypes}
 */
export const projectImageTypesTranslations = pgTable(
	'project_image_types_t',
	{
		id: serial('id').references(() => projectImageTypes.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

/**
 * How does the image relate to the project's unfolding?
 */
export const projectImageTemporalities = pgTable('project_image_temporalities', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link projectImageTemporalities}
 */
export const projectImageTemporalitiesTranslations = pgTable(
	'project_image_temporalities_t',
	{
		id: serial('id').references(() => projectImageTemporalities.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		title: text('title').notNull(),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
		};
	}
);

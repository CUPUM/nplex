import { integer, pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';
import { localefk } from '../helpers/i18n';

/**
 * Formats or domains of operation that can caracterize registered organizations.
 */
export const organizationTypes = pgTable('organization_types', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link organizationTypes}
 */
export const organizationTypesTranslations = pgTable(
	'organization_types_t',
	{
		id: integer('id').references(() => organizationTypes.id, {
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
 * Professions heralded by design offices or communities.
 */
export const organizationExpertises = pgTable('organization_expertises', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link organizationExpertises}
 */
export const organizationExpertisesTranslations = pgTable(
	'organization_expertises_t',
	{
		id: integer('id').references(() => organizationExpertises.id, {
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
 * Roles organizations can assume in the context of projects.
 */
export const organizationDuties = pgTable('organization_duties', {
	id: serial('id').primaryKey(),
});

/**
 * @see {@link organizationDuties}
 */
export const organizationDutiesTranslations = pgTable(
	'organization_duties_t',
	{
		id: integer('id').references(() => organizationDuties.id, {
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

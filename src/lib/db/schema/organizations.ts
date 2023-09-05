import { integer, pgTable, primaryKey, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { localefk } from '../helpers/i18n';
import { useridfk } from '../helpers/user-id';
import { organizationExpertises, organizationTypes } from './organization-descriptors';

/**
 * Design offices, municipal offices, communities, etc.
 */
export const organizations = pgTable('organizations', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdById: useridfk('created_by_id', { onDelete: 'restrict', onUpdate: 'cascade' }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedById: useridfk('updated_by_id', { onDelete: 'set null', onUpdate: 'cascade' }),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	typeId: integer('type_id').references(() => organizationTypes.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
});

/**
 * @see {@link organizations}
 */
export const organizationsTranslations = pgTable(
	'organizations_t',
	{
		id: uuid('id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: localefk(),
		name: text('name').notNull(),
		summary: text('summary'),
		description: text('description'),
	},
	(table) => {
		return {
			pk: primaryKey(table.id, table.locale),
			unq: unique().on(table.name, table.locale),
		};
	}
);

export const organizationsUsers = pgTable(
	'organizations_users',
	{
		organizationId: uuid('organization_id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		userId: useridfk('user_id'),
	},
	(table) => {
		return {
			pk: primaryKey(table.organizationId, table.userId),
		};
	}
);

export const organizationsExpertises = pgTable(
	'organizations_expertises',
	{
		organizationId: uuid('organization_id').references(() => organizations.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		expertiseId: integer('expertise_id').references(() => organizationExpertises.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.expertiseId, table.organizationId),
		};
	}
);

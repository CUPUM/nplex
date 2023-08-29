import { pgTable, primaryKey, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';
import { users } from './auth';
import { locales } from './i18n';

/**
 * Design offices, municipal offices, communities, etc.
 */
export const organizations = pgTable('organizations', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdById: uuid('created_by_id')
		.references(() => users.id, {
			onDelete: 'restrict',
			onUpdate: 'cascade',
		})
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedById: uuid('updated_by_id').references(() => users.id, {
		onDelete: 'set null',
		onUpdate: 'cascade',
	}),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
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
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		name: text('name'),
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
		userId: uuid('user_id').references(() => users.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
	},
	(table) => {
		return {
			pk: primaryKey(table.organizationId),
		};
	}
);

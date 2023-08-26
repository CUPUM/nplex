import { pgSchema, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';

/**
 * Database schema for managing everything i18n oriented. Separated from the public / default schema
 * for convenience.
 *
 * @see https://vertabelo.com/blog/multi-language-database-design/ for basis of this schema design.
 */
export const i18nSchema = pgSchema('i18n');

/**
 * Table for db-level locales.
 */
export const locales = i18nSchema.table('locales', {
	locale: locale('locale').primaryKey(),
	name: text('name').notNull().unique(),
});

/**
 * Global table of translations.
 */
export const translations = i18nSchema.table(
	'translations',
	{
		textContentId: uuid('text_content_id').references(() => textContents.id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		locale: locale('locale').references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		}),
		content: text('content'),
	},
	(table) => {
		return {
			pk: primaryKey(table.textContentId, table.locale),
		};
	}
);

/**
 * Intermediate linking table for one-to-many.
 */
export const textContents = i18nSchema.table('text_contents', {
	id: uuid('id').defaultRandom().primaryKey(),
});

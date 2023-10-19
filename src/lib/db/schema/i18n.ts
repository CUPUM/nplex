import type { ColumnBaseConfig } from 'drizzle-orm';
import { PgColumn, pgSchema, text } from 'drizzle-orm/pg-core';
import { locale } from './custom-types';

/**
 * Locales core to managing everything i18n oriented. Opting for a per-entity-type storage of
 * translations to avoid bloating a universal table and to facilitate cascading control.
 *
 * (previously based on: https://vertabelo.com/blog/multi-language-database-design/ for basis of
 * this schema design, but turns out to be troublesome approach)
 *
 * @see https://stackoverflow.com/questions/316780/schema-for-a-multilanguage-database
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
 * Common locale column template.
 */
export const translationLocaleColumn = {
	locale: locale('locale')
		.references(() => locales.locale, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
};

export type TranslationLocaleColumn = typeof translationLocaleColumn;

/**
 * Common translations reference column template.
 */
export function translationReferenceColumn<T extends ColumnBaseConfig<'string', 'PgText'>>(
	reference: PgColumn<T>
) {
	return {
		id: text('id')
			.references(() => reference, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
	};
}

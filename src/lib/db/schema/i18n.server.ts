import { regconfig } from 'drizzle-orm-helpers/pg';
import { pgSchema, text } from 'drizzle-orm/pg-core';
import { LANG_COLUMN_NAME } from '../constants';
import { lang } from '../custom-types.server';

/**
 * Schema core to managing everything i18n oriented, especially valid language tags and their
 * corresponding regconfigs. Use of separated translations tables enables us to avoid bloating a
 * universal table and to facilitate cascading control.
 *
 * @see https://stackoverflow.com/questions/316780/schema-for-a-multilanguage-database
 */
export const i18nSchema = pgSchema('i18n');

/**
 * Table for db-level langs.
 */
export const languages = i18nSchema.table('langs', {
	[LANG_COLUMN_NAME]: lang('lang').primaryKey(),
	name: text('name').notNull().unique(),
	regconfig: regconfig('regconfig').notNull(),
});

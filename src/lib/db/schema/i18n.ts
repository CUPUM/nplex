import { pgTable, text } from 'drizzle-orm/pg-core';
import { locale } from '../custom-types/locale';

/**
 * Locales core to managing everything i18n oriented. Opting for a per-entity-type storage of
 * translations to avoid bloating a universal table and to facilitate cascading control.
 *
 * (previously based on: https://vertabelo.com/blog/multi-language-database-design/ for basis of
 * this schema design, but turns out to be troublesome approach)
 *
 * @see https://stackoverflow.com/questions/316780/schema-for-a-multilanguage-database
 */

/**
 * Table for db-level locales.
 */
export const locales = pgTable('locales', {
	locale: locale('locale').primaryKey(),
	name: text('name').notNull().unique(),
});

// /**
//  * Global table of translations.
//  */
// export const translations = i18nSchema.table(
// 	'translations',
// 	{
// 		textContentId: uuid('text_content_id').references(() => textContents.id, {
// 			onDelete: 'cascade',
// 			onUpdate: 'cascade',
// 		}),
// 		locale: locale('locale').references(() => locales.locale, {
// 			onDelete: 'cascade',
// 			onUpdate: 'cascade',
// 		}),
// 		text: text('text'),
// 	},
// 	(table) => {
// 		return {
// 			pk: primaryKey(table.textContentId, table.locale),
// 		};
// 	}
// );

// /**
//  * Intermediate linking table for one-to-many.
//  */
// export const textContents = i18nSchema.table('text_contents', {
// 	id: uuid('id').defaultRandom().primaryKey(),
// });

import type { AnyColumn } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { LANG_COLUMN_NAME } from './constants';
import { lang } from './custom-types.server';
import { languages } from './schema/i18n';

export const LANG_COLUMN = {
	[LANG_COLUMN_NAME]: lang(LANG_COLUMN_NAME)
		.references(() => languages[LANG_COLUMN_NAME], {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
};
export type LangColumn = {
	[LANG_COLUMN_NAME]: AnyColumn<
		Pick<(typeof LANG_COLUMN)[typeof LANG_COLUMN_NAME]['_'], 'data' | 'dataType'>
	>;
};

export const CREATED_AT_COLUMN = {
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
};

export const UPDATED_AT_COLUMN = {
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
};

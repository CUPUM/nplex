import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import type { LocaleColumns } from './i18n';

const POST_TITLE_MAX_LENGTH = 64;

/**
 * Table for posts.
 */
export const posts = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	title_fr: varchar('title_fr', { length: POST_TITLE_MAX_LENGTH }),
	title_en: varchar('title_en', { length: POST_TITLE_MAX_LENGTH }),
} satisfies LocaleColumns<'title'>);

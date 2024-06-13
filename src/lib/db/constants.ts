import type { AvailableLanguageTag } from '$i18n/runtime';
import type { Regconfig } from 'drizzle-orm-helpers/pg';

export const LANG_COLUMN_NAME = 'lang';

export type LangColumnName = typeof LANG_COLUMN_NAME;

export const LANG_REGCONFIGS = {
	en: 'english',
	fr: 'french',
} satisfies Record<AvailableLanguageTag, Regconfig>;

export const USER_EMAIL_VERIFICATION_CODE_LENGTH = 8;

export const PROJECT_IMAGE_PALETTE_LENGTH = 5;

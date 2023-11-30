import type { AvailableLanguageTag } from '$i18n/runtime';
import type { ValueOf } from 'type-fest';

export const SQL_LANGUAGES = {
	fr: 'french',
	en: 'english',
} as const satisfies Record<AvailableLanguageTag, string>;
export type PgLanguage = ValueOf<typeof SQL_LANGUAGES>;

/**
 * Should reflect the default length defined in the db migration for nanoid.
 */
export const NANOID_DEFAULT_LENGTH = 21;
export const USER_ID_LENGTH = 15;

export const PROJECT_TITLE_MAX = 250;
export const PROJECT_SUMMARY_MAX = 1_500;
export const PROJECT_DESCRIPTION_MAX = 5000;
export const PROJECT_COST_MIN = 1_000;
export const PROJECT_COST_MAX = 2_500_000;

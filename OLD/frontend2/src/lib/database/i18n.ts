import type { Locale } from '$lib/i18n/constants';

/**
 * Require specific columns to be localized using an underscored suffix.
 */
export type LocaleColumns<T extends string> = Record<string, unknown> & {
	[Localized in `${T}_${Locale}`]: unknown;
};

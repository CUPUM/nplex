import { LOCALES_ARR } from './constants';

/**
 * Plural formatter based on intl.PluralFormatter.
 */
export function plural() {
	return new Intl.PluralRules(LOCALES_ARR, {});
}

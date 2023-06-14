import { isLocale } from '$lib/i18n/locales';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// return true if matches any of locale
	return isLocale(param);
};

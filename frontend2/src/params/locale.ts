import { isSupportedLocale } from '$lib/i18n/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// return true if matches any of locale
	return isSupportedLocale(param);
};

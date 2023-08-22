import { isLocale } from '$lib/i18n/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return isLocale(param);
};

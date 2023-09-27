import { isViewType } from '$lib/view-type/validation';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return isViewType(param);
};

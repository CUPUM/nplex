import { CATEGORIES } from '$utils/enums';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	return {
		category: CATEGORIES.Projects,
	};
}) satisfies LayoutLoad;

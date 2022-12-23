import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	return {
		category: 'projects',
	};
}) satisfies LayoutLoad;

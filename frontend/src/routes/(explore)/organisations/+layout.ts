import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	return {
		category: 'organisations',
	};
}) satisfies LayoutLoad;

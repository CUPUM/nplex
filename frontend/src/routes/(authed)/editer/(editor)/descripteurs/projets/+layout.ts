import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	console.log(event.parent);
}) satisfies LayoutLoad;

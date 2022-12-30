import type { PageLoad } from './$types';

export const load = (async (event) => {
	return {
		id: event.params.orgId,
	};
}) satisfies PageLoad;

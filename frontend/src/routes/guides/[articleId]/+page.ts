import type { PageLoad } from './$types';

export const load = ((event) => {
	return {
		articleId: event.params.articleId,
	};
}) satisfies PageLoad;

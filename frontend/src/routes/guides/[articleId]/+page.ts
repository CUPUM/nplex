import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		articleId: params.articleId,
	};
};

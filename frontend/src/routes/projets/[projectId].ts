import type { RequestHandler } from '@sveltejs/kit';

/**
 * Page endpoint for single-project page.
 */
export const get: RequestHandler = async ({ params }) => {
	const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=4');
	const description = await res.json();
	const id = params.projectId;

	return {
		body: {
			id,
			description,
		},
	};
};

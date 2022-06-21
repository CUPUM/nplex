import type { RequestHandler } from '@sveltejs/kit';

/**
 * Temporary helper to facilitate placeholder data generation.
 */
async function makeImage(id: string) {
	const url = `https://picsum.photos/seed/${id}/600/800`;
	const description = await (await fetch('loripsum.net/api/1/short/plaintext')).json();
	return {
		url,
		description,
	};
}

/**
 * Page endpoint for single-project page.
 */
export const get: RequestHandler = async ({ params }) => {
	const id = params.projectId;
	const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=4');
	const description = await res.json();
	const image = await makeImage(id);

	return {
		body: {
			id,
			description,
			image,
			gallery: [],
		},
	};
};

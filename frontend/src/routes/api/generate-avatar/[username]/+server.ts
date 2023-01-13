import type { RequestHandler } from './$types';

const MAX_AGE = 1;
const WIDTH = 250;
const HEIGHT = 250;

/**
 * Serves optimized versions of images stored in **public** buckets on Supabase's storage.
 */
export const GET: RequestHandler = async (event) => {
	const svg = 'Generate some svg here';

	return new Response(svg, {
		headers: {
			'content-type': `image/svg+xml`,
			'cache-control': `max-age: ${MAX_AGE}`,
		},
	});
};

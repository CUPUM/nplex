import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = ({ params }) => {
	const { projectId } = params;

	return {
		status: 200,
		body: {
			projectId,
		},
	};
};

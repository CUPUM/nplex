import { createDisposableDbClient } from '$utils/database';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * This endpoint gets the various project-related params lists used for filtering functionalities, submission forms, and more.
 */
export const GET: RequestHandler = async ({ request, locals }) => {
	const db = createDisposableDbClient();
	const res = { body: [] };
	try {
		const { data, error } = await db.rpc('get_projects_params_lists');
		if (error) throw error;
		res.body = data;
	} catch (error) {
		console.log(error);
	}
	return res;
};

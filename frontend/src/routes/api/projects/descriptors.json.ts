import { createDisposableDbClient } from '$utils/database';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * This endpoint gets the various project-related params lists used for filtering functionalities, submission forms, and more.
 */
export const GET: RequestHandler = async () => {
	const db = createDisposableDbClient();
	try {
		const { data, error } = await db.rpc('get_project_descriptors');
		if (error) throw error;
		return {
			body: data,
		};
	} catch (error) {
		return { body: {} };
	}
};

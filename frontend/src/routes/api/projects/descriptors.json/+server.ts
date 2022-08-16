import { json } from '@sveltejs/kit';
import { createDisposableDbClient } from '$utils/database/database';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * This endpoint gets the various project-related params lists used for filtering functionalities, submission forms, and more.
 */
export const GET: RequestHandler = async () => {
	const db = createDisposableDbClient();
	try {
		const { data, error } = await db.rpc('get_project_descriptors');
		if (error) throw error;
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
		// Suggestion (check for correctness before using):
		// return json(data);
		return {
			body: data,
		};
	} catch (error) {
		return json({});
	}
};

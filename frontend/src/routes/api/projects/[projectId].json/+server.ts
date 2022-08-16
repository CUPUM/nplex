import { json } from '@sveltejs/kit';
import type { definitions } from '$types/database';
import { createDisposableDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);
	try {
		const { data, error } = await db
			.from<definitions['projects']>('projects')
			.select('*')
			.eq('id', params.projectId)
			.single();
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

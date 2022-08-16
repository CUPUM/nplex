import type { definitions } from '$types/database';
import { createDisposableDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { RequestHandler } from './__types/[projectId].json';

export const GET: RequestHandler = async ({ params, locals }) => {
	const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);
	try {
		const { data, error } = await db
			.from<definitions['projects']>('projects')
			.select('*')
			.eq('id', params.projectId)
			.single();
		if (error) throw error;
		return {
			body: data,
		};
	} catch (error) {
		return {
			body: {},
		};
	}
};

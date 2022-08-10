import type { definitions } from '$types/database';
import { createDisposableDbClient } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { RequestHandler } from './__types/index.json';

/**
 * Update de current project by its id.
 */
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	const { projectId } = params;
	const patchData = await request.json();
	const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);
	const { data, error } = await db
		.from<definitions['projects']>('projects')
		.update(patchData)
		.match({ id: projectId });

	return {
		status: 200,
		body: {
			projectId,
		},
	};
};

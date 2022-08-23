import { createServerDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { Action } from '@sveltejs/kit';

export const POST: Action = async ({ locals, request, url, params }) => {
	const update = await request.json();

	console.log(update);

	const db = createServerDbClient(locals[Cookie.DbAccessToken]);

	// const {data: newProject, error} = await db
	// 	.from('projects')
	// 	.upsert()

	// redirect(302, )
};

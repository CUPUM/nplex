import type { RequestHandler } from './__types/new.json';

/**
 * Create a new project with the required base data.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	// const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);
	const posted = await request.json();
	console.log(posted);
	// const { data, error } = await db.from<definitions['projects']>('projects').insert(posted);

	return {
		// body: data,
	};
};

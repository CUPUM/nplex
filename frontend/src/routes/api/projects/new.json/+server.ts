import type { RequestHandler } from './$types';

/**
 * Create a new project with the required base data.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	// const db = createDisposableDbClient(locals[Cookie.DbAccessToken]);
	const posted = await request.json();
	// const { data, error } = await db.from<definitions['projects']>('projects').insert(posted);

	return new Response(undefined);
};

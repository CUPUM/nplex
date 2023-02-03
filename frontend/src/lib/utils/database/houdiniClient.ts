import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_GRAPHQL_URL } from '$env/static/public';
import { HoudiniClient, type RequestHandlerArgs } from 'houdini/build/runtime/lib';

async function fetchQuery({
	fetch,
	text = '',
	variables = {},
	metadata,
	session,
}: RequestHandlerArgs) {
	const result = await fetch(PUBLIC_SUPABASE_GRAPHQL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'apiKey': PUBLIC_SUPABASE_ANON_KEY,
			'Authorization': `Bearer ${session?.user.token}`,
		},
		body: JSON.stringify({
			query: text,
			variables,
		}),
	});
	return await result.json();
}

export default new HoudiniClient(fetchQuery);

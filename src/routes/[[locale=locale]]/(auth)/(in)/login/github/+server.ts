import { dev } from '$app/environment';
import { githubAuth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/utils/constants';

export const GET = async (event) => {
	const [url, state] = await githubAuth.getAuthorizationUrl();
	// store state
	event.cookies.set('github_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60,
	});
	return new Response(null, {
		status: STATUS_CODES.MOVED_TEMPORARILY,
		headers: {
			Location: url.toString(),
		},
	});
};

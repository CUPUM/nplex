import { dev } from '$app/environment';
import { OAUTH_PROVIDERS_STATE_COOKIE_NAME } from '$lib/auth/constants';
import { getOAuthProviderIntegration } from '$lib/auth/utils.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';

export const GET = async (event) => {
	if (event.locals.session) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	}

	const state = generateState();
	const url = getOAuthProviderIntegration(event.params.provider).createAuthorizationURL(state);

	event.cookies.set(OAUTH_PROVIDERS_STATE_COOKIE_NAME[event.params.provider], state, {
		httpOnly: true,
		secure: !dev,
		path: '.',
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	redirect(STATUS_CODES.MOVED_TEMPORARILY, url.toString());
};

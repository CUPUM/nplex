import { dev } from '$app/environment';
import { integrations } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/constants';
import { STATUS_CODES } from '$lib/common/constants';
import { redirect } from '@sveltejs/kit';
import { generateState } from 'arctic';

export const GET = async (event) => {
	if (event.locals.user) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	}

	const state = generateState();
	const integration = integrations[event.params.provider];
	const url = integration.createAuthorizationURL(state);

	event.cookies.set(OAUTH_PROVIDERS_DETAILS[event.params.provider].cookie, state, {
		httpOnly: true,
		secure: !dev,
		path: '.',
		maxAge: 60 * 10,
		sameSite: 'lax',
	});

	redirect(STATUS_CODES.MOVED_TEMPORARILY, url.toString());
};

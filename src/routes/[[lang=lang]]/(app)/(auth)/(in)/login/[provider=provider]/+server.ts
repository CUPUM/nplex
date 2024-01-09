import { dev } from '$app/environment';
import * as m from '$i18n/messages';
import { integrations } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_STATE_COOKIE } from '$lib/auth/constants';
import { isSupportedOAuthProvider } from '$lib/auth/validation';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';

export const GET = async (event) => {
	if (!isSupportedOAuthProvider(event.params.provider)) {
		error(STATUS_CODES.BAD_REQUEST, {
			message: m.auth_unsupportedProvider(),
		});
	}

	/**
	 * Redirect to home if there's already a session on the requesting client.
	 *
	 * @todo Implement redirectTo param to bring user back to their previous page.
	 */
	const session = await event.locals.auth.validate();
	if (session) {
		event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	}

	/**
	 * Get the corresponding integration and its helpers.
	 */
	const [url, state] = await integrations[event.params.provider].getAuthorizationUrl();

	/**
	 * Store state used by provider and redirect user to their auth url to confirm the requested
	 * permissions.
	 */
	event.cookies.set(OAUTH_PROVIDERS_STATE_COOKIE[event.params.provider], state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 30 * 24 * 60 * 60,
	});
	return new Response(null, {
		status: STATUS_CODES.MOVED_TEMPORARILY,
		headers: {
			Location: url.toString(),
		},
	});
};

import { dev } from '$app/environment';
import { integrations } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_STATE_COOKIE } from '$lib/auth/constants';
import { isSupportedOAuthProvider } from '$lib/auth/validation';
import { createTranslations } from '$lib/i18n/translate';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';

export const GET = async (event) => {
	const t = createTranslations(
		{
			fr: {
				notSupported: 'Le fournisseur OAuth demandé n’est pas supporté.',
			},
			en: {
				notSupported: 'The requested OAuth provider is not supported.',
			},
		},
		event
	);

	if (!isSupportedOAuthProvider(event.params.provider)) {
		throw error(STATUS_CODES.BAD_REQUEST, {
			message: t.notSupported,
		});
	}

	/**
	 * Redirect to home if there's already a session on the requesting client.
	 *
	 * @todo Implement redirectTo param to bring user back to their previous page.
	 */
	const session = await event.locals.auth.validate();
	if (session) {
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
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

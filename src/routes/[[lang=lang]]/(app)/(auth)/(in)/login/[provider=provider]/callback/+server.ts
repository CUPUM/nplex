import * as m from '$i18n/messages';
import { auth, integrations } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_STATE_COOKIE } from '$lib/auth/constants';
import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/socials';
import { isSupportedOAuthProvider } from '$lib/auth/validation';
import { dbpool } from '$lib/db/db.server';
import { users } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/**
 * @todo Extract provider user data getters into helpers instead of ternary ops.
 *
 * @todo Add flash messages for errors.
 */
export const GET = async (event) => {
	if (!isSupportedOAuthProvider(event.params.provider)) {
		error(STATUS_CODES.BAD_REQUEST, { message: m.auth_unsupportedProvider() });
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
	 * Retrieve provider's state cookie.
	 */
	const storedState = event.cookies.get(OAUTH_PROVIDERS_STATE_COOKIE[event.params.provider]);
	const state = event.url.searchParams.get('state');
	const code = event.url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		error(STATUS_CODES.BAD_REQUEST, {
			message: m.auth_incorrectProviderState({
				provider: OAUTH_PROVIDERS_DETAILS[event.params.provider].name,
			}),
		});
	}

	try {
		const validated = await integrations[event.params.provider].validateCallback(code);
		const user = await dbpool.transaction(async (tx) => {
			const existingUser = await validated.getExistingUser();
			if (existingUser) {
				return existingUser;
			}
			const verifiedOAuthEmail =
				'githubUser' in validated
					? validated.githubUser.email
					: 'googleUser' in validated && validated.googleUser.email_verified
						? validated.googleUser.email
						: null;
			if (verifiedOAuthEmail) {
				const [existingEmailUser] = await tx
					.select()
					.from(users)
					.where(eq(users.email, verifiedOAuthEmail))
					.limit(1);
				if (existingEmailUser) {
					if (!existingEmailUser.emailVerified) {
						error(STATUS_CODES.CONFLICT, {
							message: m.auth_emailAlreadyUsedAndUnverified({ email: verifiedOAuthEmail }),
						});
					}
					return existingEmailUser;
				}
			}
			const [newUser] = await tx
				.insert(users)
				.values({
					email: verifiedOAuthEmail,
					emailVerified: verifiedOAuthEmail != null,
					githubUsername: 'githubUser' in validated ? validated.githubUser.login : undefined,
					googleUsername: 'googleUser' in validated ? validated.googleUser.name : undefined,
					firstName: 'googleUser' in validated ? validated.googleUser.name : undefined,
					lastName: 'googleUser' in validated ? validated.googleUser.family_name : undefined,
				})
				.returning({ id: users.id });
			return newUser;
		});
		const session = await auth.createSession({
			userId: user.id,
			attributes: {},
		});
		event.locals.auth.setSession(session);
	} catch (e) {
		console.error(e);
		if (e instanceof OAuthRequestError) {
			// Handle differently?
			error(STATUS_CODES.BAD_REQUEST, { message: e.message });
		}
		error(STATUS_CODES.INTERNAL_SERVER_ERROR, {
			message: e instanceof Error ? e.message : '',
		});
	}
	event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i', [
		{
			title: m.auth_success(),
			description: m.auth_successDescription(),
		},
	]);
};

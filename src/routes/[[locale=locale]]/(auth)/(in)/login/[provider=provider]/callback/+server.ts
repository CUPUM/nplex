import { auth, integrations } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_STATE_COOKIE } from '$lib/auth/constants';
import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/socials';
import { isSupportedOAuthProvider } from '$lib/auth/validation';
import { dbpool } from '$lib/db/db.server';
import { users } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { HttpError_1, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/**
 * @todo Extract provider user data getters into helpers instead of ternary ops.
 */
export const GET = async (event) => {
	const t = event.locals.createTranslations({
		fr: {
			notSupported: 'Le fournisseur OAuth demandé n’est pas supporté.',
			incorrectState: (provider: string) => `La réponse de ${provider} ne convient pas.`,
			unverifiedEmail: (email: string) =>
				`Un utilisateur a déjà été enregistré avec l’adresse courriel «${email}». Pour lier les deux comptes veuillez d’abord authentifier votre adresse courriel sur le compte existant.`,
		},
		en: {
			notSupported: 'The requested OAuth provider is not supported.',
			incorrectState: (provider: string) => `The state provided by ${provider} is not compatible.`,
			unverifiedEmail: (email: string) =>
				`A user with the email «${email}» is already registered. To proceed and link both accounts, please first confirm your email adress on the existing account.`,
		},
	});

	if (!isSupportedOAuthProvider(event.params.provider)) {
		throw error(STATUS_CODES.BAD_REQUEST, { message: t.notSupported });
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
	 * Retrieve provider's state cookie.
	 */
	const storedState = event.cookies.get(OAUTH_PROVIDERS_STATE_COOKIE[event.params.provider]);
	const state = event.url.searchParams.get('state');
	const code = event.url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		throw error(STATUS_CODES.BAD_REQUEST, {
			message: t.incorrectState(OAUTH_PROVIDERS_DETAILS[event.params.provider].name),
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
						throw error(STATUS_CODES.CONFLICT, { message: t.unverifiedEmail(verifiedOAuthEmail) });
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
			throw error(STATUS_CODES.BAD_REQUEST, { message: e.message });
		}
		if (e instanceof HttpError_1) {
			throw e;
		}
		throw error(STATUS_CODES.INTERNAL_SERVER_ERROR, {
			message: e instanceof Error ? e.message : '',
		});
	}
	throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
};

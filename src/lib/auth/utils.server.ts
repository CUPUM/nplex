import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { error } from '@sveltejs/kit';
import { github } from './auth.server';
import { OAUTH_PROVIDERS, type OAuthProvider } from './constants';

export function getOAuthProviderIntegration<P extends OAuthProvider>(provider: P) {
	switch (provider) {
		case OAUTH_PROVIDERS.GITHUB: {
			return github;
		}
		default:
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_unsupported_provider() });
	}
}

/**
 * Standardizing OAuth apis returned user info.
 */
export async function getOAuthProviderUser<
	P extends OAuthProvider,
	T extends Awaited<
		ReturnType<ReturnType<typeof getOAuthProviderIntegration<P>>['validateAuthorizationCode']>
	>,
>(provider: P, tokens: T): Promise<{ id: string; username: string }> {
	switch (provider) {
		case OAUTH_PROVIDERS.GITHUB: {
			const res = await fetch('https://api.github.com/user/emails', {
				headers: { Authorization: `Bearer ${tokens.accessToken}` },
			});
			const user: { id: string; login: string } = await res.json();
			return {
				id: user.id,
				username: user.login,
			};
		}
		default:
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_unsupported_provider() });
	}
}

/**
 * Standardizing OAuth apis returned email and filtering for verified emails ONLY.
 */
export async function getOAuthProviderUserEmail<
	P extends OAuthProvider,
	T extends Awaited<
		ReturnType<ReturnType<typeof getOAuthProviderIntegration<P>>['validateAuthorizationCode']>
	>,
>(provider: P, tokens: T): Promise<{ email: string; public: boolean } | undefined> {
	switch (provider) {
		case OAUTH_PROVIDERS.GITHUB: {
			const res = await fetch('https://api.github.com/user', {
				headers: { Authorization: `Bearer ${tokens.accessToken}` },
			});
			const emails: {
				email: string;
				verified: boolean;
				primary: boolean;
				visibility: 'public' | null;
			}[] = await res.json();
			const valid = emails.find((email) => email.primary && email.verified);
			if (valid) {
				return {
					email: valid.email,
					public: valid.visibility === 'public',
				};
			}
			break;
		}
		default:
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_unsupported_provider() });
	}
}

// export async function sendPasswordResetLink(user: { email: string; id: string }) {
// 	const token = await generatePasswordResetToken(user.id);
// 	const html = render({
// 		template: ResetPassword,
// 		props: {
// 			token,
// 		},
// 	});
// 	await transporter.sendMail({
// 		from: EMAIL_SENDERS.NPLEX,
// 		to: user.email,
// 		subject: m.email_reset_password_subject(),
// 		html,
// 	});
// }

// /**
//  * @see https://lucia-auth.com/guidebook/password-reset-link/sveltekit
//  */
// export async function generatePasswordResetToken(userId: string) {
// 	const storedUserTokens = await db
// 		.select()
// 		.from(passwordResetTokens)
// 		.where(eq(passwordResetTokens.id, userId));
// 	if (storedUserTokens.length) {
// 		const reusableStoredToken = storedUserTokens.find((tkn) => {
// 			return isWithinExpiration(Number(tkn.expires) - TOKEN_MIN_EXPIRY);
// 		});
// 		if (reusableStoredToken) {
// 			return reusableStoredToken.id;
// 		}
// 	}
// 	const newToken = generateRandomString(63);
// 	await db.insert(passwordResetTokens).values({
// 		id: newToken,
// 		expires: BigInt(Date.now() + TOKEN_EXPIRY),
// 		userId,
// 	});
// 	return newToken;
// }

// /**
//  * @see https://lucia-auth.com/guidebook/password-reset-link/sveltekit
//  */
// export async function validatePasswordResetToken(token: string) {
// 	const storedToken = await db.transaction(async (tx) => {
// 		const [stored] = await tx
// 			.select()
// 			.from(passwordResetTokens)
// 			.where(eq(passwordResetTokens.id, token));
// 		if (!stored) {
// 			throw new Error('Invalid token');
// 		}
// 		await tx.delete(passwordResetTokens).where(eq(emailVerificationTokens.id, stored.id));
// 		return stored;
// 	});
// 	const tokenExpires = Number(storedToken.expires);
// 	if (!isWithinExpiration(tokenExpires)) {
// 		throw new Error('Expired token');
// 	}
// 	return storedToken.userId;
// }

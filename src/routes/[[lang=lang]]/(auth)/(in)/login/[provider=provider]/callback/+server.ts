import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { OAUTH_PROVIDERS_STATE_COOKIE_NAME } from '$lib/auth/constants';
import { OAUTH_PROVIDERS_DETAILS } from '$lib/auth/socials';
import {
	getOAuthProviderIntegration,
	getOAuthProviderUser,
	getOAuthProviderUserEmail,
} from '$lib/auth/utils.server';
import { STATUS_CODES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import { oauthUsers, users } from '$lib/db/schema/auth';
import { error } from '@sveltejs/kit';
import { OAuth2RequestError } from 'arctic';
import { and, eq, or, type InferInsertModel } from 'drizzle-orm';
import { excluded, getColumns } from 'drizzle-orm-helpers';
import { redirect } from 'sveltekit-flash-message/server';

export const GET = async (event) => {
	if (event.locals.session) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	}

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get(OAUTH_PROVIDERS_STATE_COOKIE_NAME[event.params.provider]);
	if (!storedState || !state || storedState !== state || !code) {
		error(STATUS_CODES.BAD_REQUEST, {
			message: m.auth_incorrect_provider_state({
				provider: OAUTH_PROVIDERS_DETAILS[event.params.provider].name,
			}),
		});
	}

	try {
		const tokens = await getOAuthProviderIntegration(
			event.params.provider
		).validateAuthorizationCode(code);
		const providerUser = await getOAuthProviderUser(event.params.provider, tokens);
		const validEmail = await getOAuthProviderUserEmail(event.params.provider, tokens);
		await db.transaction(async (tx) => {
			const { id, email, emailVerified, publicEmail, publicEmailVerified, hashedPassword } =
				getColumns(users);
			const [existingUser] = await tx
				.select({
					id,
					email,
					emailVerified,
					publicEmail,
					publicEmailVerified,
					hashedPassword,
				})
				.from(users)
				.leftJoin(oauthUsers, eq(users.id, oauthUsers.userId))
				.where(
					or(
						validEmail ? eq(users.email, validEmail.email) : undefined,
						and(
							eq(oauthUsers.provider, event.params.provider),
							eq(oauthUsers.providerUserId, providerUser.id)
						)
					)
				);
			if (existingUser && validEmail) {
				const userUpdate: InferInsertModel<typeof users> = {};
				if (!existingUser.email) {
					userUpdate.email = validEmail.email;
				}
				if (!existingUser.emailVerified) {
					if ((existingUser.email ?? validEmail.email) === validEmail.email) {
						userUpdate.emailVerified = true;
					}
					if (existingUser.hashedPassword && existingUser.email === validEmail.email) {
						// Unset previous password if oauth email verified but email-pw login not verified.
						// i.e. overtake previously unverified credentials.
						userUpdate.hashedPassword = null;
					}
				}
				if (validEmail.public) {
					if (!existingUser.publicEmail) {
						userUpdate.publicEmail = validEmail.email;
					}
					if (
						!existingUser.publicEmailVerified &&
						(existingUser.publicEmail ?? validEmail.email) === validEmail.email
					) {
						userUpdate.publicEmailVerified = true;
					}
				}
				if (Object.values(userUpdate).length) {
					await tx.update(users).set(userUpdate).where(eq(users.id, existingUser.id));
				}
			}
			const user =
				existingUser ??
				(
					await tx
						.insert(users)
						.values({
							email: validEmail?.email,
							emailVerified: validEmail ? true : undefined,
							publicEmail: validEmail?.public ? validEmail.email : undefined,
							publicEmailVerified: validEmail?.public ? true : undefined,
						})
						.returning({
							id: users.id,
						})
				)[0];
			await tx
				.insert(oauthUsers)
				.values({
					provider: event.params.provider,
					providerUserId: providerUser.id,
					userId: user.id,
				})
				.onConflictDoUpdate({
					target: [oauthUsers.provider, oauthUsers.providerUserId],
					set: { userId: excluded(oauthUsers.userId) },
				});
			const session = await auth.createSession(user.id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
		});
	} catch (e) {
		console.error(e);
		if (e instanceof OAuth2RequestError) {
			error(STATUS_CODES.BAD_REQUEST, { message: e.message });
		}
		error(STATUS_CODES.INTERNAL_SERVER_ERROR, {
			message: e instanceof Error ? e.message : m.auth_error(),
		});
	}
	redirect(
		STATUS_CODES.MOVED_TEMPORARILY,
		'/i',
		{
			title: m.auth_success(),
			description: m.auth_success_description(),
		},
		event
	);
};

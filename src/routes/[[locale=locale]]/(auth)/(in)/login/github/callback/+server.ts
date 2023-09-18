import { auth, githubAuth } from '$lib/auth/auth.server';
import { dbpool } from '$lib/db/db.server';
import { users } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const GET = async (event) => {
	const storedState = event.cookies.get('github_oauth_state');
	const state = event.url.searchParams.get('state');
	const code = event.url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		throw error(STATUS_CODES.BAD_REQUEST);
	}
	try {
		const { getExistingUser, githubUser } = await githubAuth.validateCallback(code);
		const user =
			(await getExistingUser()) ??
			(await dbpool.transaction(async (tx) => {
				if (githubUser.email) {
					const [existingEmailUser] = await tx
						.select()
						.from(users)
						.where(and(eq(users.email, githubUser.email), eq(users.emailVerified, true)))
						.limit(1);
					if (existingEmailUser) {
						return existingEmailUser;
					}
				}
				const [newUser] = await tx
					.insert(users)
					.values({
						email: githubUser.email,
						githubUsername: githubUser.login,
					})
					.returning({ id: users.id });
				return newUser;
			}));
		const session = await auth.createSession({
			userId: user.id,
			attributes: {},
		});
		event.locals.auth.setSession(session);
		return new Response(null, {
			status: STATUS_CODES.MOVED_TEMPORARILY,
			headers: {
				Location: '/',
			},
		});
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: STATUS_CODES.BAD_REQUEST,
			});
		}
		return new Response(null, {
			status: STATUS_CODES.INTERNAL_SERVER_ERROR,
		});
	}
};

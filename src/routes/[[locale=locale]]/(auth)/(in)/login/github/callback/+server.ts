import { auth, githubAuth } from '$lib/auth/auth.server';
import { dbpool } from '$lib/db/db.server';
import { users } from '$lib/db/schema/personal';
import { STATUS_CODES } from '$lib/utils/constants';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async (event) => {
	const storedState = event.cookies.get('github_oauth_state');
	const state = event.url.searchParams.get('state');
	const code = event.url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: STATUS_CODES.BAD_REQUEST,
		});
	}
	try {
		const { getExistingUser, githubUser } = await githubAuth.validateCallback(code);
		// eslint-disable-next-line svelte/no-inner-declarations, no-inner-declarations
		async function getUser() {
			const existingUser = await getExistingUser();
			if (existingUser) {
				return existingUser;
			}
			// To do: safely check for exisitng user with same email.
			// https://lucia-auth.com/guidebook/oauth-account-linking
			return await dbpool.transaction(async (tx) => {
				// const id = generateRandomString(15);
				const [user] = await tx
					.insert(users)
					.values({
						// id,
						email: githubUser.email,
						githubUsername: githubUser.login,
					})
					.returning({ id: users.id });
				return user;
			});
		}
		const user = await getUser();
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
		// throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
	} catch (e) {
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: STATUS_CODES.BAD_REQUEST,
			});
			// throw error(STATUS_CODES.BAD_REQUEST);
		}
		return new Response(null, {
			status: STATUS_CODES.INTERNAL_SERVER_ERROR,
		});
		// throw error(STATUS_CODES.INTERNAL_SERVER_ERROR);
	}
};

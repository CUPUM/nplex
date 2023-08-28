import { auth } from '$lib/auth/auth.server';
import { validateEmailVerificationToken } from '$lib/auth/token.server';
import { STATUS_CODES } from '$lib/utils/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	try {
		const userId = await validateEmailVerificationToken(event.params.token);
		const user = await auth.getUser(userId);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			emailVerified: true,
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {},
		});
		event.locals.auth.setSession(session);
		return new Response(null, {
			status: STATUS_CODES.MOVED_TEMPORARILY,
			headers: {
				Location: event.locals.localize('/i'),
			},
		});
	} catch {
		return new Response('Invalid email verification link', {
			status: STATUS_CODES.BAD_REQUEST,
		});
	}
};

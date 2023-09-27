import { auth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { json } from '@sveltejs/kit';

export const POST = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		return json({ message: 'No session found' });
	}
	await auth.invalidateSession(session.sessionId);
	event.locals.auth.setSession(null);
	throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/');
};

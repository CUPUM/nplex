import { SETOUTS } from '$lib/setout/constants';
import type { Session } from 'lucia';

export async function load(event) {
	const mode = event.locals.mode;
	const session = (await event.locals.auth.validate()) || ({} as Partial<Session>);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { user, userId } = session;
	return {
		setout: SETOUTS.NORMAL,
		mode,
		user,
	};
}

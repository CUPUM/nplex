import type { Session } from 'lucia';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	const mode = event.locals.mode;
	const session = (await event.locals.auth.validate()) || ({} as Partial<Session>);
	return {
		mode,
		user: session.user,
	};
});

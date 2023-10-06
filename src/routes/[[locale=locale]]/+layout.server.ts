import type { Session } from 'lucia';

export async function load(event) {
	const session = (await event.locals.auth.validate()) || ({} as Partial<Session>);
	const mode = event.locals.mode;
	return {
		mode,
		user: session.user,
	};
}

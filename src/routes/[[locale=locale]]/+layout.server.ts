import type { Session } from 'lucia';

export async function load(event) {
	const mode = event.locals.mode;
	const session = (await event.locals.auth.validate()) || ({} as Partial<Session>);
	return {
		mode,
		user: session.user,
	};
}

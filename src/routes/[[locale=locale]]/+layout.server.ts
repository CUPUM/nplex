import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	const mode = event.locals.mode;
	const { user } = (await event.locals.auth.validate()) || {};
	return {
		mode,
		user,
	};
});

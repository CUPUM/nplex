import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	lang: async (event) => {
		const validatedLocale = validate;
		console.log(event);
	},
};

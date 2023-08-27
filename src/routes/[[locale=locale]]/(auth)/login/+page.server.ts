import { STATUS_CODE } from '$lib/utils/constants.js';
import type { Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		throw event.locals.redirect(STATUS_CODE.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(emailPasswordSchema);
	return { form };
};

export const actions = {
	emailPassword: async (event) => {
		const form = await superValidate(event, emailPasswordSchema);
		console.log(form);
		return { form };
	},
} satisfies Actions;

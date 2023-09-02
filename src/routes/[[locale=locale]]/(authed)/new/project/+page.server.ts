import { tSchema } from '$lib/i18n/validation.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const newProjectSchema = z.object({
	title: tSchema(z.string()),
});

export const load = async (event) => {
	console.log(event);
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newProjectSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
	},
};

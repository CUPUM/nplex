import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const resetPasswordSchema = z.object({
	email: z.string().email(),
});

export const load = async (event) => {
	const form = superValidate(resetPasswordSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(resetPasswordSchema);
		if (form.valid) {
			//
		}
		return { form };
	},
};

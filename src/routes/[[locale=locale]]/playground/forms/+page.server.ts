import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({ text: z.string().min(5) });

export const load = async () => {
	const form = superValidate(schema);
	return { form };
};

export const actions = {
	default: async (event) => {
		console.log('awaiting artificial delay');
		// await new Promise((res) => {
		// 	setTimeout(res, 1000);
		// });
		const form = await superValidate(event, schema);
		console.log(form.data);
		if (!form.valid) {
			return message(form, [{ title: 'Titre', description: 'Erreur :,(' }]);
		}
		return message(form, [{ title: 'Titre', description: 'Succès' }]);
	},
};

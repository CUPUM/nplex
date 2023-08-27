import type { Actions } from '@sveltejs/kit';

// const emailPasswordSchema = z.object({
// 	email: z.string(),
// 	password: z.string(),
// });

// export const load = async (event) => {
// 	const form = await superValidate(emailPasswordSchema);
// };

export const actions = {
	emailPassword: async (event) => {
		console.log(event);
	},
} satisfies Actions;

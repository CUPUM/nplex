import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		console.log({ ...formData });
		const parsed = zfd
			.formData({
				test: zfd.json(
					z.object({
						name: z.string(),
						age: z.number(),
					})
				),
			})
			.safeParse(formData);
		console.log(parsed);
	},
};

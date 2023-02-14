import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd.formData({});
	},
};

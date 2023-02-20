import { data } from '$routes/api/someServerModule';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name');
		if (name) {
			console.log('before', data);
			data.name = String(name);
			console.log('after', data);
		}
	},
};

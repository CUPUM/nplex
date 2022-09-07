import { createServerDbClient } from '$utils/database/database';
import { Cookie } from '$utils/values/keys';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		console.log(...formData);
		const db = createServerDbClient(event.locals[Cookie.DbAccessToken]);

		// const { data, error } = await db.from('projects').upsert({
		// 	id: event.request.formData,
		// });
	},
};

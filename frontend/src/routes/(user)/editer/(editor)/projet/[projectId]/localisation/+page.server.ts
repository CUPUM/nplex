import { zfd } from 'zod-form-data';
import { EDITOR_FORM_ACTION } from '../../../common';
import type { Actions } from './$types';

export const actions: Actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd.formData({});
	},
};

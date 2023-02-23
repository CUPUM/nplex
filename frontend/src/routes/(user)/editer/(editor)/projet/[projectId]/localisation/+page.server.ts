import { fail } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { EDITOR_FORM_ACTION } from '../../../common';
import type { Actions } from './$types';

fail;

export const actions: Actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd.formData({}).safeParse(formData);
	},
};

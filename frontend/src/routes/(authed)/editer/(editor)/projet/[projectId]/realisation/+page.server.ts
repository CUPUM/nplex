import { getDb } from '$utils/database/client';
import { EDITOR_FORM_ACTION } from '../../../common';
import type { Actions } from './$types';

export const actions: Actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const db = await getDb(event);
	},
};

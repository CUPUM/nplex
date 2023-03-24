import { getDb } from '$utils/database/client';
import { EDITOR_FORM_ACTION } from '../../../common';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const db = await getDb(event);
	},
};

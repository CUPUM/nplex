import { EDITOR_FORM_ACTION } from '$routes/(authed)/editer/constants';
import { getDb } from '$utils/database/client';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		const db = await getDb(event);
	},
};

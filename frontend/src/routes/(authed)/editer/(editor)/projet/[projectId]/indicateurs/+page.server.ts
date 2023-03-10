import { EDITOR_FORM_ACTION } from '../../../common';

export const actions = {
	[EDITOR_FORM_ACTION]: async (event) => {
		console.log('Update', event.request);
		// Do stuff.
	},
};

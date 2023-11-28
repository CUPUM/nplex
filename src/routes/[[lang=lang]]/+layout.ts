import { loadLang } from '$lib/i18n/event';

export const load = loadLang(async (event) => {
	return {
		mode: event.data.mode,
		user: event.data.user,
	} satisfies App.PageData;
});

import { db } from '$lib/db/db.server';
import { userRolesTranslations } from '$lib/db/schema/accounts';
import { getEventLang } from '$lib/i18n/event';
import { LOAD_DEPENDENCIES } from '$lib/utils/constants';
import { and, eq } from 'drizzle-orm';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	const lang = getEventLang(event);
	const mode = event.locals.mode;
	const { user } = (await event.locals.auth.validate()) || {};
	event.depends(LOAD_DEPENDENCIES.Lang);
	const roleName = user
		? db
				.select({ name: userRolesTranslations.name })
				.from(userRolesTranslations)
				.where(
					and(
						eq(userRolesTranslations.lang, event.locals.lang),
						eq(userRolesTranslations.role, user.role)
					)
				)
				.limit(1)
				.then(([{ name }]) => name)
		: undefined;
	return {
		/**
		 * Client-forwarded locals.lang.
		 */
		lang,
		/**
		 * Client-forwarded locals.theme.
		 */
		mode,
		/**
		 * Populating the client $page.data store with a minimal user for simple UI checks.
		 */
		user,
		/**
		 * Lang-specific role name.
		 */
		roleName,
	};
});

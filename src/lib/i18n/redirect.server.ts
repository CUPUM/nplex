import { redirect, type RequestEvent } from '@sveltejs/kit';
import { localize } from './href';

export function createI18nRedirect(event: RequestEvent) {
	/**
	 * Pre-localized redirect helper.
	 *
	 * @see {@link redirect}
	 */
	return function i18nRedirect(...[code, location, ...restArgs]: Parameters<typeof redirect>) {
		return redirect(code, localize(location, event.locals.locale), ...restArgs);
	};
}

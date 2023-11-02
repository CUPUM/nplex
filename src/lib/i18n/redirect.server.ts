import type { Redirect, RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { localize } from './href';

// export function eventI18nRedirect(event: RequestEvent) {
// 	/**
// 	 * Pre-localized redirect helper.
// 	 *
// 	 * @see {@link redirect}
// 	 */
// 	return function i18nRedirect(...[code, location, ...restArgs]: Parameters<typeof redirect>) {
// 		return redirect(code, localize(location, event.locals.locale), ...restArgs);
// 	};
// }

/**
 * Integrate redirect auto-localization along with flash-messages.
 */
export function eventI18nRedirect(event: RequestEvent) {
	/**
	 * Pre-localized redirect helper.
	 *
	 * @see {@link redirect}
	 */
	return function i18nRedirect(
		status: Redirect['status'],
		location: URL | string,
		message?: App.PageData['flash']
	) {
		if (!message) {
			return redirect(status, localize(location, event.locals.locale));
		}
		return redirect(status, localize(location, event.locals.locale), message, event);
	};
}

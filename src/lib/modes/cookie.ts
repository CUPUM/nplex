import type { RequestEvent } from '@sveltejs/kit';
import cookies from 'js-cookie';
import { MODE_SETTINGS, MODE_SETTING_COOKIE_NAME, type ModeSetting } from './constants';
import { isModeSetting } from './validation';

const MODE_COOKIE_LIFETIME = 34_560_000; // 400 days, maximum allowed;

const MODE_COOKIE_OPTIONS = {
	sameSite: 'strict',
	secure: true,
	path: '.',
	expires: new Date(Date.now() + MODE_COOKIE_LIFETIME),
	httpOnly: false,
} satisfies Partial<Cookies.CookieAttributes>;

/**
 * Sets event locals theme mode that can be updated by downstream action resolving and sets theme
 * mode cookie.
 */
export function persistMode(value: ModeSetting, event?: RequestEvent) {
	if (event) {
		event.cookies.set(MODE_SETTING_COOKIE_NAME, value, { ...MODE_COOKIE_OPTIONS, httpOnly: false });
	}
	cookies.set(MODE_SETTING_COOKIE_NAME, value, MODE_COOKIE_OPTIONS);
}

/**
 * Get a client's theme from request event. If no cookie, always first try to fall back to client's
 * browser preferred color theme, else use app's default. Set to valid cookie when invalid values
 * are met.
 */
export function getPersistedMode(event?: RequestEvent) {
	const cookie = event
		? event.cookies.get(MODE_SETTING_COOKIE_NAME)
		: cookies.get(MODE_SETTING_COOKIE_NAME);
	if (isModeSetting(cookie)) {
		return cookie;
	}
	if (event) {
		const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme') ?? undefined;
		if (isModeSetting(preference)) {
			persistMode(preference, event);
			return preference;
		}
	}
	persistMode(MODE_SETTINGS.SYSTEM, event);
	return MODE_SETTINGS.SYSTEM;
}

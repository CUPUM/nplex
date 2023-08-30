import type { RequestEvent } from '@sveltejs/kit';
import cookies from 'js-cookie';
import { MODE_COOKIE_NAME, MODE_DEFAULT, type Mode } from './constants';
import { isMode } from './validation';

const MODE_COOKIE_LIFETIME = 34_560_000; // 400 days, maximum allowed;

const MODE_COOKIE_OPTIONS = {
	// sameSite: 'strict',
	// secure: true,
	path: '/',
	expires: new Date(Date.now() + MODE_COOKIE_LIFETIME),
	httpOnly: false,
} satisfies Partial<Cookies.CookieAttributes>;

/**
 * Sets event locals theme mode that could be updted by downstream action resolving and sets theme
 * mode cookie.
 */
export function setModeCookie(value: Mode, event?: RequestEvent) {
	console.log('setting mode', value);
	if (event) {
		event.cookies.set(MODE_COOKIE_NAME, value, { ...MODE_COOKIE_OPTIONS, httpOnly: false });
	}
	cookies.set(MODE_COOKIE_NAME, value, MODE_COOKIE_OPTIONS);
}

/**
 * Get a client's theme from request event. If no cookie, always first try to fall back to client's
 * browser preferred color theme, else use app's default. Set to valid cookie when invalid values
 * are met.
 */
export function getModeCookie(event?: RequestEvent) {
	const cookie = event ? event.cookies.get(MODE_COOKIE_NAME) : cookies.get(MODE_COOKIE_NAME);
	console.log(cookie);
	if (isMode(cookie)) {
		return cookie;
	}
	if (event) {
		const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme') ?? undefined;
		if (isMode(preference)) {
			setModeCookie(preference, event);
			return preference;
		}
	}
	setModeCookie(MODE_DEFAULT, event);
	return MODE_DEFAULT;
}

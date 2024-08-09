import type { RequestEvent } from '@sveltejs/kit';
import {
	THEME_COOKIE_NAME,
	THEME_COOKIE_OPTIONS,
	THEME_DEFAULT,
	THEME_SYSTEM_COOKIE_NAME,
	isTheme,
	type Theme,
} from './constants';

export function persistTheme(theme: Theme, isSystem: boolean, event: RequestEvent) {
	event.cookies.set(THEME_COOKIE_NAME, theme, THEME_COOKIE_OPTIONS);
	if (isSystem) {
		event.cookies.set(THEME_SYSTEM_COOKIE_NAME, 'true', THEME_COOKIE_OPTIONS);
	} else {
		event.cookies.delete(THEME_SYSTEM_COOKIE_NAME, { path: THEME_COOKIE_OPTIONS.path });
	}
}

export function getPersistedTheme(event: RequestEvent) {
	const themeCookie = event.cookies.get(THEME_COOKIE_NAME);
	const themeSystemCookie = !!event.cookies.get(THEME_SYSTEM_COOKIE_NAME);
	const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme');
	let resolvedTheme: Theme = THEME_DEFAULT;
	if (themeSystemCookie && isTheme(preference)) {
		resolvedTheme = preference;
	} else if (isTheme(themeCookie)) {
		resolvedTheme = themeCookie;
	}
	persistTheme(resolvedTheme, themeSystemCookie, event);
	return {
		theme: resolvedTheme,
		system: themeSystemCookie,
	};
}

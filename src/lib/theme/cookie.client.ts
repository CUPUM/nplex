import cookies from 'js-cookie';
import {
	THEME_COOKIE_NAME,
	THEME_COOKIE_OPTIONS,
	THEME_DEFAULT,
	THEME_SYSTEM_COOKIE_NAME,
	isTheme,
	type Theme,
} from './constants';

export function persistTheme(theme: Theme, isSystem: boolean) {
	cookies.set(THEME_COOKIE_NAME, theme, THEME_COOKIE_OPTIONS);
	if (isSystem) {
		cookies.set(THEME_SYSTEM_COOKIE_NAME, 'true', THEME_COOKIE_OPTIONS);
	} else {
		cookies.remove(THEME_SYSTEM_COOKIE_NAME, { path: THEME_COOKIE_OPTIONS.path });
	}
}

export function getPersistedTheme(preference: Theme) {
	const themeCookie = cookies.get(THEME_COOKIE_NAME);
	const themeSystemCookie = !!cookies.get(THEME_SYSTEM_COOKIE_NAME);
	const resolvedTheme = isTheme(themeCookie) ? themeCookie : THEME_DEFAULT;
	const resolvedThemeSystem = themeSystemCookie && preference === resolvedTheme;
	if (themeSystemCookie && !resolvedThemeSystem) {
		cookies.remove(THEME_SYSTEM_COOKIE_NAME, { path: THEME_COOKIE_OPTIONS.path });
	}
	return {
		theme: resolvedTheme,
		system: resolvedThemeSystem,
	};
}

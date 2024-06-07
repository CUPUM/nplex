import cookies from 'js-cookie';
import {
	MODE_COOKIE_NAME,
	MODE_COOKIE_OPTIONS,
	MODE_FALLBACK,
	MODE_SYSTEM_COOKIE_NAME,
	isMode,
	type Mode,
} from './constants';

export function persistMode(mode: Mode, isSystem: boolean) {
	cookies.set(MODE_COOKIE_NAME, mode, MODE_COOKIE_OPTIONS);
	if (isSystem) {
		cookies.set(MODE_SYSTEM_COOKIE_NAME, 'true', MODE_COOKIE_OPTIONS);
	} else {
		cookies.remove(MODE_SYSTEM_COOKIE_NAME, { path: MODE_COOKIE_OPTIONS.path });
	}
}

export function getPersistedMode(preference: Mode) {
	const modeCookie = cookies.get(MODE_COOKIE_NAME);
	const modeSystemCookie = !!cookies.get(MODE_SYSTEM_COOKIE_NAME);
	const resolvedMode = isMode(modeCookie) ? modeCookie : MODE_FALLBACK;
	const resolvedModeSystem = modeSystemCookie && preference === resolvedMode;
	if (modeSystemCookie && !resolvedModeSystem) {
		cookies.remove(MODE_SYSTEM_COOKIE_NAME, { path: MODE_COOKIE_OPTIONS.path });
	}
	return {
		mode: resolvedMode,
		system: resolvedModeSystem,
	};
}

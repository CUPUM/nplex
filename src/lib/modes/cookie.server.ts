import type { RequestEvent } from '@sveltejs/kit';
import {
	MODE_COOKIE_NAME,
	MODE_COOKIE_OPTIONS,
	MODE_FALLBACK,
	MODE_SYSTEM_COOKIE_NAME,
	isMode,
	type Mode,
} from './constants';

export function persistMode(mode: Mode, isSystem: boolean, event: RequestEvent) {
	event.cookies.set(MODE_COOKIE_NAME, mode, MODE_COOKIE_OPTIONS);
	if (isSystem) {
		event.cookies.set(MODE_SYSTEM_COOKIE_NAME, 'true', MODE_COOKIE_OPTIONS);
	} else {
		event.cookies.delete(MODE_SYSTEM_COOKIE_NAME, { path: MODE_COOKIE_OPTIONS.path });
	}
}

export function getPersistedMode(event: RequestEvent) {
	const modeCookie = event.cookies.get(MODE_COOKIE_NAME);
	const modeSystemCookie = !!event.cookies.get(MODE_SYSTEM_COOKIE_NAME);
	const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme');
	let resolvedMode: Mode = MODE_FALLBACK;
	if (modeSystemCookie && isMode(preference)) {
		resolvedMode = preference;
	} else if (isMode(modeCookie)) {
		resolvedMode = modeCookie;
	}
	persistMode(resolvedMode, modeSystemCookie, event);
	return {
		mode: resolvedMode,
		system: modeSystemCookie,
	};
}

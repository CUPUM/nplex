import type { Handle } from '@sveltejs/kit';
import { MODE_DEFAULT, type Mode } from './constants';
import { isMode } from './validation';

const COOKIE_NAME = 'mode';
const COOKIE_MAXAGE = 34_560_000; // 400 days, maximum allowed

/**
 * Get a client's theme from request event. If no cookie, always fall back to client's browser
 * preferred color theme.
 */
function getEventMode<E extends Parameters<Handle>[0]['event']>(event: E) {
	const cookie = event.cookies.get(COOKIE_NAME);
	if (isMode(cookie)) {
		return cookie;
	}
	if (cookie) {
		event.cookies.delete(COOKIE_NAME);
	}
	const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme') ?? undefined;
	if (isMode(preference)) {
		return preference;
	}
	return MODE_DEFAULT;
}

/**
 * Sets event locals theme mode that could be updted by downstream action resolving and sets theme
 * mode cookie.
 */
export function setEventMode<E extends Parameters<Handle>[0]['event']>(event: E, mode: Mode) {
	event.locals.mode = mode;
	event.cookies.set(COOKIE_NAME, mode, { maxAge: COOKIE_MAXAGE, path: '/' });
}

/**
 * Handle hook handler for SSR-capable client theme persistance.
 */
export const handleMode = (async ({ event, resolve }) => {
	const mode = getEventMode(event);
	setEventMode(event, mode);

	// Set html data-theme-mode attribute using event.locals to account for possible different value
	// set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%mode%', event.locals.mode);
		},
	});

	return res;
}) satisfies Handle;

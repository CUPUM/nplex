import type { Handle } from '@sveltejs/kit';
import { THEME_DEFAULT, type Theme } from './constants';
import { isTheme } from './validation';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_MAXAGE = 34_560_000; // 400 days, maximum allowed

/**
 * Get a client's theme from request event. If no cookie, always fall back to client's browser
 * preferred color theme.
 */
function getEventTheme<E extends Parameters<Handle>[0]['event']>(event: E) {
	const cookie = event.cookies.get(THEME_COOKIE_NAME);
	if (isTheme(cookie)) {
		return cookie;
	}
	if (cookie) {
		event.cookies.delete(THEME_COOKIE_NAME);
	}
	const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme') ?? undefined;
	if (isTheme(preference)) {
		return preference;
	}
	return THEME_DEFAULT;
}

/**
 * Sets event locals theme mode that could be updted by downstream action resolving and sets theme
 * mode cookie.
 */
export function setEventTheme<E extends Parameters<Handle>[0]['event']>(event: E, theme: Theme) {
	event.locals.theme = theme;
	event.cookies.set(THEME_COOKIE_NAME, theme, { maxAge: THEME_COOKIE_MAXAGE, path: '/' });
}

/**
 * Handle hook handler for SSR-capable client theme persistance.
 */
export const handleTheme = (async ({ event, resolve }) => {
	const theme = getEventTheme(event);
	setEventTheme(event, theme);

	// Set html data-theme-mode attribute using event.locals to account for possible different value
	// set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%theme-mode%', event.locals.theme);
		}
	});

	return res;
}) satisfies Handle;

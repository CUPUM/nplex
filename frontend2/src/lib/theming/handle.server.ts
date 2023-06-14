import type { Handle } from '@sveltejs/kit';
import { isValidThemeMode } from './themes';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_MAXAGE = 34_560_000; // 400 days, maximum allowed

/**
 * Get a client's theme from request event. If no cookie, always fall back to client's browser
 * preferred color theme.
 */
function getEventTheme<E extends Parameters<Handle>[0]['event']>(event: E) {
	const cookie = event.cookies.get(theme_mode_cookie_name);
	if (isValidThemeMode(cookie)) {
		return cookie;
	}
	if (cookie) {
		event.cookies.delete(theme_mode_cookie_name);
	}
	const preference = event.request.headers.get('Sec-CH-Prefers-Color-Scheme') ?? undefined;
	if (isValidThemeMode(preference)) {
		return preference;
	}
	return theme_mode_fallback;
}

/**
 * Sets event locals theme mode that could be updted by downstream action resolving and sets theme
 * mode cookie.
 */
export function setEventTheme<E extends Parameters<Handle>[0]['event']>(
	event: E,
	mode: ThemeMode
) {
	event.locals.theme_mode = mode;
	event.cookies.set(theme_mode_cookie_name, mode, { maxAge: theme_mode_cookie_maxage, path: '/' });
}

/**
 * Handle hook handler for SSR-capable client theme persistance.
 */
export const handleTheme = (async ({ event, resolve }) => {
	const mode = getEventTheme(event);
	setEventTheme(event, mode);

	// Set html data-theme-mode attribute using event.locals to account for possible different value
	// set by downstream action resolve.
	const res = resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%theme-mode%', event.locals.theme_mode);
		},
	});

	return res;
}) satisfies Handle;

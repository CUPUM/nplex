import { DEFAULT_THEME } from '$routes/AppRootTheme.svelte';
import { ThemeClass } from '$routes/AppThemes.svelte';
import { Cookie } from '$utils/enums';
import { safeJsonParse } from '$utils/json';
import type { Handle } from '@sveltejs/kit';

const TOKEN_EXPIRY_MARGIN = 10000;

/**
 * To do: validate app version correspondance between client and server and clear cookies
 * accordingly.
 */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = safeJsonParse(event.cookies.get(Cookie.Session));

	const themeInit = event.cookies.get(Cookie.Theme) ?? DEFAULT_THEME;
	const themeClass = (ThemeClass as any)[themeInit] ?? ThemeClass[DEFAULT_THEME];

	const res = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme%', themeClass),
	});

	return res;
};

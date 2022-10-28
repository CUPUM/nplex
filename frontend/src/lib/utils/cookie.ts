import type { Cookies } from '@sveltejs/kit';

/**
 * Utility to set clearing cookie by name.
 */
export function setClearCookies(cookies: Cookies, ...cookieNames: string[]) {
	cookieNames.forEach((c) => {
		cookies.set(c, '', {
			maxAge: -1,
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
		});
	});
}

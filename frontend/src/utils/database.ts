import { session } from '$app/stores';
import { createClient, type AuthChangeEvent, type Session } from '@supabase/supabase-js';
import cookie from 'cookie';
import setCookieParser from 'set-cookie-parser';
import { Cookie } from './keys';

// 1 day
const COOKIE_LIFETIME = 3600000 * 24;

/**
 * Instanciate a disposable single-request-lived db client. Useful for authed server side requests.
 */
export function createServerDbClient(accessToken?: string) {
	const client = createClient(
		import.meta.env.PUBLIC_SUPABASE_URL as string,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
		{
			persistSession: false,
			autoRefreshToken: false,
			cookieOptions: {
				lifetime: COOKIE_LIFETIME,
			},
		}
	);
	if (accessToken) {
		client.auth.setAuth(accessToken);
	}
	return client;
}

/**
 * Init a client-side supabase client instance to listen to auth state changes and more.
 */
export const browserDbClient = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL as string,
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
	{
		persistSession: false,
		autoRefreshToken: true,
		cookieOptions: {
			lifetime: COOKIE_LIFETIME,
		},
	}
);

/**
 * Handler function to manage client-side auth state changes detected on the client side and update both local session
 * store and server-managed cookies accordingly.
 */
export async function handleAuthStateChange(e: AuthChangeEvent, s: Session) {
	try {
		let res: Response;
		const body: BodyInit = JSON.stringify({ session: s });
		switch (e) {
			case 'SIGNED_OUT':
			case 'USER_DELETED':
				// Sign out on server-side to unset auth-related cookies.
				res = await fetch('/api/auth/logout', {
					method: 'POST',
				});
				if (!res.ok) throw res;
				// Clear client-side session store's user.
				session.update((prev) => {
					return { ...prev, user: null };
				});
				break;
			case 'USER_UPDATED':
			case 'SIGNED_IN':
				// Pass local client update to server to retrieve updated cookies.
				res = await fetch('/api/auth/update', {
					method: 'POST',
					body,
				});
				if (!res.ok) throw res;
				// Update client-side session store
				const appUser = await res.json();
				session.update((prev) => {
					return { ...prev, user: appUser };
				});
				break;
			case 'TOKEN_REFRESHED':
				res = await fetch('/api/auth/refresh', {
					method: 'POST',
					body,
				});
				if (!res.ok) throw res;
				break;
		}
	} catch (error) {}
}

export type SetCookieDetails = Record<string, { value: string; options: cookie.CookieSerializeOptions }>;

/**
 * Set of clear auth cookies with set-cookie headers detail to be sent back to clients logging out or attempting to
 * refresh invalid tokens.
 */
export const clearTokens: SetCookieDetails = [
	Cookie.DbAccessToken,
	Cookie.DbRefreshToken,
	Cookie.DbProviderToken,
	Cookie.DbAccessTokenExpiry,
].reduce((acc, tokenName) => {
	acc[tokenName] = {
		value: '',
		options: {
			maxAge: -1,
			httpOnly: true,
			path: '/',
			sameSite: true,
		},
	};
	return acc;
}, {});

/**
 * Apply set-cookie headers to the passed response with check. By default, this will overwrite any priorly applied
 * set-cookie header with cookie of corresponding name.
 *
 * @param overwrite Defaults to true. Set to false if you want to keep original headers.
 */
export function applySetCookieHeaders(res: Response, cookieDetails: SetCookieDetails, overwrite: boolean = true) {
	// Parsing previously set headers, formatting in preparation of cookie.serialize, and merging with new cookieDetails.
	const setCookies = {
		...(!overwrite ? cookieDetails : null),
		...setCookieParser.parse(res.headers.get('set-cookie')).reduce((acc, curr) => {
			acc[curr.name] = {
				value: curr.value,
				options: {
					secure: curr.secure,
					expires: curr.expires,
					maxAge: curr.maxAge,
					httpOnly: curr.httpOnly,
					path: curr.path,
					sameSite:
						curr.sameSite === 'true' || curr.sameSite === 'false'
							? Boolean(curr.sameSite)
							: (curr.sameSite as cookie.CookieSerializeOptions['sameSite']),
				},
			};
			return acc;
		}, {} as SetCookieDetails),
		...(overwrite ? cookieDetails : null),
	};
	// Deleting previously applied headers to start anew.
	res.headers.delete('set-cookie');
	// Appending combined headers.
	Object.keys(setCookies).forEach((cookieName) => {
		res.headers.append(
			'set-cookie',
			cookie.serialize(cookieName, setCookies[cookieName].value, setCookies[cookieName].options)
		);
	});
	return res;
}

/**
 * Refresh db auth tokens from current set of tokens.
 */
export async function refreshTokens(refreshToken: string) {
	const refreshed: SetCookieDetails = {};
	const db = createServerDbClient();

	try {
		const { data, error } = await db.auth.api.refreshAccessToken(refreshToken);
		if (error) throw error;

		const cookieOptions: cookie.CookieSerializeOptions = {
			expires: new Date(data.expires_at),
			httpOnly: true,
			path: '/',
			sameSite: true,
		};

		// New token expiry cookie setter info.
		refreshed[Cookie.DbAccessTokenExpiry] = {
			value: data.expires_at.toString(),
			options: cookieOptions,
		};
		// Refreshed access-token cookie setter info.
		refreshed[Cookie.DbAccessToken] = {
			value: data.access_token,
			options: cookieOptions,
		};
		// New refresh-token cookie setter info.
		refreshed[Cookie.DbRefreshToken] = {
			value: data.refresh_token,
			options: cookieOptions,
		};
	} catch (error) {
		throw error;
	}

	return refreshed;
}

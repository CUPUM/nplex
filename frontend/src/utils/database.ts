import { browser } from '$app/env';
import { session } from '$app/stores';
import { authModal } from '$stores/auth';
import { messages } from '$stores/messages';
import type { definitions } from '$types/database';
import { createClient, type AuthChangeEvent, type Session, type UserCredentials } from '@supabase/supabase-js';
import type { SetCookieDetails } from './cookies';
import { Cookie } from './keys';

// 1 day
const COOKIE_LIFETIME = 3600000 * 24;

/**
 * Instanciate a disposable single-request-lived db client. Useful for authed server side requests.
 */
export function createDisposableDbClient(accessToken?: string) {
	const client = createClient(
		import.meta.env.PUBLIC_SUPABASE_URL as string,
		import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string,
		{
			persistSession: false,
			autoRefreshToken: false,
			cookieOptions: {
				lifetime: COOKIE_LIFETIME,
			},
			// fetch: // Custom fetch function, if needed
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
 * Helper to get the proper Supabase client instance depending on the detected context of execution.
 */
export function getContextualDbClient(accessToken?: string) {
	return browser ? browserDbClient : createDisposableDbClient(accessToken);
}

/**
 * Handler function to manage client-side auth state changes detected on the client side and update both local session
 * store and server-managed cookies accordingly.
 */
export async function handleAuthStateChange(e: AuthChangeEvent, s: Session) {
	let res: Response;
	const body: BodyInit = JSON.stringify(s);
	const url = new URL(location.href);
	try {
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
				authModal.close();
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

type SignupDetails = Pick<UserCredentials, 'email' | 'password'> | Pick<UserCredentials, 'provider'>;
/**
 * Client-side only signup helper. Server-side logic handled by handleAuthStateChange and endpoints.
 */
export async function signup(details: SignupDetails) {
	try {
		const { user, error } = await browserDbClient.auth.signUp(details);
		if (error) throw error;
	} catch (error) {}
}

type LoginDetails = Pick<UserCredentials, 'email' | 'password'> | Pick<UserCredentials, 'provider'>;
/**
 * Client-side only login helper.
 */
export async function login(details: LoginDetails) {
	try {
		const { user, error } = await browserDbClient.auth.signIn(details, { shouldCreateUser: false });
		if (error) throw error;
	} catch (error) {
		messages.dispatch({
			type: 'error',
			content: error.message,
		});
	}
}

/**
 * Client-side only logout helper.
 */
export async function logout() {
	try {
		const { error } = await browserDbClient.auth.signOut();
		if (error) throw error;
	} catch (error) {}
}

/**
 * Get user's extended details from the the database. For use both client-side and server-side.
 *
 * @returns Passed session user with extended info.
 */
export async function getExtendedUser(
	sessionDetail: Required<Pick<Session, 'access_token' | 'user'>> & Partial<Session>
) {
	try {
		const db = createDisposableDbClient(sessionDetail.access_token);
		/**
		 * To do: If ever evolves into querying multiple table, move the required logic to a database function and call
		 * it with supabase's rpc().
		 */
		const { data, error } = await db
			.from<definitions['users_roles']>('users_roles')
			.select('role')
			.eq('user_id', sessionDetail.user.id)
			.single();
		if (error) throw error;
		return { ...sessionDetail.user, role: data.role };
	} catch (error) {
		return null;
	}
}

/**
 * Set of clear auth cookies with set-cookie headers detail to be sent back to clients logging out or attempting to
 * refresh invalid tokens.
 */
export const clearTokens: SetCookieDetails[] = [
	Cookie.DbAccessToken,
	Cookie.DbRefreshToken,
	Cookie.DbProviderToken,
	Cookie.DbAccessTokenExpiry,
].map((tokenName) => {
	return {
		name: tokenName,
		value: '',
		options: {
			maxAge: -1,
			httpOnly: true,
			path: '/',
			sameSite: true,
		},
	};
});

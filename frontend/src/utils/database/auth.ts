import { goto } from '$app/navigation';
import { session } from '$app/stores';
import { authModal } from '$stores/auth';
import { messages } from '$stores/messages';
import type { definitions } from '$types/database';
import type { SetCookieDetails } from '$utils/cookies';
import { Cookie } from '$utils/values/keys';
import type { AuthChangeEvent, Session, UserCredentials } from '@supabase/supabase-js';
import { browserDbClient, createDisposableDbClient } from './database';

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
				res = await fetch('/api/auth/use', {
					method: 'POST',
					body,
				});
				if (!res.ok) throw res;
				// Update client-side session store
				const appUser = await res.json();
				let redirect = false;
				session.update((prev) => {
					if (!prev.user && location.pathname === '/') {
						redirect = true;
					}
					return { ...prev, user: appUser };
				});
				await authModal.close();
				if (redirect) {
					goto('/compte');
				}
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

/**
 * Client-side only signup helper. Server-side logic handled by handleAuthStateChange and endpoints.
 */
export async function signup(details: SignupDetails) {
	try {
		const { user, error } = await browserDbClient.auth.signUp(details);
		if (error) throw error;
	} catch (error) {}
}
type SignupDetails = Pick<UserCredentials, 'email' | 'password'> | Pick<UserCredentials, 'provider'>;

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
type LoginDetails = Pick<UserCredentials, 'email' | 'password'> | Pick<UserCredentials, 'provider'>;

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
export async function getAppUser(sessionDetail: Required<Pick<Session, 'access_token' | 'user'>> & Partial<Session>) {
	try {
		const db = createDisposableDbClient(sessionDetail.access_token);
		const { data, error } = await db
			.from<definitions['users_roles']>('users_roles')
			.select('role')
			.eq('user_id', sessionDetail.user.id)
			.single();
		if (error) throw error;
		return { ...sessionDetail.user, role: data.role };
	} catch (error) {
		throw error;
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

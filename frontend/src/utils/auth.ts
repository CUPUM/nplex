import { page } from '$app/stores';
import { signInModal } from '$stores/auth';
import type { UserRole } from '$utils/user';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { db } from './database';
import type { providers } from './providers';

interface GuardInput {
	/**
	 * Roles or status required to gain permission for a request.
	 */
	criteria: UserRole[];
	/**
	 * The requester's session, with the user data if logged in.
	 */
	session: LoadInput['session'];
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 *
 * To do: figure out a good way to update the session's `prevnav` prop, without having to pass a prop to the client and
 * calling client-side prop handling each time.
 */
export async function guard({ criteria, session }: GuardInput): Promise<LoadOutput> {
	/**
	 * If the guard is adequately fulfilled, then we proceed to the requested route...
	 */
	if (!criteria.length || (session.user && criteria.includes(session.user.role as UserRole))) {
		return {
			status: 200,
		};
	}
	/**
	 * ...else we open signup modal if no user signed in, and we redirect to the indicated redirect, usually the
	 * previous successfully visited url stored in `prevnav`.
	 */
	if (!session.user) {
		signInModal.set(true);
	}
	return {
		status: 303,
		redirect: session.prevPath || '/',
	};
}

// Auth helpers

interface AuthInfo {
	email?: string;
	password?: string;
	provider?: keyof typeof providers;
}

/**
 * Sign up a new user.
 */
export async function signUp(info: AuthInfo) {
	const res = await db.auth.signUp(info, {
		redirectTo: info.provider ? get(page).url.pathname : null,
	});
	// session.update((s) => ({...s, user: res.user}));
	// // To do: set auth on server-side for SSR
	// // See: https://github.com/supabase/supabase/discussions/5218
	return res;
}

/**
 * Sign in a user. If valid, should set the auth cookie on the client AND on the server side for SSR.
 */
export async function signIn(info: AuthInfo) {
	const res = await db.auth.signIn(info, {
		redirectTo: info.provider ? get(page).url.pathname : null,
	});
	// session.update((s) => ({...s, user: res.user}));
	// To do: set auth on server-side for SSR
	// See: https://github.com/supabase/supabase/discussions/5218
	return res;
}

/**
 * Sign out the current user. Should unset the auth cookie on the client side AND on the server.
 */
export async function signOut() {
	const res = await db.auth.signOut();
	// await fetch('/api/auth/signout.json', {
	// 	method: 'post'
	// });
	// await updateServerSession('SIGNED_OUT', null);
	// goto('/');
	return res;
}

// Based on https://github.com/supabase/supabase/discussions/5218
// /**
//  * Prepare serialized cookies from the server-side for the session's future request handling.
//  * @param names Set by default to all values of SessionCookieName enum.
//  * @param session If null, returns blank cookies for the given names.
//  * @param extra Additional options.
//  * @returns Array of serialized cookies to be passed in headers.
//  */
// export function makeSessionCookies({
// 	names = Object.values(SessionCookieName),
// 	session = null as App.Session | Session,
// 	extra = null as cookie.CookieSerializeOptions
// } = {}) {
// 	const blank = { path: '/', expires: new Date(0) };
// 	const defaults: cookie.CookieSerializeOptions = {
// 		path: '/',
// 		httpOnly: true,
// 		secure: true,
// 		sameSite: 'strict',
// 		maxAge: 60 * 60 * 24 * 50, // default Max-Age, can be overwritten via extra
// 	};
// 	let options = { ...defaults, ...extra };
// 	const cookies = names.map(name => cookie.serialize(name, session ? session[name] : null, session ? options : blank));
// 	return cookies;
// };

// /**
//  * Updating user session on Sveltekit's server for user-specific SSR
//  */
// export async function updateServerSession(e: AuthChangeEvent, s: Session) {
// 	await fetch('/api/auth.json', {
// 		method: 'POST',
// 		headers: new Headers({ 'Content-Type': 'application/json' }),
// 		credentials: 'same-origin',
// 		body: JSON.stringify({ event: e, session: s }),
// 	});
// }

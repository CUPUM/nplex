import { page } from '$app/stores';
import { messages } from '$stores/messages';
import type { definitions } from '$types/database';
import type { UserRole } from '$utils/user';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { db } from './database';
import { SearchParam } from './keys';
import type { providers } from './providers';

interface GuardInput {
	/**
	 * Roles or status required to gain permission for a request.
	 */
	criteria: UserRole[];
	/**
	 * The requester's session, with the user data if logged in.
	 */
	session: LoadEvent['session'];
	/**
	 * Custom message, overwrites the default message composition logic.
	 */
	message?: string;
	/**
	 * Url.
	 */
	url: URL;
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 *
 * To do: figure out a good way to update the session's `prevnav` prop, without having to pass a prop to the client and
 * calling client-side prop handling each time.
 */
export async function guard({ criteria, session, message, url }: GuardInput): Promise<LoadOutput> {
	/**
	 * If the guard is adequately fulfilled, then we proceed to the requested route...
	 */
	if (!criteria.length || (session.user && criteria.includes(session.user.role as UserRole))) {
		return {
			status: 200,
		};
	}

	/**
	 * ...else, if no user, we redirect to the indicated location, usually the previous successfully visited url stored
	 * in `prevUrl`, and append the required param to open the signup modal.
	 */
	let redirectUrl = new URL(session.prevUrl);
	let defaultMessage =
		'Désolé, il semble que votre compte ne détient pas les permissions requises pour accéder à cette section de Nplex.';

	if (redirectUrl.pathname === url.pathname) {
		/**
		 * If inaccessible prevUrl is equal to the request origin, reset to root.
		 */
		redirectUrl.pathname = '';
	}

	if (!session.user) {
		redirectUrl = getAuthRedirectUrl(redirectUrl);
		defaultMessage = 'Désolé, un compte est nécessaire pour accéder à cette section de Nplex.';
	}

	messages.dispatch({
		text: message || defaultMessage,
	});

	return {
		status: 303,
		redirect: redirectUrl.toString(),
	};
}

export function getAuthRedirectUrl(targetUrl: URL) {
	const redirectUrl = new URL(targetUrl);
	redirectUrl.searchParams.set(SearchParam.AuthModal, 'true');
	return redirectUrl;
}

// Auth helpers

interface AuthInfo {
	email?: string;
	password?: string;
	firstname?: string;
	middlename?: string;
	lastname?: string;
	provider?: keyof typeof providers;
}

// To do: make auth work from server-side for client-specific SSR
// See: https://github.com/supabase/supabase/discussions/5218

/**
 * Sign up a new user.
 */
export async function signUp(info: AuthInfo) {
	const signup = await db.auth.signUp(info, {
		redirectTo: info.provider ? get(page).url.toString() : null,
	});

	if (!signup.error) {
		const profile = await db
			.from<definitions['profiles']>('profiles')
			.update({
				firstname: info.firstname || '',
				middlename: info.middlename || '',
				lastname: info.lastname || '',
			})
			.match({ user_id: signup.user.id })
			.limit(1)
			.single();
		if (profile.error) return profile;
	}

	return signup;
}

/**
 * Sign in a user. If valid, should set the auth cookie on the client AND on the server side for SSR.
 */
export async function signIn(info: AuthInfo) {
	const res = await db.auth.signIn(info, {
		redirectTo: info.provider ? get(page).url.pathname : null,
	});

	return res;
}

/**
 * Sign out the current user. Should unset the auth cookie on the client side AND on the server.
 */
export async function signOut() {
	const res = await db.auth.signOut();

	return res;
}

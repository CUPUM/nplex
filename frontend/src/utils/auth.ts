import { page } from '$app/stores';
import { messages } from '$stores/messages';
import type { definitions } from '$types/database';
import type { UserRole } from '$utils/user';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { db } from './database';
import { SearchParam } from './keys';
import type { providers } from './providers';

interface GuardInput extends Pick<LoadEvent, 'session' | 'url' | 'fetch'> {
	/**
	 * Roles or status required to gain permission for a request.
	 */
	criteria: UserRole[];
	/**
	 * Custom message, overwrites the default message composition logic.
	 */
	message?: string;
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 *
 * To do: figure out a good way to update the session's `prevnav` prop, without having to pass a prop to the client and
 * calling client-side prop handling each time.
 */
export async function guard({ criteria, session, message, url, fetch }: GuardInput): Promise<LoadOutput> {
	// If the guard is adequately fulfilled, then we proceed to the requested route...
	if (!criteria.length || (session.user && criteria.includes(session.user.role as UserRole))) {
		return {
			status: 200,
		};
	}

	// ..else, if no user, we redirect to the indicated location, usually the previous successfully visited url stored
	// in `previousUrl`, and append the required param to open the signup modal.
	let redirectUrl = new URL(session.previousUrl);
	let defaultMessage =
		'Désolé, il semble que votre compte ne détient pas les permissions requises pour accéder à cette section de Nplex.';

	if (redirectUrl.pathname === url.pathname) {
		// If inaccessible previousUrl is equal to the request origin, reset to root.
		redirectUrl.pathname = '';
	}

	if (!session.user) {
		redirectUrl = getAuthRedirectUrl(redirectUrl);
		defaultMessage = 'Désolé, un compte est nécessaire pour accéder à cette section de Nplex.';
	}

	messages.dispatch({
		text: message || defaultMessage,
		type: 'error',
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

/**
 * Sign up a new user.
 */
export async function signUp(info: AuthInfo) {
	try {
		// Create the user account.
		const signup = await db.auth.signUp(info, {
			redirectTo: info.provider ? get(page).url.toString() : null,
		});
		if (signup.error) throw signup.error;
		messages.dispatch({
			type: 'success',
			text: 'Votre compte a été créé avec succès, confirmez...',
		});
		// Updated the trigger-created public.user row.
		const profile = await db
			.from<definitions['users']>('users')
			.update({
				firstname: info.firstname || '',
				middlename: info.middlename || '',
				lastname: info.lastname || '',
			})
			.match({ user_id: signup.user.id })
			.limit(1)
			.single();
		if (profile.error) throw profile.error;
		messages.dispatch({
			type: 'success',
			text: 'Votre profil a été initié avec succès.',
		});
		return signup;
	} catch (error) {
		messages.dispatch({
			type: 'error',
			text: error.message,
		});
	} finally {
	}
}

/**
 * Sign in a user.
 */
export async function signIn(info: AuthInfo) {
	try {
		const res = await db.auth.signIn(info, {
			redirectTo: info.provider ? get(page).url.pathname : null,
			shouldCreateUser: false,
		});
		if (res.error) throw res.error;
		messages.dispatch({
			type: 'success',
			text: 'Connecté avec succès.',
		});
		return res;
	} catch (error) {
		messages.dispatch({
			type: 'error',
			text: error.message,
		});
	} finally {
	}
}

/**
 * Sign out the current user.
 */
export async function signOut() {
	const res = await db.auth.signOut();

	return res;
}

import { browser } from '$app/env';
import { goto } from '$app/navigation';
import type { AppUserSession } from '$routes/api/auth/update.json/+server';
import { messages } from '$stores/messages';
import type { Database } from '$types/database';
import { redirect } from '@sveltejs/kit';
import { SearchParam } from '../values/keys';

export function getAuthRedirectUrl(targetUrl: URL) {
	const redirectUrl = new URL(targetUrl);
	redirectUrl.searchParams.set(SearchParam.AuthModal, 'true');
	return redirectUrl;
}

interface RoleGuardInput {
	/**
	 * App user session.
	 */
	session: AppUserSession;
	/**
	 * Roles allowed to gain permission for a request.
	 */
	roles: Database['public']['Tables']['users_roles']['Row']['role'][];
	/**
	 * Custom message, overwrites the default message composition logic.
	 */
	errorMessage?: string;
	/**
	 * Where to redirect the client in case of unfulfilled guard?
	 */
	redirect?: string;
}

/**
 * Guard function to evaluate access to a route based on auth/user state.
 */
export async function roleGuard({ session, roles, errorMessage, redirect: fallback = '/' }: RoleGuardInput) {
	if (!roles.length) return;
	try {
		if (!session) {
			throw Error('Désolé, un compte est nécessaire pour accéder à cette section de Nplex.');
		}
		if (!roles.includes(session.user.role)) {
			throw Error(
				'Désolé, il semble que votre compte ne détient pas les permissions requises pour accéder à cette section de Nplex.'
			);
		}
	} catch (error) {
		/**
		 * Distinguish between browser and server runs. Necessary until client-side redirect() is fixed:
		 * https://github.com/sveltejs/kit/issues/5952#issuecomment-1217387320.
		 */
		if (browser) {
			messages.dispatch({ content: errorMessage || error.message, type: 'error' });
			return await goto(fallback);
		} else {
			throw redirect(303, fallback);
		}
	}
}

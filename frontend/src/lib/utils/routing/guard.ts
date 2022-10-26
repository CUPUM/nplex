import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { navigating } from '$app/stores';
import { messages } from '$stores/messages';
import { redirect } from '@sveltejs/kit';
import { SearchParam } from '../keys';

export function getAuthRedirectUrl(targetUrl: URL) {
	const redirectUrl = new URL(targetUrl);
	redirectUrl.searchParams.set(SearchParam.AuthModal, 'true');
	return redirectUrl;
}

interface RoleGuardInput {
	/**
	 * App user session.
	 */
	session: App.Locals['session'];
	/**
	 * Roles allowed to gain permission for a request.
	 */
	roles: App.Locals['session']['user']['role'][];
	/**
	 * Custom message, overwrites the default message composition logic.
	 */
	message?: Parameters<typeof messages.dispatch>[0]['content'];
	/**
	 * Should a notification be displayed on the client's ui?
	 */
	notify?: boolean;
	/**
	 * Where to redirect the client in case of unfulfilled guard?
	 */
	redirect?: string;
	/**
	 * Navigating store for guard runs on client side loads.
	 */
	navigating?: typeof navigating;
}

/**
 * Guard function to evaluate access to a route based on auth/user state.
 */
export async function roleGuard({
	session,
	roles,
	message,
	notify,
	redirect: fallback = '/',
	navigating,
}: RoleGuardInput) {
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
		if (browser && notify) {
			messages.dispatch({ content: message || error.message, type: 'error' });
			return goto(fallback);
		} else {
			throw redirect(303, fallback);
		}
	}
}

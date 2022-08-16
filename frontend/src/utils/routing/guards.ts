import { messages } from '$stores/messages';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
import { SearchParam } from '../values/keys';

export function getAuthRedirectUrl(targetUrl: URL) {
	const redirectUrl = new URL(targetUrl);
	redirectUrl.searchParams.set(SearchParam.AuthModal, 'true');
	return redirectUrl;
}

interface RoleGuardInput extends Pick<LoadEvent, 'session' | 'url'> {
	/**
	 * Roles required to gain permission for a request.
	 */
	roles: App.Session['user']['role'][];
	/**
	 * Custom message, overwrites the default message composition logic.
	 */
	errorMessage?: string;
}

/**
 * Guard function to evaluate access to a route based on auth/user state.
 */
async function role({ roles, session, errorMessage, url }: RoleGuardInput): Promise<LoadOutput> {
	try {
		if (roles.length) {
			// Lets first see if the client can fullfil the guard's requirements.
			if (!session.user) {
				// If no logged-in user
				throw Error('Désolé, un compte est nécessaire pour accéder à cette section de Nplex.');
			}
			// If user isn't one of the accepted roles.
			else if (!roles.includes(session.user.role)) {
				throw Error(
					'Désolé, il semble que votre compte ne détient pas les permissions requises pour accéder à cette section de Nplex.'
				);
			}
		}
		// Else proceed.
		return {
			status: 200,
		};
	} catch (err) {
		messages.dispatch({ content: errorMessage || err.message, type: 'error' });
		let redirectUrl = new URL(session.previousUrl);
		if (redirectUrl.pathname === url.pathname) {
			// If fallback url is equal to the inaccessible request origin, reset to root.
			redirectUrl.pathname = '';
		}
		if (!session.user) {
			// To do: do not open authModal if user just signed out.
			redirectUrl = getAuthRedirectUrl(redirectUrl);
		}

		return {
			status: 303,
			redirect: redirectUrl.toString(),
		};
	}
}

/**
 * Protect a route based on if the client can edit the requested project.
 */
async function project({ projectId, session, url, errorMessage }) {
	// Query endpoint or db here...
}

export const guard = {
	role,
};

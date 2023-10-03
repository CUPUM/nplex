import { STATUS_CODES } from '$lib/utils/constants';
import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';
import type { UserRole } from './constants';

/**
 * Helper to require auth inside server load functions and actions.
 */
export async function withAuth(event: RequestEvent | ServerLoadEvent) {
	const session = await event.locals.auth.validate();
	if (!session) {
		const t = event.locals.createTranslations({
			fr: {
				message:
					'Aucune session valide trouvée. Vous devez être authentifié avec un compte pour poursuivre.',
			},
			en: {
				message:
					'No valid session was found. You must authenticate with an account if you wish to proceed.',
			},
		});
		throw error(STATUS_CODES.UNAUTHORIZED, t.message);
	}
	return session;
}

/**
 * Role guard to protect endpoints, actions, or server load functions.
 */
export async function withRole<R extends UserRole>(
	event: RequestEvent | ServerLoadEvent,
	...role: R[]
) {
	const session = await withAuth(event);
	/**
	 * Event-specific guard.
	 */
	function isRequiredRole(maybeRole: unknown): maybeRole is R {
		return role.indexOf(maybeRole as R) > -1;
	}
	if (!isRequiredRole(session.user.role)) {
		// const t = createTranslations(
		// 	{
		// 		fr: {
		// 			message: 'Votre rôle d’utilisateur ne vous permet pas de continuer.',
		// 		},
		// 		en: {
		// 			message: 'Your current user role does not fulfil the requirements to proceed.',
		// 		},
		// 	},
		// 	event
		// );
		// throw error(STATUS_CODES.UNAUTHORIZED, t.message);
	}
	return session;
}

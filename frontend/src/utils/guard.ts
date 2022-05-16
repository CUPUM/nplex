import { getUserRole, UserRole } from '$utils/user';

interface GuardInput {
	/** Guards defined as an array of required roles for a specific route / layout. */
	guards: UserRole[];
	/** Current client's session, containing the user's main data with role. */
	session: App.Session;
	/** Where to redirect the client when the guard check fails? The first encountered failing guard */
	redirectTo?: string;
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 *
 * To do: figure out a good way to update the session's `prevnav` prop, without having to pass a prop to the client and
 * calling client-side prop handling each time.
 */
export function guard({ guards, session, redirectTo = undefined }: GuardInput): boolean {
	if (
		guards.includes(UserRole.Anon) ||
		(session && session.user && guards.includes(getUserRole(session.user.role)))
	) {
		console.log('guard passed');
		return true;
	}
	console.log('guard not passed');
	return false;
}

import { authModal } from '$stores/auth';
import { getUserRole, UserRole } from '$utils/user';
import type { LoadInput, LoadOutput } from '@sveltejs/kit';

interface GuardInput {
	allowedRoles: UserRole[];
	session: LoadInput['session'];
	url: LoadInput['url'];
	stuff: LoadInput['stuff'];
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 *
 * To do: figure out a good way to update the session's `prevnav` prop, without having to pass a prop to the client and
 * calling client-side prop handling each time.
 */
export async function guard({ allowedRoles, session, url, stuff }: GuardInput): Promise<LoadOutput> {
	// If the guard is adequately fulfilled, thn we proceed to the requested route...
	if (
		allowedRoles.includes(UserRole.Anon) ||
		(session && session.user && allowedRoles.includes(getUserRole(session.user.role)))
	) {
		return {
			status: 200,
			stuff: {
				prevnav: url.pathname,
			},
		};
	}
	// ...else we redirect to the indicated redirect, usually the previous successfully visited url stored in `prevnav`.
	authModal.set(true);
	return {
		status: 303,
		redirect: stuff.prevnav || '/',
	};
}

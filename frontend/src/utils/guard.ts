import { browser } from '$app/env';
import { authModal } from '$stores/auth';
import { route } from '$stores/route';
import { allRoutes } from '$utils/routes';
import { getUserRole, UserRole } from '$utils/user';
import type { LoadOutput } from '@sveltejs/kit/types/internal';
import { get } from 'svelte/store';
import { getSegments } from './helpers/url';

const guardedRoutes = allRoutes.filter(route => route.guards);

/**
 * Role requirement check where the given user-role is tested against an array of accepted roles
 * for each of the nested routes' requirements (namely _steps_).
 */
function fulfillGuards(steps: UserRole[][], role: UserRole) {
	for (const step of steps) {
		if (!step.includes(role)) {
			return false;
		}
	}
	return true;
}

interface GuardInput {
	url: URL;
	session: App.Session;
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 */
export function guard({ url, session }: GuardInput): boolean {
	const guardSteps: UserRole[][] = [];
	/**
	 * Finding the guarded segments within the queried pathname and returning each nested step's
	 * array of allowed roles.
	 */
	for (const guarded of guardedRoutes) {
		if (url.pathname.indexOf(guarded.pathname) > -1) {
			guardSteps.push(guarded.guards);
		}
	}

	/**
	 * Checking if the queried route is affected by any guards, including those defined for parent routes.
	 */
	if (guardSteps.length) {
		/**
		 * Testing if user has one of the required role, for every steps encountered.
		 */
		if (!session?.user || session.user && !fulfillGuards(guardSteps, getUserRole(session.profile?.role))) {
			return false;
		}
	}

	return true;
}
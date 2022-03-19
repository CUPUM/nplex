import { browser } from '$app/env';
import { authModal } from '$stores/auth';
import { route } from '$stores/route';
import { allRoutes } from '$utils/routes';
import { getUserRole, UserRole } from '$utils/user';
import type { LoadOutput } from '@sveltejs/kit/types/internal';
import { get } from 'svelte/store';
import { getSegments } from './helpers/url';

/**
 * Update this pathname only on browser-side else it will affect
 * the server's value, and thus all other clients.
 */
let previous = '/';

const guardedRoutes = allRoutes.filter(route => route.guards);

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
	session: App.Session
}

/**
 * Guard function to evaluate access to a page based on auth/user state.
 */
export async function guard({ url, session }: GuardInput): Promise<LoadOutput<Record<string, any>>> {
	const guardSteps: UserRole[][] = [];
	for (const guarded of guardedRoutes) {
		if (url.pathname.indexOf(guarded.pathname) > -1) {
			guardSteps.push(guarded.guards);
		}
	}

	// If the queried route is affected by guards
	if (guardSteps.length) {
		// Check if user has the required role
		if (!session?.user || session.user && !fulfillGuards(guardSteps, getUserRole(session.user.role))) {
			authModal.set(true);
			return {
				status: 302,
				redirect: previous
			}
		}
	}

	// Else, proceed as usual to the queried route
	if (browser) {
		previous = url.pathname;
	}
	return {
		props: {}
	}
}
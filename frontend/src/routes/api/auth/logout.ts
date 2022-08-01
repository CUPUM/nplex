import { session } from '$app/stores';
import { applySetCookieHeaders, clearTokens, createServerDbClient } from '$utils/database';
import { Cookie } from '$utils/keys';
import type { RequestHandler } from './__types/logout';

export const POST: RequestHandler = async ({ request, locals }) => {
	let res = new Response();

	// Check if the client has tokens.
	if (locals[Cookie.DbAccessToken]) {
		try {
			const db = createServerDbClient();
			// Logout the user on Supabase's side.
			const { error } = await db.auth.api.signOut(locals[Cookie.DbAccessToken]);
			if (error) throw error;
		} catch (error) {
			// Handle logout error(s).
			res = new Response('', {
				status: error.status,
				statusText: error.message,
			});
		}
	}

	applySetCookieHeaders(res, clearTokens);

	return res;
};

/**
 * Logout endpoint fetch wrapper for client-side calling.
 */
export async function logout() {
	try {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
		});
		if (!res.ok) throw new Error(res.statusText);
	} catch (error) {
		// handle error...
	}
	// Clear client side session user.
	session.update((prev) => {
		return { ...prev, user: null };
	});
	// Redirect to non-protected route... How?
	// Figure out way to go up the tree of guards and use the first successful one's response.
}

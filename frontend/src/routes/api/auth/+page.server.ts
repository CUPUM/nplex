import { dev } from '$app/environment';
import { queryMessage } from '$routes/AppMessagesOutlet.svelte';
import { getDb } from '$utils/database';
import { Cookie, SearchParam } from '$utils/enums';
import type { AuthSession } from '@supabase/supabase-js';
import { error, invalid, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions, RequestEvent } from './$types';

export const PASSWORD_CRITERIA = {
	minlength: 8,
};

function setAuth(event: RequestEvent, session: AuthSession) {
	event.cookies.set(Cookie.Auth, JSON.stringify(session), {
		path: '/',
		sameSite: 'strict',
		maxAge: session.expires_in,
		httpOnly: true,
		secure: !dev,
	});
	const re = event.request.headers.get('referer');
	if (re) {
		let reurl = new URL(re);
		reurl.searchParams.delete(SearchParam.AuthModal);
		const to = (reurl.pathname === '/' ? '/compte' : reurl.pathname) + reurl.search;
		throw redirect(302, to);
	}
}

export const actions: Actions = {
	/**
	 * Sign up a new user.
	 */
	signup: async (event) => {
		const d = await event.request.formData();
		const v = zfd
			.formData(
				z.object({
					email: zfd.text(z.string().email()),
					password: zfd.text(z.string().min(PASSWORD_CRITERIA.minlength)),
				})
			)
			.safeParse(d);
		if (!v.success) {
			return invalid(400, v.error.flatten().fieldErrors);
		}
		const db = await getDb(event);
		const signupRes = await db.auth.signUp(v.data);
		if (signupRes.error || !signupRes.data.session) {
			throw error(500, { message: "Erreur d'authentification", ...signupRes.error });
		}
		// Modify below if email confirmation required.
		setAuth(event, signupRes.data.session);
	},
	/**
	 * Validate inputs permissively (with fewer constraints than on signup), then against database
	 * login.
	 */
	signin: async (event) => {
		const d = await event.request.formData();
		const v = zfd
			.formData(
				z.object({
					email: zfd.text(z.string().email()),
					password: zfd.text(),
				})
			)
			.safeParse(d);
		if (!v.success) {
			return invalid(400, v.error.flatten().fieldErrors);
		}
		const db = await getDb(event);
		const signinRes = await db.auth.signInWithPassword({ ...v.data });
		if (signinRes.error || !signinRes.data.session) {
			const re = event.request.headers.get('referer');
			if (!re) {
				throw error(500, {
					message: "Impossible de récupérer l'adresse du référant.",
					...signinRes.error,
				});
			}
			const to = queryMessage(re, {
				content: JSON.stringify(signinRes.error),
				type: 'error',
			}).toString();
			throw redirect(300, to);
		}
		setAuth(event, signinRes.data.session);
	},
	/**
	 * Sign out the user based on auth cookie data. (Signing out at the supabase-auth level should
	 * invalidate the issued access token.)
	 */
	signout: async (event) => {
		const db = await getDb(event);
		const signoutRes = await db.auth.signOut();
		if (signoutRes.error) {
			const re = event.request.headers.get('referer');
			if (!re) {
				throw error(500, { ...signoutRes.error });
			}
			const to = queryMessage(re, {
				content: JSON.stringify(signoutRes.error),
				type: 'error',
			}).toString();
			throw redirect(300, to);
		}
		event.cookies.delete(Cookie.Session, { path: '/' });
	},
	/**
	 * Handle requests for forgotten password.
	 */
	forgot: async () => {},
};

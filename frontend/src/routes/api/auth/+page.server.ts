import { dev } from '$app/environment';
import { getDb } from '$utils/database';
import { Cookie, SearchParam } from '$utils/enums';
import { invalid, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async (event) => {
		// Handle signup info validation...
		const d = await event.request.formData();
		// const v = ...validate

		// const db = await getDb(event);
		// const userRes = await db.auth.signUp({});
	},
	/**
	 * Validate inputs permissively (with few constraints), then against database login.
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
		const userRes = await db.auth.signInWithPassword({ ...v.data });
		if (userRes.error || !userRes.data.session) {
			return invalid(400, { mesage: "Erreur d'authentification." });
		}
		event.cookies.set(Cookie.Auth, JSON.stringify(userRes.data.session), {
			path: '/',
			sameSite: 'strict',
			maxAge: userRes.data.session.expires_in,
			httpOnly: true,
			secure: !dev,
		});
		const re = event.url.searchParams.get(SearchParam.Redirect);
		if (re) {
			let reurl = new URL(re);
			reurl.searchParams.delete(SearchParam.AuthModal);
			const to = (reurl.pathname === '/' ? '/compte' : reurl.pathname) + reurl.search;
			throw redirect(302, to);
		}
	},
	signout: async (event) => {
		const db = await getDb(event);
		const signoutRes = await db.auth.signOut();
		if (signoutRes.error) {
			return invalid(400);
		}
		event.cookies.delete(Cookie.Session, { path: '/' });
	},
	forgot: async () => {},
};

import { dev } from '$app/environment';
import { getDb } from '$utils/database';
import { Cookie } from '$utils/enums';
import { invalid } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async (event) => {
		// Handle signup info validation...
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
	},
	signout: async (event) => {
		console.log('signout!');
		const db = await getDb(event);
		const signoutRes = await db.auth.signOut();
		if (signoutRes.error) {
			return invalid(400);
		}
		event.cookies.delete(Cookie.Session, { path: '/' });
	},
	forgot: async () => {},
};

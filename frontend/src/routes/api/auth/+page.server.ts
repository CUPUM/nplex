import { getDb } from '$utils/database';
import { COOKIES, SEARCH_PARAMS, STATUS_CODES } from '$utils/enums';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { Actions } from './$types';
import { setAuthCookie } from './common';

export const actions: Actions = {
	/**
	 * Sign up a new user.
	 */
	signup: async (event) => {
		const d = await event.request.formData();
		const v = zfd
			.formData({
				email: zfd.text(z.string().email()),
				password: zfd.text(z.string().min(8)),
				first_name: zfd.text(z.string().optional()),
				last_name: zfd.text(z.string().optional()),
			})
			.safeParse(d);
		if (!v.success) {
			return fail(400, v.error.formErrors.fieldErrors);
		}
		const db = await getDb(event);
		const signupRes = await db.auth.signUp({
			email: v.data.email,
			password: v.data.password,
			options: {
				data: {
					first_name: v.data.first_name,
					last_name: v.data.last_name,
				},
			},
		});
		if (signupRes.error || !signupRes.data.session) {
			return fail(500, { authError: signupRes.error });
		}
		// Modify below if email confirmation required.
		setAuthCookie(event, signupRes.data.session);
		// re(event);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			throw redirect(STATUS_CODES.TemporaryRedirect, re);
		}
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
			return fail(400, v.error.flatten().fieldErrors);
		}
		const db = await getDb(event);
		const signinRes = await db.auth.signInWithPassword({ ...v.data });
		if (signinRes.error) {
			return fail(STATUS_CODES.InternalServerError, { authError: signinRes.error });
		}
		if (!signinRes.data.session) {
			throw error(STATUS_CODES.ExpectationFailed, {
				message:
					'Il y a eu un problème lors de la récupération de votre session. Veuillez essayer à nouveau.',
			});
		}
		setAuthCookie(event, signinRes.data.session);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			throw redirect(STATUS_CODES.TemporaryRedirect, re);
		}
	},
	/**
	 * Sign out the user based on auth cookie data. (Signing out at the supabase-auth level should
	 * invalidate the issued access token.)
	 */
	signout: async (event) => {
		const db = await getDb(event);
		const signoutRes = await db.auth.signOut();
		if (signoutRes.error) {
			return fail(STATUS_CODES.InternalServerError, { authError: signoutRes.error });
		}
		event.cookies.delete(COOKIES.SESSION, { path: '/' });
	},
	/**
	 * Handle requests for forgotten password.
	 */
	forgot: async () => {},
	/**
	 * Using a provider, with server-side handling to ensure fullfilment of registration process with
	 * required data.
	 */
	provider: async (event) => {
		console.log('Hit provider action', event);
		// const db = await getDb(event);
		// const providerRes = await db.auth.signInWithOAuth()
	},
};

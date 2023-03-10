import { getDb } from '$utils/database/client';
import { COOKIES, SEARCH_PARAMS, STATUS_CODES } from '$utils/enums';
import { errorMessages } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { emailSchema, setAuthCookie, type AuthFailure } from './common';

// export const ssr = false;

/**
 * For the page.svelte to act as a simple redirect.
 */
export const load = async (event) => {
	const { session } = await event.parent();
	if (!session) {
		console.log('No session!');
	}
	throw redirect(STATUS_CODES.TemporaryRedirect, '/u');
};

export const actions = {
	/**
	 * Sign up a new user.
	 */
	signup: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData({
				email: emailSchema,
				password: zfd.text(
					z
						.string({ required_error: 'Vous devez fournir définir un mot de passe.' })
						.min(8, 'Veuillez définir un mot de passe avec au minium 8 caractères.')
				),
				first_name: zfd.text(
					z
						.string({
							required_error:
								'Veillez définir un nom d’utilisateur. Il peut s’agir de votre prénom ou d’un pseudonyme.',
						})
						.min(1, 'Vous devez fournir un nom avec au minimum 1 caractère.')
				),
				last_name: zfd.text(z.string().optional()),
			})
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}
		const db = await getDb(event);
		const signup = await db.auth.signUp({
			email: parsed.data.email,
			password: parsed.data.password,
			options: {
				data: {
					first_name: parsed.data.first_name,
					last_name: parsed.data.last_name,
				},
			},
		});
		if (signup.error) {
			return fail(STATUS_CODES.InternalServerError, {
				errorMessages: errorMessages(signup.error),
			});
		}
		if (!signup.data.session) {
			return fail<AuthFailure>(STATUS_CODES.InternalServerError, {
				errors: ['Une erreur est survenue lors de la récupération de la session'],
			});
		}
		// Modify below if email confirmation required.
		setAuthCookie(event, signup.data.session);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			throw redirect(STATUS_CODES.TemporaryRedirect, re);
		}
		return { success: true };
	},
	/**
	 * Validate inputs permissively (with fewer constraints than on signup), then against database
	 * login.
	 */
	signin: async (event) => {
		const formData = await event.request.formData();
		const parsed = zfd
			.formData(
				z.object({
					email: emailSchema,
					password: zfd.text(),
				})
			)
			.safeParse(formData);
		if (!parsed.success) {
			return fail(STATUS_CODES.BadRequest, { errorMessages: errorMessages(parsed.error) });
		}
		const db = await getDb(event);
		const signin = await db.auth.signInWithPassword({ ...parsed.data });
		if (signin.error) {
			return fail(STATUS_CODES.InternalServerError, {
				errorMessages: errorMessages(signin.error),
			});
		}
		if (!signin.data.session) {
			console.log(signin);
			return fail<AuthFailure>(STATUS_CODES.InternalServerError, {
				errors: ['Une erreur est survenue lors de la récupération de la session'],
			});
		}
		setAuthCookie(event, signin.data.session);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			throw redirect(STATUS_CODES.TemporaryRedirect, re);
		}
		return { success: true };
	},
	/**
	 * Sign out the user based on auth cookie data. (Signing out at the supabase-auth level should
	 * invalidate the issued access token.)
	 */
	signout: async (event) => {
		const db = await getDb(event);
		const signoutRes = await db.auth.signOut();
		if (signoutRes.error) {
			throw error(STATUS_CODES.InternalServerError);
		}
		event.cookies.delete(COOKIES.SESSION, { path: '/' });
		return { success: true };
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

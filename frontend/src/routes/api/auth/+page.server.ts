import { getDb } from '$utils/database/client';
import { COOKIES, SEARCH_PARAMS, STATUS_CODES } from '$utils/enums';
import { forceInternalHref } from '$utils/url';
import { failureMessages } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { emailSchema, setSessionCookieFromAuth, type AuthFeedback } from './common';

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
			return fail<AuthFeedback>(STATUS_CODES.BadRequest, { errors: failureMessages(parsed.error) });
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
			return fail<AuthFeedback>(STATUS_CODES.InternalServerError, {
				errors: failureMessages(signup.error),
			});
		}
		if (signup.data.user && !signup.data.session) {
			// Email confirmation needed (https://supabase.com/docs/reference/javascript/auth-signup);
			return {
				confirmEmail: signup.data.user.email,
			};
		}
		if (!signup.data.session) {
			return fail<AuthFeedback>(STATUS_CODES.InternalServerError, {
				errors: ['Une erreur est survenue lors de la récupération de la session'],
			});
		}
		await setSessionCookieFromAuth(event, signup.data.session);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			throw redirect(STATUS_CODES.TemporaryRedirect, forceInternalHref(re));
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
			return fail<AuthFeedback>(STATUS_CODES.BadRequest, {
				errors: failureMessages(parsed.error),
			});
		}
		const db = await getDb(event);
		const signin = await db.auth.signInWithPassword({ ...parsed.data });
		if (signin.error) {
			return fail<AuthFeedback>(STATUS_CODES.InternalServerError, {
				errors: failureMessages(signin.error),
			});
		}
		if (!signin.data.session) {
			return fail<AuthFeedback>(STATUS_CODES.InternalServerError, {
				errors: ['Une erreur est survenue lors de la récupération de la session'],
			});
		}
		await setSessionCookieFromAuth(event, signin.data.session);
		const re = event.url.searchParams.get(SEARCH_PARAMS.REDIRECT);
		if (re) {
			console.log(event.url);
			throw redirect(STATUS_CODES.TemporaryRedirect, forceInternalHref(re));
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
	provider: async (event) => {},
};

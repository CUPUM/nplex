import { authEmailSigninSchema, authEmailSignupSchema } from '$routes/api/auth/schemas';
import { COOKIES, SEARCH_PARAMS, STATUS_CODES } from '$utils/enums';
import { forceInternalHref } from '$utils/url';
import { failureMessages, validateFormData } from '$utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import { setSessionCookieFromAuth, type AuthFeedback } from './common';

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
		const validated = await validateFormData(event, authEmailSignupSchema);
		if (validated.failure) return validated.failure;
		const signup = await event.locals.db.auth.signUp({
			email: validated.data.email,
			password: validated.data.password,
			options: {
				data: {
					first_name: validated.data.first_name,
					last_name: validated.data.last_name,
				},
			},
		});
		if (signup.error) {
			console.log(signup.error);
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
		// If already confirmed (in theory code from hereonafter should never be reached?)
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
		const validated = await validateFormData(event, authEmailSigninSchema);
		if (validated.failure) return validated.failure;
		const signin = await event.locals.db.auth.signInWithPassword({ ...validated.data });
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
		const signoutRes = await event.locals.db.auth.signOut();
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

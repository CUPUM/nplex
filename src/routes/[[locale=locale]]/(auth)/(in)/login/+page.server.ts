import { auth } from '$lib/auth/auth.server';
import { AUTH_PROVIDERS } from '$lib/auth/constants';
import { STATUS_CODES } from '$lib/utils/constants';
import { LuciaError } from 'lucia';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		if (session.user.email && !session.user.emailVerified) {
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(emailPasswordLoginSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const t = event.locals.createTranslations({
			fr: {
				invalid: {
					title: 'Informations non valides',
					description: 'Les informations de connexion ne sont pas valides.',
				},
				notFound: {
					title: 'Aucun compte trouvé',
					description:
						'Vérifiez que vous utilisez la bonne adresse courriel et le bon mot de passe.',
				},
				error: {
					title: 'Erreur interne',
					description:
						'Nous avons eu un problème lors du traitement de votre requête, veuillez essayer à nouveau. Désolé pour cet inconvénient.',
				},
			},
			en: {
				invalid: {
					title: 'Invalid credentials',
					description: 'Provided login credentials are not valid.',
				},
				notFound: {
					title: 'No account found',
					description:
						'Please make sure you are using the proper email address and a valid password.',
				},
				error: {
					title: 'Internal error',
					description:
						'Our server has encountered an error, please try again. Sorry for the inconvenience.',
				},
			},
		});
		const form = await superValidate(event, emailPasswordLoginSchema);
		if (!form.valid) {
			return message(form, [t.invalid]);
		}
		try {
			const key = await auth.useKey(
				AUTH_PROVIDERS.EMAIL,
				form.data.email.toLowerCase(),
				form.data.password
			);
			const session = await auth.createSession({ userId: key.userId, attributes: {} });
			event.locals.auth.setSession(session);
		} catch (err) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD')
			) {
				return message(form, [t.notFound], { status: STATUS_CODES.BAD_REQUEST });
			}
			return message(form, [t.error], { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	},
};

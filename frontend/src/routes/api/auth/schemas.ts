import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const PASSWORD_MIN = 8; // Keep in sync with Supabase's email provider setting;
export const FIRST_NAME_MAX = 50;
export const LAST_NAME_MAX = 100;

const userEmailSchema = zfd.text(
	z
		.string({ required_error: 'Une adresse courriel est requise.' })
		.email('Adresse courriel invalide.')
);

const userPasswordSchema = zfd.text(
	z
		.string({ required_error: 'Vous devez fournir définir un mot de passe.' })
		.min(8, 'Veuillez définir un mot de passe avec au minium 8 caractères.')
);

const userNameSchema = zfd.text(
	z
		.string({
			required_error:
				'Veillez définir un nom d’utilisateur. Il peut s’agir de votre prénom ou d’un pseudonyme.',
		})
		.min(1, 'Vous devez fournir un nom avec au minimum 1 caractère.')
);

const userLastNameSchema = zfd.text(z.string().optional());

export const authEmailSignupSchema = zfd.formData({
	email: userEmailSchema,
	password: userPasswordSchema,
	first_name: userNameSchema,
	last_name: userLastNameSchema,
});

export const authEmailSigninSchema = zfd.formData(
	z.object({
		email: userEmailSchema,
		password: zfd.text(),
	})
);

import { sendPasswordResetLink } from '$lib/auth/emails.server';
import { isEmailUser } from '$lib/auth/validation';
import { dbpool } from '$lib/db/db.server';
import { users } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const passwordResetSchema = z.object({
	email: z.string().email(),
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		// Redirect authed user to their account's settings page
		// where they can update password without using a link.
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = superValidate(passwordResetSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, passwordResetSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const t = event.locals.createTranslations({
			fr: {
				nouser: 'Aucun utilisateur trouvé pour ce courriel',
				error: 'Une erreur est survenue',
				success:
					'Un courriel vous a été envoyé pour compléter la démarche. Veuillez consulter votre boîte de réception.',
			},
			en: {
				nouser: 'We could not find a user for the given email',
				error: 'An unknown error occured on our end',
				success:
					'An email was sent to you in order to complete the procedure. Please go see your mailbox.',
			},
		});
		try {
			const [user] = await dbpool
				.select({ id: users.id, email: users.email })
				.from(users)
				.where(eq(users.email, form.data.email.toLowerCase()))
				.limit(1);
			if (!user) {
				return message(form, t.nouser, { status: STATUS_CODES.BAD_REQUEST });
			}
			if (!isEmailUser(user)) {
				throw new Error('User email is null');
			}
			await sendPasswordResetLink(user, event);
			return message(form, t.success);
		} catch (error) {
			console.error(error);
			return message(form, t.error, { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
	},
};
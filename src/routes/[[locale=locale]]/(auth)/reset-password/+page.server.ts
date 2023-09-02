import { sendPasswordResetLink } from '$lib/auth/emails.server.js';
import { dbpool } from '$lib/db/db.server.js';
import { users } from '$lib/db/schema/auth.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
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
		console.log('resetting');
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
				.select()
				.from(users)
				.where(eq(users.email, form.data.email.toLowerCase()))
				.limit(1);
			if (!user) {
				return message(form, t.nouser, { status: STATUS_CODES.BAD_REQUEST });
			}
			await sendPasswordResetLink(user, event);
			return message(form, t.success);
		} catch (error) {
			console.error(error);
			return message(form, t.error, { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
	},
};

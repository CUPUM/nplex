import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { emailPasswordResetSchema } from '$lib/crud/validation/users';
import { db } from '$lib/db/db.server';
import { passwordResetTokens, users } from '$lib/db/schema/users.server';
import { EMAIL_SENDERS } from '$lib/email/constants';
import { mail, renderEmail } from '$lib/email/email.server';
import EmailResetPassword from '$lib/email/templates/email-reset-password.svelte';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	if (event.locals.user) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(zod(emailPasswordResetSchema));
	return {
		form,
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(emailPasswordResetSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		const [matchingUser] = await db
			.select({ id: users.id, email: users.email })
			.from(users)
			.where(eq(users.email, form.data.email))
			.limit(1);
		if (!matchingUser) {
			return message(form, m.auth_no_user_found(), {
				status: STATUS_CODES.BAD_REQUEST,
			});
		}
		const [inserted] = await db
			.insert(passwordResetTokens)
			.values({ userId: matchingUser.id })
			.returning({ token: passwordResetTokens.token });
		if (!inserted) {
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, m.auth_reset_token_missing());
		}
		await mail.sendMail({
			from: EMAIL_SENDERS.NPLEX,
			to: form.data.email,
			subject: m.email_reset_password_subject(),
			html: renderEmail(EmailResetPassword, { props: inserted }),
		});
		return message(form, {
			content: {
				title: m.success(),
				body: m.auth_verify_email_sent(),
			},
		});
	},
};

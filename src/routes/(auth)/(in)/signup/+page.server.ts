import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/common/constants';
import { signupEmailPasswordSchema } from '$lib/crud/validation/users';
import { db } from '$lib/db/db.server';
import { emailVerificationCodes, users } from '$lib/db/schema/users.server';
import { EMAIL_SENDERS } from '$lib/email/constants';
import { mail, renderEmail } from '$lib/email/email.server';
import EmailVerifyEmail from '$lib/email/templates/email-verify-email.svelte';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.email && !event.locals.user.emailVerified) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(zod(signupEmailPasswordSchema));
	return {
		form,
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signupEmailPasswordSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			const [existingUser] = await db
				.select({ id: users.id })
				.from(users)
				.where(eq(users.email, form.data.email))
				.limit(1);
			if (existingUser) {
				return message(
					form,
					{ content: { title: 'User already exists', body: 'The email is already used' } },
					{ status: STATUS_CODES.BAD_REQUEST }
				);
			}
			const hashedPassword = await new Argon2id().hash(form.data.password);
			const inserted = await db.transaction(async (tx) => {
				const [user] = await tx
					.insert(users)
					.values({
						email: form.data.email,
						emailVerified: false,
						hashedPassword,
					})
					.returning({ id: users.id });
				if (!user) {
					tx.rollback();
					return;
				}
				const [emailVerification] = await tx
					.insert(emailVerificationCodes)
					.values({
						userId: user.id,
						email: form.data.email,
					})
					.returning({ code: emailVerificationCodes.code });
				if (!emailVerification) {
					tx.rollback();
					return;
				}
				return { ...user, ...emailVerification };
			});
			if (!inserted) {
				error(STATUS_CODES.INTERNAL_SERVER_ERROR, { message: m.auth_signup_error() });
			}
			const session = await auth.createSession(inserted.id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
			await mail.sendMail({
				from: EMAIL_SENDERS.NPLEX,
				to: form.data.email,
				subject: m.email_verify_email_subject(),
				html: renderEmail(EmailVerifyEmail, {
					props: {
						code: inserted.code,
					},
				}),
			});
		} catch (err) {
			console.error(err);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
	},
};

import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { sendEmailVerificationCode } from '$lib/auth/utils.server';
import { db } from '$lib/db/db.server';
import { emailVerificationCodes, users } from '$lib/db/schema/auth';
import { usersSchema } from '$lib/db/validation.server';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordSignupSchema = z
	.object({
		email: usersSchema.shape.email,
		password: z.string(),
		confirmPassword: z.string(),
	})
	.superRefine((d, ctx) => {
		if (d.confirmPassword !== d.password) {
			ctx.addIssue({
				fatal: true,
				code: z.ZodIssueCode.custom,
				message: m.auth_password_confirmation_error(),
			});
			return z.NEVER;
		}
	});

export const load = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.email && !event.locals.user.emailVerified) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(zod(emailPasswordSignupSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(emailPasswordSignupSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			const hashedPassword = await new Argon2id().hash(form.data.password);
			const user = await db.transaction(async (tx) => {
				const [{ email, id }] = await tx
					.insert(users)
					.values({
						email: form.data.email,
						emailVerified: false,
						hashedPassword,
					})
					.returning({ id: users.id, email: users.email });
				if (email == null) {
					tx.rollback();
					throw new Error('User email is null');
				}
				const expiresAt = new Date();
				expiresAt.setMinutes(expiresAt.getMinutes() + 5);
				const [{ code }] = await tx
					.insert(emailVerificationCodes)
					.values({
						userId: id,
						email,
						expiresAt,
					})
					.returning({ code: emailVerificationCodes.code });
				return { email, id, code };
			});
			const session = await auth.createSession(user.id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
			await sendEmailVerificationCode(user.email, user.code);
		} catch (err) {
			console.error(err);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
	},
};

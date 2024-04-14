import { auth } from '$lib/auth/auth.server';
import { sendEmailVerificationCode } from '$lib/auth/utils.server';
import { STATUS_CODES } from '$lib/common/constants';
import { db } from '$lib/db/db.server';
import { emailVerificationCodes, users } from '$lib/db/schema/auth';
import { emailPasswordSignupSchema } from '$lib/db/validation.server';
import { fail, redirect } from '@sveltejs/kit';
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
			const [existingUser] = await db
				.select({ id: users.id })
				.from(users)
				.where(eq(users.email, form.data.email))
				.limit(1);
			if (existingUser) {
				return message(
					form,
					{ title: 'User already exists', description: 'The email is already used' },
					{ status: STATUS_CODES.BAD_REQUEST }
				);
			}
			const hashedPassword = await new Argon2id().hash(form.data.password);
			const { id, code } = await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(users)
					.values({
						email: form.data.email,
						emailVerified: false,
						hashedPassword,
					})
					.returning({ id: users.id });
				const expiresAt = new Date();
				expiresAt.setMinutes(expiresAt.getMinutes() + 5);
				const [{ code }] = await tx
					.insert(emailVerificationCodes)
					.values({
						userId: id,
						email: form.data.email,
						expiresAt,
					})
					.returning({ code: emailVerificationCodes.code });
				return { id, code };
			});
			const session = await auth.createSession(id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			});
			await sendEmailVerificationCode(form.data.email, code);
		} catch (err) {
			console.error(err);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
	},
};

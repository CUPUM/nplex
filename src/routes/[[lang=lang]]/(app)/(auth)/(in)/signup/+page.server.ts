import { auth } from '$lib/auth/authentication.server';
import { AUTH_PROVIDERS } from '$lib/auth/constants';
import { sendEmailVerificationLink } from '$lib/auth/emails.server';
import { isEmailUser } from '$lib/auth/validation';
import { db } from '$lib/db/db.server';
import { keys, users } from '$lib/db/schema/accounts';
import { STATUS_CODES } from '$lib/utils/constants';
import { fail, redirect } from '@sveltejs/kit';
import { createKeyId } from 'lucia';
import { generateLuciaPasswordHash } from 'lucia/utils';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordSignupSchema = z
	.object({
		email: z.string().email(),
		password: z.string(),
		confirmPassword: z.string(),
	})
	.superRefine((d, ctx) => {
		if (d.confirmPassword !== d.password) {
			ctx.addIssue({
				fatal: true,
				code: z.ZodIssueCode.custom,
				message: 'Password and password confirmation do not match.',
			});
			return z.NEVER;
		}
	});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) {
		if (session.user.email && !session.user.emailVerified) {
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
			/**
			 * Falling back to drizzle queries to benefit from defaults and other schema behaviors.
			 *
			 * @see https://lucia-auth.com/basics/fallback-database-queries
			 */
			const user = await db.transaction(async (tx) => {
				// const userId = generateRandomString(15);
				const [user] = await tx
					.insert(users)
					.values({
						email: form.data.email,
					})
					.returning({ id: users.id, email: users.email });
				const keyId = createKeyId(AUTH_PROVIDERS.EMAIL, form.data.email.toLowerCase());
				const hashedPassword = await generateLuciaPasswordHash(form.data.password);
				await tx.insert(keys).values({
					id: keyId,
					userId: user.id,
					hashedPassword,
				});
				return user;
			});
			const session = await auth.createSession({
				userId: user.id,
				attributes: {},
			});
			event.locals.auth.setSession(session);
			if (!isEmailUser(user)) {
				throw new Error('User email is null');
			}
			await sendEmailVerificationLink(user, event);
		} catch (err) {
			console.error(err);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
	},
};

import { auth } from '$lib/auth/auth.server.js';
import { AUTH_PROVIDERS } from '$lib/auth/constants.js';
import { sendEmailVerificationLink } from '$lib/auth/emails.server.js';
import { dbpool } from '$lib/db/db.server.js';
import { keys, users } from '$lib/db/schema/auth.js';
import { STATUS_CODES } from '$lib/utils/constants.js';
import { fail } from '@sveltejs/kit';
import { createKeyId } from 'lucia';
import { generateLuciaPasswordHash, generateRandomString } from 'lucia/utils';
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
			throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(emailPasswordSignupSchema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, emailPasswordSignupSchema);
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
		}
		try {
			// const user = await auth.createUser({
			// 	key: {
			// 		providerId: AUTH_PROVIDERS.EMAIL,
			// 		providerUserId: form.data.email.toLowerCase(),
			// 		password: form.data.password,
			// 	},
			// 	attributes: {
			// 		role: USER_ROLES.VISITOR,
			// 		email: form.data.email,
			// 		email_verified: false,
			// 		github_username: null,
			// 	},
			// });
			/**
			 * Falling back to drizzle queries to benefit from defaults and other schema behaviors.
			 *
			 * @see https://lucia-auth.com/basics/fallback-database-queries
			 */
			const user = await dbpool.transaction(async (tx) => {
				const userId = generateRandomString(15);
				const [user] = await tx
					.insert(users)
					.values({
						id: userId,
						email: form.data.email,
					})
					.returning({ id: users.id, email: users.email });
				const keyId = createKeyId(AUTH_PROVIDERS.EMAIL, form.data.email.toLowerCase());
				const hashedPassword = await generateLuciaPasswordHash(form.data.password);
				await tx.insert(keys).values({
					id: keyId,
					userId,
					hashedPassword,
				});
				return user;
			});
			const session = await auth.createSession({
				userId: user.id,
				attributes: {},
			});
			event.locals.auth.setSession(session);
			await sendEmailVerificationLink(user, event);
		} catch (err) {
			console.error(err);
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, { form });
		}
		throw event.locals.redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
	},
};

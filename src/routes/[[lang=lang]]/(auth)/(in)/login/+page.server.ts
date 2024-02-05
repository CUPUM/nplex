import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { db } from '$lib/db/db.server';
import { users } from '$lib/db/schema/auth';
import { STATUS_CODES } from '$lib/utils/constants';
import { and, eq, isNotNull } from 'drizzle-orm';
import { LegacyScrypt } from 'lucia';
import { Argon2id } from 'oslo/password';
import { redirect } from 'sveltekit-flash-message/server';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const emailPasswordLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const load = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.email && !event.locals.user.emailVerified) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(zod(emailPasswordLoginSchema));
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(emailPasswordLoginSchema));
		if (!form.valid) {
			return message(form, {
				title: m.auth_invalid(),
				description: m.auth_invalid_description(),
			});
		}
		const [existingUser] = await db
			.select({
				id: users.id,
				email: users.email,
				hashedPassword: users.hashedPassword,
				legacyPassword: users.legacyPassword,
			})
			.from(users)
			.where(and(eq(users.email, form.data.email), isNotNull(users.hashedPassword)))
			.limit(1);
		if (!existingUser || !existingUser.hashedPassword) {
			return message(
				form,
				{
					title: m.auth_error(),
					description: m.auth_incorrect_credentials(),
				},
				{ status: STATUS_CODES.BAD_REQUEST }
			);
		}
		const validPassword = existingUser.legacyPassword
			? await new LegacyScrypt().verify(existingUser.hashedPassword, form.data.password)
			: await new Argon2id().verify(existingUser.hashedPassword, form.data.password);
		if (!validPassword) {
			return message(
				form,
				{
					title: m.auth_error(),
					description: m.auth_incorrect_credentials(),
				},
				{ status: STATUS_CODES.BAD_REQUEST }
			);
		}
		if (existingUser.legacyPassword) {
			const newHash = await new Argon2id().hash(form.data.password);
			await db
				.update(users)
				.set({ legacyPassword: false, hashedPassword: newHash })
				.where(eq(users.id, existingUser.id));
		}
		const session = await auth.createSession(existingUser.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		redirect(
			STATUS_CODES.MOVED_TEMPORARILY,
			'/i',
			{
				title: m.auth_success(),
				description: m.auth_success_description(),
			},
			event
		);
	},
};

import * as m from '$i18n/messages';
import { auth } from '$lib/auth/auth.server';
import { STATUS_CODES } from '$lib/common/constants';
import { loginEmailPasswordSchema } from '$lib/crud/validation/auth';
import { db } from '$lib/db/db.server';
import { users } from '$lib/db/schema/auth';
import { fail } from '@sveltejs/kit';
import { and, eq, isNotNull } from 'drizzle-orm';
import { LegacyScrypt } from 'lucia';
import { Argon2id } from 'oslo/password';
import { redirect } from 'sveltekit-flash-message/server';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	if (event.locals.authed) {
		if (event.locals.authed.user.email && !event.locals.authed.user.emailVerified) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/verify-email');
		}
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const form = await superValidate(zod(loginEmailPasswordSchema));
	return {
		form,
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginEmailPasswordSchema));
		if (!form.valid) {
			return fail(STATUS_CODES.BAD_REQUEST, { form });
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
			return message(form, m.auth_invalid(), { status: STATUS_CODES.BAD_REQUEST });
		}
		// Verifying with the appropriate algorithm.
		const validPassword = existingUser.legacyPassword
			? await new LegacyScrypt().verify(existingUser.hashedPassword, form.data.password)
			: await new Argon2id().verify(existingUser.hashedPassword, form.data.password);
		if (!validPassword) {
			return message(form, m.auth_invalid(), { status: STATUS_CODES.BAD_REQUEST });
		}
		// Updating legacy password hashes.
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
		// Redirecting and triggering a success toast message.
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

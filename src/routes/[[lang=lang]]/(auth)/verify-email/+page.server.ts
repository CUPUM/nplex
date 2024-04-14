import { authorize } from '$lib/auth/rbac.server';
import { STATUS_CODES } from '$lib/common/constants';
import { emailVerificationCodesSchema } from '$lib/db/validation.server';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = emailVerificationCodesSchema.pick({ code: true }).required({ code: true });

export const load = async (event) => {
	try {
		authorize(event);
	} catch (error) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/login');
	}
	if (event.locals.user.emailVerified) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const code = event.url.searchParams.get('code') ?? '';
	const form = await superValidate(zod(schema, { defaults: { code } }));
	return {
		form,
	};
};

export const actions = {
	default: async (event) => {
		try {
			authorize(event);
		} catch (error) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/login');
		}
		if (event.locals.user.emailVerified) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
		}
		try {
			if (!event.locals.user.email) {
				message('User email is null.');
			}
			// await sendEmailVerificationLink(session.user, event);
			return {
				success: true,
			};
		} catch {
			return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, {
				message: 'An unknown error occurred',
			});
		}
	},
};

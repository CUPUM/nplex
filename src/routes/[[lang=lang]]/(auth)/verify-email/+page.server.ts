import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { emailVerificationCodeSchema } from '$lib/crud/validation/users';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async (event) => {
	authorize(event);
	if (event.locals.user.emailVerified) {
		redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
	}
	const code = event.url.searchParams.get('code') ?? '';
	const form = await superValidate(
		zod(emailVerificationCodeSchema, {
			defaults: {
				code,
			},
		})
	);
	return {
		form,
	};
};

export const actions = {
	default: async (event) => {
		authorize(event);
		if (event.locals.user.emailVerified || !event.locals.user.email) {
			redirect(STATUS_CODES.MOVED_TEMPORARILY, '/i');
		}
		// 	await sendEmailVerificationLink(session.user, event);
		// 	return {
		// 		success: true,
		// 	};
		// } catch {
		// 	return fail(STATUS_CODES.INTERNAL_SERVER_ERROR, {
		// 		message: 'An unknown error occurred',
		// 	});
		// }
	},
};

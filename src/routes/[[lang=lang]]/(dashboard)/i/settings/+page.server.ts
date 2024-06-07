import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import {
	usersAccountSchema,
	usersProfileSchema,
	usersRolesRequestsSchema,
} from '$lib/crud/validation/users';
import { db } from '$lib/db/db.server';
import { users, usersRolesRequests } from '$lib/db/schema/users.server';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	authorize(event);
	const [user] = await db
		.select({
			profile: {
				firstName: users.firstName,
				middleName: users.middleName,
				lastName: users.lastName,
				publicEmail: users.publicEmail,
			},
			roleRequest: {
				requestedAt: usersRolesRequests.requestAt,
				requestedRole: usersRolesRequests.requestedRole,
			},
		})
		.from(users)
		.where(eq(users.id, event.locals.user.id))
		.leftJoin(usersRolesRequests, eq(users.id, usersRolesRequests.userId))
		.limit(1);
	if (!user) {
		error(STATUS_CODES.NOT_FOUND, m.no_user_found());
	}
	const [profileForm, roleRequestForm, accountForm] = await Promise.all([
		superValidate(user.profile, zod(usersProfileSchema)),
		superValidate(user.roleRequest, zod(usersRolesRequestsSchema)),
		superValidate(zod(usersAccountSchema)),
	]);
	return {
		profileForm,
		roleRequestForm,
		accountForm,
	};
};

export const actions = {
	profile: async (event) => {
		authorize(event);
		// const generalForm = await superValidate(event, generalSchema);
		// if (!generalForm.valid) {
		// 	return message(generalForm, {
		// 		title: m.invalid_data(),
		// 		description: m.invalid_data_details(),
		// 	});
		// }
		// try {
		// 	await db
		// 		.update(users)
		// 		.set({
		// 			...generalForm.data,
		// 			publicEmailVerified:
		// 				event.locals.user.role === USER_ROLES.ADMIN && generalForm.data.publicEmail != null
		// 					? TRUE()
		// 					: sql`case when ${users.publicEmail} = ${generalForm.data.publicEmail} then true else false end`,
		// 		})
		// 		.where(eq(users.id, event.locals.user.id));
		// 	return message(generalForm, { title: m.success(), description: m.success_saved_data() });
		// } catch (e) {
		// 	return message(
		// 		generalForm,
		// 		{
		// 			title: m.error(),
		// 			description: m.error_details(),
		// 		},
		// 		{
		// 			status: STATUS_CODES.INTERNAL_SERVER_ERROR,
		// 		}
		// 	);
		// }
	},
	delete: async (event) => {
		authorize(event);
		// const manageForm = await superValidate(event, manageSchema);
		// try {
		// 	await db.delete(users).where(eq(users.id, event.locals.user.id));
		// 	return message(manageForm, {
		// 		title: m.success(),
		// 		description: m.success_saved_data(),
		// 	});
		// } catch (e) {
		// 	console.error(e);
		// 	return message(
		// 		manageForm,
		// 		{
		// 			title: m.error(),
		// 			description: m.error_details(),
		// 		},
		// 		{ status: STATUS_CODES.INTERNAL_SERVER_ERROR }
		// 	);
		// }
	},
	uploadAvatar: async () => {
		// to do
	},
	verifyEmail: async () => {
		// to do:
	},
	// requestRole: async (event) => {
	// 	const session = await withAuth(event);
	// },
	// delete: async (event) => {},
};

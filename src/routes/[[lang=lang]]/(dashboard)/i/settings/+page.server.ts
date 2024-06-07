import * as m from '$i18n/messages';
import { STATUS_CODES } from '$lib/common/constants';
import { authorize } from '$lib/crud/authorization/rbac.server';
import { messageSaveSuccess } from '$lib/crud/form/message';
import {
	usersAccountSchema,
	usersProfileSchema,
	usersRolesRequestsSchema,
} from '$lib/crud/validation/users';
import { db } from '$lib/db/db.server';
import { users, usersRolesRequests } from '$lib/db/schema/users.server';
import { error, fail } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';
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
		.orderBy(desc(usersRolesRequests.requestAt))
		.limit(1);
	if (!user) {
		error(STATUS_CODES.NOT_FOUND, m.user_not_found());
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
		const generalForm = await superValidate(event, zod(usersProfileSchema));
		if (!generalForm.valid) {
			fail(STATUS_CODES.BAD_REQUEST, { generalForm });
		}
		await db.update(users).set(generalForm.data).where(eq(users.id, event.locals.user.id));
		return messageSaveSuccess(generalForm);
	},
	role: async (event) => {
		authorize(event);
	},
	delete: async (event) => {
		authorize(event);
		const accountForm = await superValidate(event, zod(usersAccountSchema));
		if (!accountForm.valid) {
			fail(STATUS_CODES.BAD_REQUEST, { accountForm });
		}
		const [deleted] = await db.delete(users).where(eq(users.id, event.locals.user.id)).returning();
		if (!deleted) {
			error(STATUS_CODES.INTERNAL_SERVER_ERROR, m.cannot_delete());
		}
		redirect(
			STATUS_CODES.TEMPORARY_REDIRECT,
			'/',
			{ content: { body: m.account_deleted() } },
			event
		);
	},
	avatar: async (event) => {
		authorize(event);
		// to do
	},
	verify: async (event) => {
		authorize(event);
		// to do:
	},
};

import { USER_ROLES } from '$lib/auth/constants';
import { withAuth } from '$lib/auth/guard.server';
import { userGeneralUpdateSchema, userPermissionsUpdate } from '$lib/db/crud.server';
import { dbpool } from '$lib/db/db.server';
import { getUserRolesList } from '$lib/db/queries.server';
import { users, usersRolesRequests } from '$lib/db/schema/accounts';
import { TRUE } from '$lib/db/sql.server';
import { tt } from '$lib/i18n/translations';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { message, superValidate } from 'sveltekit-superforms/client';

export const load = async (event) => {
	const t = event.locals.createTranslations({
		fr: {
			noUser: 'Aucun utilisateur trouvé.',
		},
		en: {
			noUser: 'No user found.',
		},
	});
	const session = await withAuth(event);
	const { firstName, middleName, lastName, role, publicEmail, publicEmailVerified } =
		getTableColumns(users);
	const [{ permissions, ...user }] = await dbpool
		.select({
			firstName,
			middleName,
			lastName,
			publicEmail,
			publicEmailVerified,
			permissions: {
				role,
				requestedAt: usersRolesRequests.requestAt,
				requestedRole: usersRolesRequests.requestedRole,
			},
		})
		.from(users)
		.where(eq(users.id, session.user.id))
		.limit(1)
		.leftJoin(usersRolesRequests, eq(users.id, usersRolesRequests.userId))
		.limit(1);
	if (!user) {
		throw error(STATUS_CODES.NOT_FOUND, t.noUser);
	}
	console.log(permissions);
	const generalForm = superValidate(user, userGeneralUpdateSchema);
	const permissionsForm = superValidate(permissions, userPermissionsUpdate);
	return {
		generalForm,
		permissionsForm,
		publicEmailVerified: user.publicEmailVerified,
		roles: getUserRolesList(event),
	};
};

export const actions = {
	update: async (event) => {
		const session = await withAuth(event);
		const t = event.locals.createTranslations({
			fr: {
				...tt.fr.editor.server,
			},
			en: {
				...tt.en.editor.server,
			},
		});
		const generalForm = await superValidate(event, userGeneralUpdateSchema);
		if (!generalForm.valid) {
			return message(generalForm, [t.invalid]);
		}
		try {
			await dbpool
				.update(users)
				.set({
					...generalForm.data,
					publicEmailVerified:
						session.user.role === USER_ROLES.ADMIN && generalForm.data.publicEmail != null
							? TRUE()
							: sql`case when ${users.publicEmail} = ${generalForm.data.publicEmail} then true else false end`,
				})
				.where(eq(users.id, session.user.id));
			return message(generalForm, [t.success]);
		} catch (e) {
			return message(generalForm, [t.error], { status: STATUS_CODES.INTERNAL_SERVER_ERROR });
		}
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

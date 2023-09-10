import { dbpool } from '$lib/db/db.server';
import { organizations, organizationsUsers, projects } from '$lib/db/schema/public';
import { STATUS_CODES } from '$lib/utils/constants';
import { error } from '@sveltejs/kit';
import { and, eq, exists, or } from 'drizzle-orm';

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) {
		throw error(STATUS_CODES.UNAUTHORIZED, { message: 'No session found' });
	}

	const p = dbpool.transaction(async (tx) => {
		return tx.select().from(projects);
		// .where(authorizeProjectUpdate(projects.createdById, session.user.id));
	});

	const o = dbpool.transaction(async (tx) => {
		return tx
			.select()
			.from(organizations)
			.where(
				or(
					eq(organizations.createdById, session.user.id),
					exists(
						tx
							.select()
							.from(organizationsUsers)
							.where(
								and(
									eq(organizationsUsers.userId, session.user.id),
									eq(organizationsUsers.organizationId, organizations.id)
								)
							)
					)
				)
			);
	});
	return {
		editables: {
			projects: p,
			organizations: o,
		},
	};
};

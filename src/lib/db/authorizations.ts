import { USER_ROLES } from '$lib/auth/constants';
import { Column, and, eq, exists, or } from 'drizzle-orm';
import type { Session } from 'lucia';
import { dbpool } from './db.server';
import { users } from './schema/accounts';
import { projects, projectsUsers } from './schema/public';
import { TRUE } from './sql';

export function authorizeUserUpdate(session: Session) {
	return eq(users.id, session.user.id);
}

export function authorizePublicProjectSelect(session: Session) {
	return session;
}

export function authorizeProjectUpdate(
	session: Session,
	createdById: Column,
	client: typeof dbpool = dbpool
) {
	if (session.user.role === USER_ROLES.ADMIN || session.user.role === USER_ROLES.EDITOR) {
		return TRUE();
	}
	return or(
		eq(createdById, session.user.id),
		exists(
			client
				.select()
				.from(projectsUsers)
				.where(
					and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, session.user.id))
				)
				.limit(1)
		)
	);
}

// export function authorizeProjectInterventionsUpdate

// export function authorizeProjectPublication(session: Session) {
// 	return session;
// }

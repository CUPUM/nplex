import { and, eq, exists, or } from 'drizzle-orm';
import type { Session } from 'lucia';
import { dbhttp } from './db.server';
import { users } from './schema/accounts';
import { projects, projectsUsers } from './schema/public';

export function authorizeUserUpdate(session: Session) {
	return eq(users.id, session.user.id);
}

export function authorizePublicProjectSelect(session: Session) {
	return session;
}

export function authorizeProjectUpdate(session: Session) {
	return or(
		eq(projects.createdById, session.user.id),
		exists(
			dbhttp
				.select()
				.from(projectsUsers)
				.where(
					and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, session.user.id))
				)
				.limit(1)
		)
	);
}

export function authorizeProjectPublication(session: Session) {
	return session;
}

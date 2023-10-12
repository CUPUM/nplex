import { USER_ROLES } from '$lib/auth/constants';
import { and, eq, exists, or } from 'drizzle-orm';
import type { Session } from 'lucia';
import { dbpool, type Db } from './db.server';
import { users } from './schema/accounts';
import { organizations, organizationsUsers, projects, projectsUsers } from './schema/public';
import { FALSE, TRUE } from './sql.server';

export function authorizeUserUpdate(session: Session) {
	return eq(users.id, session.user.id);
}

export function authorizePublicProjectSelect(session?: Session, db: Db = dbpool) {
	if (session?.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	// to do: add query filters to establish automatically managed criterias of if projects are publicly visible or not.
	return TRUE();
}

/** Authorization framing for project updates. */
export function authorizeProjectUpdate(session: Session, db: Db = dbpool) {
	if (session.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	return or(
		eq(projects.createdById, session.user.id),
		exists(
			db
				.select()
				.from(projectsUsers)
				.where(
					and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, session.user.id))
				)
				.limit(1)
		)
	);
}

/** Authorization to control updatability of a project's collaborators listing. */
export function authorizeProjectUsersUpdate(session: Session, db: Db = dbpool) {
	if (session.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	return eq(projects.createdById, session.user.id);
}

/** Authorization for project publication status update. */
export function authorizeProjectPublicationUpdate(session: Session) {
	if (session.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	return FALSE();
	// if (session.user.role !== USER_ROLES.EDITOR) {
	// 	return FALSE();
	// }
	// return or(
	// 	eq(projects.createdById, session.user.id),
	// 	exists(
	// 		db
	// 			.select()
	// 			.from(projectsUsers)
	// 			.where(
	// 				and(eq(projectsUsers.projectId, projects.id), eq(projectsUsers.userId, session.user.id))
	// 			)
	// 			.limit(1)
	// 	),
	// );
}

export function authorizeOrganizationUpdate(session: Session, db: Db = dbpool) {
	if (session.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	return or(
		eq(organizations.createdById, session.user.id),
		exists(
			db
				.select()
				.from(organizations)
				.where(
					and(
						eq(organizationsUsers.organizationId, organizations.id),
						eq(organizationsUsers.userId, session.user.id)
					)
				)
				.limit(1)
		)
	);
}

export function authorizeOrganizationPublicationUpdate(session: Session) {
	if (session.user.role === USER_ROLES.ADMIN) {
		return TRUE();
	}
	return FALSE();
}

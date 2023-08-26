import type { ValueOf } from 'type-fest';

export const USERS_ROLES = {
	ADMIN: 'admin',
	EDITOR: 'editor',
	VISITOR: 'visitor',
} as const;

export type UserRole = ValueOf<typeof USERS_ROLES>;

export const USERS_ROLES_ARR = Object.values(USERS_ROLES);

export const USER_ROLE_DEFAULT = USERS_ROLES.VISITOR;

export type UserRoleDefault = typeof USER_ROLE_DEFAULT;
